import { createServer, Model, Factory, Response } from 'miragejs';

// Dummy data for users
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    avatar: 'https://picsum.photos/150/150?random=1'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://picsum.photos/150/150?random=2'
  }
];

// Dummy data for products
const products = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://picsum.photos/400/300?random=1',
    stock: 50,
    rating: 4.5,
    reviews: 128,
    features: ['Noise Cancellation', '30h Battery', 'Quick Charge', 'Bluetooth 5.0']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://picsum.photos/400/300?random=2',
    stock: 30,
    rating: 4.3,
    reviews: 89,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery']
  },
  {
    id: '3',
    name: 'Premium Coffee Beans',
    description: 'Artisan roasted coffee beans from Colombia. Rich, full-bodied flavor.',
    price: 24.99,
    category: 'Food & Beverage',
    image: 'https://picsum.photos/400/300?random=3',
    stock: 100,
    rating: 4.7,
    reviews: 256,
    features: ['Single Origin', 'Medium Roast', '1lb Bag', 'Organic Certified']
  },
  {
    id: '4',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap. Perfect for all types of yoga practice.',
    price: 79.99,
    category: 'Sports & Fitness',
    image: 'https://picsum.photos/400/300?random=4',
    stock: 75,
    rating: 4.6,
    reviews: 142,
    features: ['Non-slip Surface', 'Carrying Strap', 'Eco-friendly', '6mm Thickness']
  },
  {
    id: '5',
    name: 'Leather Laptop Bag',
    description: 'Genuine leather laptop bag with multiple compartments and padded protection.',
    price: 149.99,
    category: 'Accessories',
    image: 'https://picsum.photos/400/300?random=5',
    stock: 40,
    rating: 4.4,
    reviews: 67,
    features: ['Genuine Leather', 'Padded Protection', 'Multiple Compartments', 'Adjustable Strap']
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 39.99,
    category: 'Electronics',
    image: 'https://picsum.photos/400/300?random=6',
    stock: 80,
    rating: 4.2,
    reviews: 203,
    features: ['Fast Charging', 'Qi Compatible', 'LED Indicator', 'Anti-slip Design']
  }
];

// Dummy data for orders
const orders = [
  {
    id: '1',
    userId: '2',
    items: [
      { productId: '1', quantity: 2, price: 199.99 },
      { productId: '3', quantity: 1, price: 24.99 }
    ],
    total: 424.97,
    status: 'completed',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '2',
    userId: '2',
    items: [
      { productId: '2', quantity: 1, price: 299.99 },
      { productId: '4', quantity: 1, price: 79.99 }
    ],
    total: 379.98,
    status: 'shipped',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-21T11:45:00Z'
  }
];

