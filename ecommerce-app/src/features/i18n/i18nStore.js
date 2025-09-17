import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useI18nStore = create(
  persist(
    (set, get) => ({
      // Language state
      currentLanguage: 'en',
      availableLanguages: [
        { code: 'en', name: 'English', flag: '🇺🇸', rtl: false },
        { code: 'es', name: 'Español', flag: '🇪🇸', rtl: false },
        { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪', rtl: false },
        { code: 'it', name: 'Italiano', flag: '🇮🇹', rtl: false },
        { code: 'pt', name: 'Português', flag: '🇵🇹', rtl: false },
        { code: 'zh', name: '中文', flag: '🇨🇳', rtl: false },
        { code: 'ja', name: '日本語', flag: '🇯🇵', rtl: false },
        { code: 'ko', name: '한국어', flag: '🇰🇷', rtl: false },
        { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
        { code: 'ru', name: 'Русский', flag: '🇷🇺', rtl: false },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', rtl: false }
      ],
      
      // Translations
      translations: {
        en: {
          // Common
          'common.loading': 'Loading...',
          'common.error': 'Error',
          'common.success': 'Success',
          'common.cancel': 'Cancel',
          'common.save': 'Save',
          'common.delete': 'Delete',
          'common.edit': 'Edit',
          'common.close': 'Close',
          'common.search': 'Search',
          'common.filter': 'Filter',
          'common.sort': 'Sort',
          'common.price': 'Price',
          'common.quantity': 'Quantity',
          'common.total': 'Total',
          'common.subtotal': 'Subtotal',
          'common.tax': 'Tax',
          'common.shipping': 'Shipping',
          'common.discount': 'Discount',
          
          // Navigation
          'nav.home': 'Home',
          'nav.products': 'Products',
          'nav.cart': 'Cart',
          'nav.wishlist': 'Wishlist',
          'nav.profile': 'Profile',
          'nav.login': 'Login',
          'nav.register': 'Register',
          'nav.logout': 'Logout',
          'nav.admin': 'Admin',
          
          // Products
          'products.title': 'Products',
          'products.search': 'Search products...',
          'products.filter': 'Filter Products',
          'products.sort': 'Sort by',
          'products.addToCart': 'Add to Cart',
          'products.addToWishlist': 'Add to Wishlist',
          'products.viewDetails': 'View Details',
          'products.outOfStock': 'Out of Stock',
          'products.inStock': 'In Stock',
          'products.rating': 'Rating',
          'products.reviews': 'Reviews',
          'products.description': 'Description',
          'products.specifications': 'Specifications',
          'products.features': 'Features',
          
          // Cart
          'cart.title': 'Shopping Cart',
          'cart.empty': 'Your cart is empty',
          'cart.remove': 'Remove',
          'cart.update': 'Update',
          'cart.checkout': 'Checkout',
          'cart.continueShopping': 'Continue Shopping',
          'cart.itemCount': '{{count}} item(s)',
          
          // Checkout
          'checkout.title': 'Checkout',
          'checkout.shipping': 'Shipping Information',
          'checkout.payment': 'Payment Information',
          'checkout.review': 'Review Order',
          'checkout.placeOrder': 'Place Order',
          'checkout.firstName': 'First Name',
          'checkout.lastName': 'Last Name',
          'checkout.email': 'Email',
          'checkout.phone': 'Phone',
          'checkout.address': 'Address',
          'checkout.city': 'City',
          'checkout.state': 'State',
          'checkout.zipCode': 'ZIP Code',
          'checkout.country': 'Country',
          
          // Features
          'features.search': 'Advanced Search',
          'features.videoChat': 'Video Chat',
          'features.blockchain': 'Blockchain Rewards',
          'features.aiChat': 'AI Assistant',
          'features.virtualTryOn': 'Virtual Try-On',
          'features.socialFeed': 'Social Feed',
          'features.subscription': 'Subscriptions',
          'features.language': 'Language'
        },
        
        es: {
          // Common
          'common.loading': 'Cargando...',
          'common.error': 'Error',
          'common.success': 'Éxito',
          'common.cancel': 'Cancelar',
          'common.save': 'Guardar',
          'common.delete': 'Eliminar',
          'common.edit': 'Editar',
          'common.close': 'Cerrar',
          'common.search': 'Buscar',
          'common.filter': 'Filtrar',
          'common.sort': 'Ordenar',
          'common.price': 'Precio',
          'common.quantity': 'Cantidad',
          'common.total': 'Total',
          'common.subtotal': 'Subtotal',
          'common.tax': 'Impuesto',
          'common.shipping': 'Envío',
          'common.discount': 'Descuento',
          
          // Navigation
          'nav.home': 'Inicio',
          'nav.products': 'Productos',
          'nav.cart': 'Carrito',
          'nav.wishlist': 'Lista de Deseos',
          'nav.profile': 'Perfil',
          'nav.login': 'Iniciar Sesión',
          'nav.register': 'Registrarse',
          'nav.logout': 'Cerrar Sesión',
          'nav.admin': 'Administrador',
          
          // Products
          'products.title': 'Productos',
          'products.search': 'Buscar productos...',
          'products.filter': 'Filtrar Productos',
          'products.sort': 'Ordenar por',
          'products.addToCart': 'Agregar al Carrito',
          'products.addToWishlist': 'Agregar a Deseos',
          'products.viewDetails': 'Ver Detalles',
          'products.outOfStock': 'Agotado',
          'products.inStock': 'En Stock',
          'products.rating': 'Calificación',
          'products.reviews': 'Reseñas',
          'products.description': 'Descripción',
          'products.specifications': 'Especificaciones',
          'products.features': 'Características',
          
          // Cart
          'cart.title': 'Carrito de Compras',
          'cart.empty': 'Tu carrito está vacío',
          'cart.remove': 'Eliminar',
          'cart.update': 'Actualizar',
          'cart.checkout': 'Finalizar Compra',
          'cart.continueShopping': 'Continuar Comprando',
          'cart.itemCount': '{{count}} artículo(s)',
          
          // Checkout
          'checkout.title': 'Finalizar Compra',
          'checkout.shipping': 'Información de Envío',
          'checkout.payment': 'Información de Pago',
          'checkout.review': 'Revisar Pedido',
          'checkout.placeOrder': 'Realizar Pedido',
          'checkout.firstName': 'Nombre',
          'checkout.lastName': 'Apellido',
          'checkout.email': 'Correo Electrónico',
          'checkout.phone': 'Teléfono',
          'checkout.address': 'Dirección',
          'checkout.city': 'Ciudad',
          'checkout.state': 'Estado',
          'checkout.zipCode': 'Código Postal',
          'checkout.country': 'País',
          
          // Features
          'features.search': 'Búsqueda Avanzada',
          'features.videoChat': 'Chat de Video',
          'features.blockchain': 'Recompensas Blockchain',
          'features.aiChat': 'Asistente IA',
          'features.virtualTryOn': 'Prueba Virtual',
          'features.socialFeed': 'Feed Social',
          'features.subscription': 'Suscripciones',
          'features.language': 'Idioma'
        },
        
        fr: {
          // Common
          'common.loading': 'Chargement...',
          'common.error': 'Erreur',
          'common.success': 'Succès',
          'common.cancel': 'Annuler',
          'common.save': 'Enregistrer',
          'common.delete': 'Supprimer',
          'common.edit': 'Modifier',
          'common.close': 'Fermer',
          'common.search': 'Rechercher',
          'common.filter': 'Filtrer',
          'common.sort': 'Trier',
          'common.price': 'Prix',
          'common.quantity': 'Quantité',
          'common.total': 'Total',
          'common.subtotal': 'Sous-total',
          'common.tax': 'Taxe',
          'common.shipping': 'Livraison',
          'common.discount': 'Remise',
          
          // Navigation
          'nav.home': 'Accueil',
          'nav.products': 'Produits',
          'nav.cart': 'Panier',
          'nav.wishlist': 'Liste de Souhaits',
          'nav.profile': 'Profil',
          'nav.login': 'Connexion',
          'nav.register': 'S\'inscrire',
          'nav.logout': 'Déconnexion',
          'nav.admin': 'Administrateur',
          
          // Products
          'products.title': 'Produits',
          'products.search': 'Rechercher des produits...',
          'products.filter': 'Filtrer les Produits',
          'products.sort': 'Trier par',
          'products.addToCart': 'Ajouter au Panier',
          'products.addToWishlist': 'Ajouter aux Souhaits',
          'products.viewDetails': 'Voir les Détails',
          'products.outOfStock': 'Rupture de Stock',
          'products.inStock': 'En Stock',
          'products.rating': 'Note',
          'products.reviews': 'Avis',
          'products.description': 'Description',
          'products.specifications': 'Spécifications',
          'products.features': 'Caractéristiques',
          
          // Cart
          'cart.title': 'Panier d\'Achat',
          'cart.empty': 'Votre panier est vide',
          'cart.remove': 'Supprimer',
          'cart.update': 'Mettre à jour',
          'cart.checkout': 'Commander',
          'cart.continueShopping': 'Continuer les Achats',
          'cart.itemCount': '{{count}} article(s)',
          
          // Checkout
          'checkout.title': 'Commande',
          'checkout.shipping': 'Informations de Livraison',
          'checkout.payment': 'Informations de Paiement',
          'checkout.review': 'Réviser la Commande',
          'checkout.placeOrder': 'Passer la Commande',
          'checkout.firstName': 'Prénom',
          'checkout.lastName': 'Nom',
          'checkout.email': 'Email',
          'checkout.phone': 'Téléphone',
          'checkout.address': 'Adresse',
          'checkout.city': 'Ville',
          'checkout.state': 'État',
          'checkout.zipCode': 'Code Postal',
          'checkout.country': 'Pays',
          
          // Features
          'features.search': 'Recherche Avancée',
          'features.videoChat': 'Chat Vidéo',
          'features.blockchain': 'Récompenses Blockchain',
          'features.aiChat': 'Assistant IA',
          'features.virtualTryOn': 'Essayage Virtuel',
          'features.socialFeed': 'Feed Social',
          'features.subscription': 'Abonnements',
          'features.language': 'Langue'
        }
      },
      
      // Actions
      setLanguage: (languageCode) => {
        const language = get().availableLanguages.find(lang => lang.code === languageCode);
        if (language) {
          set({ currentLanguage: languageCode });
          
          // Update document direction for RTL languages
          document.documentElement.dir = language.rtl ? 'rtl' : 'ltr';
          document.documentElement.lang = languageCode;
        }
      },
      
      getTranslation: (key, params = {}) => {
        const { currentLanguage, translations } = get();
        const translation = translations[currentLanguage]?.[key] || translations.en?.[key] || key;
        
        // Replace parameters in translation
        return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
          return params[param] || match;
        });
      },
      
      t: (key, params = {}) => {
        return get().getTranslation(key, params);
      },
      
      getCurrentLanguage: () => {
        return get().availableLanguages.find(lang => lang.code === get().currentLanguage);
      },
      
      isRTL: () => {
        return get().getCurrentLanguage()?.rtl || false;
      },
      
      // Format numbers and dates based on locale
      formatNumber: (number, options = {}) => {
        const { currentLanguage } = get();
        return new Intl.NumberFormat(currentLanguage, options).format(number);
      },
      
      formatCurrency: (amount, currency = 'USD') => {
        const { currentLanguage } = get();
        return new Intl.NumberFormat(currentLanguage, {
          style: 'currency',
          currency: currency
        }).format(amount);
      },
      
      formatDate: (date, options = {}) => {
        const { currentLanguage } = get();
        return new Intl.DateTimeFormat(currentLanguage, options).format(new Date(date));
      },
      
      formatRelativeTime: (date) => {
        const { currentLanguage } = get();
        const rtf = new Intl.RelativeTimeFormat(currentLanguage, { numeric: 'auto' });
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (Math.abs(days) >= 1) return rtf.format(days, 'day');
        if (Math.abs(hours) >= 1) return rtf.format(hours, 'hour');
        if (Math.abs(minutes) >= 1) return rtf.format(minutes, 'minute');
        return rtf.format(seconds, 'second');
      }
    }),
    {
      name: 'i18n-store',
      partialize: (state) => ({
        currentLanguage: state.currentLanguage
      })
    }
  )
);

export { useI18nStore };
