import { describe, it, expect } from 'vitest'
import { makeStore } from './store'

describe('Redux Store', () => {
    it('should initialize with correct default state keys', () => {
        const store = makeStore()
        const state = store.getState()
        
        expect(state).toHaveProperty('cart')
        expect(state).toHaveProperty('product')
        expect(state).toHaveProperty('address')
        expect(state).toHaveProperty('rating')
    })

    it('should have initial product list populated with dummy data', () => {
        const store = makeStore()
        const state = store.getState()
        
        expect(state.product.list).toBeInstanceOf(Array)
        expect(state.product.list.length).toBeGreaterThan(0)
    })
})