// Analytics data
const analyticsData = {
  monthlySales: [
    { month: 'Jan', sales: 12000, orders: 45 },
    { month: 'Feb', sales: 15000, orders: 52 },
    { month: 'Mar', sales: 18000, orders: 68 },
    { month: 'Apr', sales: 22000, orders: 78 },
    { month: 'May', sales: 25000, orders: 89 },
    { month: 'Jun', sales: 28000, orders: 95 }
  ],
  topProducts: [
    { name: 'Wireless Headphones', sales: 45, revenue: 8995.55 },
    { name: 'Smart Watch', sales: 32, revenue: 9599.68 },
    { name: 'Coffee Beans', sales: 128, revenue: 3198.72 },
    { name: 'Yoga Mat', sales: 67, revenue: 5359.33 }
  ],
  recentOrders: [
    { id: '1', customer: 'John Doe', amount: 424.97, status: 'completed' },
    { id: '2', customer: 'Jane Smith', amount: 299.99, status: 'shipped' },
    { id: '3', customer: 'Bob Johnson', amount: 149.99, status: 'pending' }
  ]
};

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      product: Model,
      order: Model,
      cart: Model,
    },

    factories: {
      user: Factory.extend({
        email: 'user@example.com',
        password: 'password',
        role: 'user',
        firstName: 'John',
        lastName: 'Doe',
      }),
    },

    seeds(server) {
      // Seed users
      users.forEach(user => {
        server.create('user', user);
      });

      // Seed products
      products.forEach(product => {
        server.create('product', product);
      });

      // Seed orders
      orders.forEach(order => {
        server.create('order', order);
      });
    },

    routes() {
      this.namespace = 'api';

      // Auth routes
      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Mock JWT token
          const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));
          return {
            user: {
              id: user.id,
              email: user.email,
              role: user.role,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar
            },
            token
          };
        }
        
        return new Response(401, {}, { error: 'Invalid credentials' });
      });

      this.post('/auth/register', (schema, request) => {
        const { email, password, firstName, lastName } = JSON.parse(request.requestBody);
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
          return new Response(400, {}, { error: 'User already exists' });
        }

        const newUser = {
          id: String(users.length + 1),
          email,
          password,
          role: 'user',
          firstName,
          lastName,
          avatar: `https://picsum.photos/150/150?random=${users.length + 1}`
        };

        users.push(newUser);
        
        const token = btoa(JSON.stringify({ userId: newUser.id, role: newUser.role }));
        
        return {
          user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            avatar: newUser.avatar
          },
          token
        };
      });

      // Products routes
      this.get('/products', () => {
        return { products };
      });

      this.get('/products/:id', (schema, request) => {
        const product = products.find(p => p.id === request.params.id);
        if (product) {
          return { product };
        }
        return new Response(404, {}, { error: 'Product not found' });
      });

      this.get('/products/category/:category', (schema, request) => {
        const categoryProducts = products.filter(p => 
          p.category.toLowerCase() === request.params.category.toLowerCase()
        );
        return { products: categoryProducts };
      });

      // Admin routes for product management
      this.post('/admin/products', (schema, request) => {
        const productData = JSON.parse(request.requestBody);
        const newProduct = {
          id: String(products.length + 1),
          ...productData,
          createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        return { product: newProduct };
      });

      this.put('/admin/products/:id', (schema, request) => {
        const productData = JSON.parse(request.requestBody);
        const index = products.findIndex(p => p.id === request.params.id);
        if (index !== -1) {
          products[index] = { ...products[index], ...productData };
          return { product: products[index] };
        }
        return new Response(404, {}, { error: 'Product not found' });
      });

      this.delete('/admin/products/:id', (schema, request) => {
        const index = products.findIndex(p => p.id === request.params.id);
        if (index !== -1) {
          products.splice(index, 1);
          return new Response(204);
        }
        return new Response(404, {}, { error: 'Product not found' });
      });

      // Orders routes
      this.get('/orders', (schema, request) => {
        const userId = request.queryParams.userId;
        if (userId) {
          const userOrders = orders.filter(o => o.userId === userId);
          return { orders: userOrders };
        }
        return { orders };
      });

      this.post('/orders', (schema, request) => {
        const orderData = JSON.parse(request.requestBody);
        const newOrder = {
          id: String(orders.length + 1),
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        orders.push(newOrder);
        return { order: newOrder };
      });

      this.put('/admin/orders/:id', (schema, request) => {
        const { status } = JSON.parse(request.requestBody);
        const order = orders.find(o => o.id === request.params.id);
        if (order) {
          order.status = status;
          order.updatedAt = new Date().toISOString();
          return { order };
        }
        return new Response(404, {}, { error: 'Order not found' });
      });

      // Analytics routes
      this.get('/admin/analytics', () => {
        return analyticsData;
      });

      // Categories route
      this.get('/categories', () => {
        const categories = [...new Set(products.map(p => p.category))];
        return { categories };
      });

      // Allow external HDRI files and other assets to pass through
      this.passthrough('https://raw.githack.com/**');
      this.passthrough('https://cdn.jsdelivr.net/**');
      this.passthrough('https://unpkg.com/**');
      this.passthrough('https://picsum.photos/**');
      
      this.passthrough();
    },
  });

  return server;
}
