import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useVirtualTryOnStore = create(
  persist(
    (set, get) => ({
      // Virtual try-on state
      isActive: false,
      isCameraActive: false,
      isProcessing: false,
      
      // User measurements and preferences
      userProfile: {
        height: 170, // cm
        weight: 70, // kg
        bodyType: 'average', // slim, average, athletic, plus
        skinTone: 'medium', // light, medium, tan, dark
        hairColor: 'brown', // blonde, brown, black, red, gray
        eyeColor: 'brown', // blue, brown, green, hazel
        measurements: {
          chest: 95, // cm
          waist: 80, // cm
          hips: 95, // cm
          inseam: 80, // cm
          shoeSize: 42 // EU size
        }
      },
      
      // Current try-on session
      currentSession: null,
      selectedItems: [],
      tryOnHistory: [],
      
      // Camera and AR state
      cameraStream: null,
      videoElement: null,
      canvasElement: null,
      isARSupported: false,
      
      // Virtual fitting room
      fittingRoom: {
        background: 'white',
        lighting: 'natural',
        mirrorMode: false,
        showMeasurements: false
      },
      
      // Actions
      initializeVirtualTryOn: async () => {
        set({ isProcessing: true });
        
        try {
          // Check for camera access
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              width: 1280, 
              height: 720,
              facingMode: 'user'
            } 
          });
          
          set({
            cameraStream: stream,
            isCameraActive: true,
            isARSupported: true,
            isProcessing: false
          });
          
          // Initialize AR capabilities
          get().initializeAR();
          
        } catch (error) {
          console.error('Camera access failed:', error);
          set({
            isProcessing: false,
            error: 'Camera access denied. Please enable camera permissions.'
          });
        }
      },
      
      initializeAR: () => {
        // Mock AR initialization
        console.log('AR capabilities initialized');
        set({ isARSupported: true });
      },
      
      startTryOnSession: (items) => {
        const session = {
          id: Date.now(),
          items: items,
          startTime: Date.now(),
          status: 'active',
          userProfile: get().userProfile,
          snapshots: []
        };
        
        set({
          currentSession: session,
          selectedItems: items,
          isActive: true
        });
      },
      
      endTryOnSession: () => {
        const { currentSession } = get();
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            endTime: Date.now(),
            status: 'completed',
            duration: Date.now() - currentSession.startTime
          };
          
          set(state => ({
            tryOnHistory: [completedSession, ...state.tryOnHistory],
            currentSession: null,
            selectedItems: [],
            isActive: false
          }));
        }
      },
      
      addItemToTryOn: (item) => {
        set(state => ({
          selectedItems: [...state.selectedItems, item]
        }));
      },
      
      removeItemFromTryOn: (itemId) => {
        set(state => ({
          selectedItems: state.selectedItems.filter(item => item.id !== itemId)
        }));
      },
      
      updateUserProfile: (updates) => {
        set(state => ({
          userProfile: { ...state.userProfile, ...updates }
        }));
      },
      
      updateMeasurements: (measurements) => {
        set(state => ({
          userProfile: {
            ...state.userProfile,
            measurements: { ...state.userProfile.measurements, ...measurements }
          }
        }));
      },
      
      takeSnapshot: () => {
        const { currentSession } = get();
        if (currentSession) {
          const snapshot = {
            id: Date.now(),
            timestamp: Date.now(),
            items: get().selectedItems,
            userProfile: get().userProfile,
            imageData: null // Would contain actual image data
          };
          
          set(state => ({
            currentSession: {
              ...state.currentSession,
              snapshots: [...state.currentSession.snapshots, snapshot]
            }
          }));
        }
      },
      
      updateFittingRoom: (updates) => {
        set(state => ({
          fittingRoom: { ...state.fittingRoom, ...updates }
        }));
      },
      
      // Virtual fitting algorithms
      calculateFit: (item, userProfile) => {
        const { measurements } = userProfile;
        const itemMeasurements = item.measurements || {};
        
        // Mock fit calculation algorithm
        const fitScore = get().calculateFitScore(itemMeasurements, measurements);
        const recommendations = get().generateFitRecommendations(fitScore, item, userProfile);
        
        return {
          fitScore,
          recommendations,
          sizeRecommendation: get().recommendSize(item, userProfile),
          alterations: get().suggestAlterations(item, userProfile)
        };
      },
      
      calculateFitScore: (itemMeasurements, userMeasurements) => {
        // Mock fit scoring algorithm
        let score = 100;
        
        Object.keys(itemMeasurements).forEach(key => {
          const itemValue = itemMeasurements[key];
          const userValue = userMeasurements[key];
          if (itemValue && userValue) {
            const difference = Math.abs(itemValue - userValue);
            const percentage = (difference / userValue) * 100;
            score -= percentage * 0.5; // Reduce score based on difference
          }
        });
        
        return Math.max(0, Math.min(100, score));
      },
      
      generateFitRecommendations: (fitScore, item, userProfile) => {
        const recommendations = [];
        
        if (fitScore >= 90) {
          recommendations.push('Perfect fit! This item will look great on you.');
        } else if (fitScore >= 75) {
          recommendations.push('Good fit with minor adjustments needed.');
        } else if (fitScore >= 60) {
          recommendations.push('Moderate fit. Consider sizing up or down.');
        } else {
          recommendations.push('Poor fit. This item may not be suitable for your measurements.');
        }
        
        // Add specific recommendations based on item type
        if (item.category === 'clothing') {
          if (userProfile.bodyType === 'athletic') {
            recommendations.push('This style complements athletic builds well.');
          }
        }
        
        return recommendations;
      },
      
      recommendSize: (item, userProfile) => {
        const { measurements } = userProfile;
        const availableSizes = item.availableSizes || ['S', 'M', 'L', 'XL'];
        
        // Mock size recommendation algorithm
        if (measurements.chest < 90) return 'S';
        if (measurements.chest < 100) return 'M';
        if (measurements.chest < 110) return 'L';
        return 'XL';
      },
      
      suggestAlterations: (item, userProfile) => {
        const alterations = [];
        const { measurements } = userProfile;
        const itemMeasurements = item.measurements || {};
        
        if (itemMeasurements.waist && measurements.waist > itemMeasurements.waist) {
          alterations.push('Waist may need to be let out');
        }
        
        if (itemMeasurements.inseam && measurements.inseam > itemMeasurements.inseam) {
          alterations.push('Pants may need to be lengthened');
        }
        
        return alterations;
      },
      
      // Mock product data for virtual try-on
      getTryOnCompatibleItems: () => {
        return [
          {
            id: 1,
            name: 'Classic White Shirt',
            category: 'clothing',
            type: 'shirt',
            brand: 'Fashion Brand',
            price: 49.99,
            image: '/api/placeholder/300/400',
            measurements: {
              chest: 100,
              waist: 85,
              length: 70
            },
            availableSizes: ['S', 'M', 'L', 'XL'],
            colors: ['white', 'blue', 'black'],
            materials: ['cotton', 'polyester'],
            tryOnCompatible: true,
            arModel: '/models/shirt.glb'
          },
          {
            id: 2,
            name: 'Denim Jeans',
            category: 'clothing',
            type: 'pants',
            brand: 'Denim Co.',
            price: 79.99,
            image: '/api/placeholder/300/400',
            measurements: {
              waist: 80,
              hips: 95,
              inseam: 80
            },
            availableSizes: ['28', '30', '32', '34', '36'],
            colors: ['blue', 'black', 'gray'],
            materials: ['denim', 'cotton'],
            tryOnCompatible: true,
            arModel: '/models/jeans.glb'
          },
          {
            id: 3,
            name: 'Leather Jacket',
            category: 'clothing',
            type: 'jacket',
            brand: 'Leather Works',
            price: 199.99,
            image: '/api/placeholder/300/400',
            measurements: {
              chest: 105,
              waist: 90,
              length: 65
            },
            availableSizes: ['S', 'M', 'L', 'XL'],
            colors: ['black', 'brown'],
            materials: ['leather'],
            tryOnCompatible: true,
            arModel: '/models/jacket.glb'
          }
        ];
      },
      
      // Analytics and insights
      getTryOnAnalytics: () => {
        const { tryOnHistory } = get();
        return {
          totalSessions: tryOnHistory.length,
          averageSessionDuration: tryOnHistory.reduce((acc, session) => acc + session.duration, 0) / tryOnHistory.length,
          mostTriedItems: get().getMostTriedItems(),
          fitAccuracy: get().calculateFitAccuracy(),
          userSatisfaction: 4.7
        };
      },
      
      getMostTriedItems: () => {
        const { tryOnHistory } = get();
        const itemCounts = {};
        
        tryOnHistory.forEach(session => {
          session.items.forEach(item => {
            itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
          });
        });
        
        return Object.entries(itemCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([itemId, count]) => ({ itemId, count }));
      },
      
      calculateFitAccuracy: () => {
        // Mock fit accuracy calculation
        return 87.5; // Percentage
      },
      
      // Cleanup
      cleanup: () => {
        const { cameraStream } = get();
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
        }
        
        set({
          isActive: false,
          isCameraActive: false,
          cameraStream: null,
          currentSession: null,
          selectedItems: []
        });
      }
    }),
    {
      name: 'virtual-tryon-store',
      partialize: (state) => ({
        userProfile: state.userProfile,
        tryOnHistory: state.tryOnHistory,
        fittingRoom: state.fittingRoom
      })
    }
  )
);

export { useVirtualTryOnStore };
