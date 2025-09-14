import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../cartStore'

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCartStore.getState().clearCart()
  })

  it('should initialize with empty cart', () => {
    const state = useCartStore.getState()
    expect(state.items).toEqual([])
    expect(state.total).toBe(0)
    expect(state.itemCount).toBe(0)
  })

  it('should add item to cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    useCartStore.getState().addItem(product, 2)

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toMatchObject({
      id: '1',
      name: 'Test Product',
      price: 29.99,
      quantity: 2,
      maxStock: 10
    })
    expect(state.total).toBe(59.98)
    expect(state.itemCount).toBe(2)
  })

  it('should update quantity when adding existing item', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    useCartStore.getState().addItem(product, 2)
    useCartStore.getState().addItem(product, 3)

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(5)
    expect(state.total).toBe(149.95)
    expect(state.itemCount).toBe(5)
  })

  it('should remove item from cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    useCartStore.getState().addItem(product, 2)
    useCartStore.getState().removeItem('1')

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
    expect(state.total).toBe(0)
    expect(state.itemCount).toBe(0)
  })

  it('should update item quantity', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    useCartStore.getState().addItem(product, 2)
    useCartStore.getState().updateQuantity('1', 5)

    const state = useCartStore.getState()
    expect(state.items[0].quantity).toBe(5)
    expect(state.total).toBe(149.95)
    expect(state.itemCount).toBe(5)
  })

  it('should not exceed max stock when updating quantity', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    useCartStore.getState().addItem(product, 2)
    useCartStore.getState().updateQuantity('1', 15)

    const state = useCartStore.getState()
    expect(state.items[0].quantity).toBe(10) // Should be capped at maxStock
    expect(state.total).toBe(299.90)
    expect(state.itemCount).toBe(10)
  })

  it('should remove item when quantity is set to 0', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    useCartStore.getState().addItem(product, 2)
    useCartStore.getState().updateQuantity('1', 0)

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
    expect(state.total).toBe(0)
    expect(state.itemCount).toBe(0)
  })

  it('should clear entire cart', () => {
    const product1 = {
      id: '1',
      name: 'Test Product 1',
      price: 29.99,
      image: 'test1.jpg',
      stock: 10
    }

    const product2 = {
      id: '2',
      name: 'Test Product 2',
      price: 19.99,
      image: 'test2.jpg',
      stock: 5
    }

    useCartStore.getState().addItem(product1, 2)
    useCartStore.getState().addItem(product2, 1)
    useCartStore.getState().clearCart()

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
    expect(state.total).toBe(0)
    expect(state.itemCount).toBe(0)
  })

  it('should check if item is in cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    expect(useCartStore.getState().isInCart('1')).toBe(false)
    
    useCartStore.getState().addItem(product, 1)
    expect(useCartStore.getState().isInCart('1')).toBe(true)
  })

  it('should get item quantity in cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: 'test.jpg',
      stock: 10
    }

    expect(useCartStore.getState().getItemQuantity('1')).toBe(0)
    
    useCartStore.getState().addItem(product, 3)
    expect(useCartStore.getState().getItemQuantity('1')).toBe(3)
  })
})
