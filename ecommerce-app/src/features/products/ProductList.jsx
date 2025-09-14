import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdSearch, MdFilterList, MdGridOn, MdList, MdSort } from 'react-icons/md';
import { productsAPI } from '../../api/api';
import ProductCard from './ProductCard';
import Loading, { InlineLoading } from '../../components/Loading';
import { ErrorMessage, EmptyState } from '../../components/ErrorBoundary';
import ProductFilters from '../../components/ProductFilters';
import ProductGallery3D from '../../components/3D/ProductGallery3D';
import AIRecommendations from '../../components/AIRecommendations';
import { MdInventory, MdViewInAr } from 'react-icons/md';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [show3DGallery, setShow3DGallery] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: '',
    inStock: false,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Fetch products and categories
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsAPI.getAll(),
    select: (response) => response.data.products,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productsAPI.getCategories(),
    select: (response) => response.data.categories,
  });

  const products = productsData || [];
  const categories = categoriesData || [];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData || [];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product =>
        product.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= parseFloat(filters.rating));
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'reviews':
          aValue = a.reviews;
          bValue = b.reviews;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [productsData, searchTerm, filters]);


  if (productsLoading || categoriesLoading) {
    return <InlineLoading text="Loading products..." />;
  }

  if (productsError) {
    return <ErrorMessage error={productsError} onRetry={refetchProducts} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Discover our amazing collection of products
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      <ProductFilters
        products={products}
        onFiltersChange={setFilters}
        categories={categories}
        brands={[...new Set(products.map(p => p.brand).filter(Boolean))]}
        priceRange={{ min: 0, max: 1000 }}
      />

      <div className="flex flex-col gap-8">

        {/* Products Section */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <MdGridOn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <MdList className="w-4 h-4" />
                </button>
              </div>

              {/* 3D Gallery Button */}
              <button
                onClick={() => setShow3DGallery(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <MdViewInAr className="w-4 h-4" />
                <span>3D Gallery</span>
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredAndSortedProducts.length === 0 ? (
            <EmptyState
              icon={MdInventory}
              title="No products found"
              description="Try adjusting your search or filter criteria to find what you're looking for."
              action={
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setPriceRange({ min: '', max: '' });
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              }
            />
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="mt-8">
          <AIRecommendations maxItems={8} />
        </div>
      </div>

      {/* 3D Gallery Modal */}
      {show3DGallery && (
        <ProductGallery3D
          products={filteredAndSortedProducts}
          onProductSelect={(product) => {
            setSelectedProduct(product);
            setShow3DGallery(false);
            // Navigate to product detail
            window.location.href = `/products/${product.id}`;
          }}
          onClose={() => setShow3DGallery(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
