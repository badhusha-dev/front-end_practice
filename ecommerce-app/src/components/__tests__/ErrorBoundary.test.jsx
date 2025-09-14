import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ErrorBoundary, { ErrorMessage, EmptyState } from '../ErrorBoundary'

// Mock component that throws an error
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary Components', () => {
  describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )
      expect(screen.getByText('No error')).toBeInTheDocument()
    })

    it('renders error UI when there is an error', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })
  })

  describe('ErrorMessage', () => {
    it('renders error message when error is provided', () => {
      const error = { message: 'Test error message' }
      render(<ErrorMessage error={error} />)
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Test error message')).toBeInTheDocument()
    })

    it('does not render when no error is provided', () => {
      render(<ErrorMessage error={null} />)
      expect(screen.queryByText('Error')).not.toBeInTheDocument()
    })

    it('renders retry button when onRetry is provided', () => {
      const error = { message: 'Test error' }
      const onRetry = vi.fn()
      render(<ErrorMessage error={error} onRetry={onRetry} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('EmptyState', () => {
    it('renders empty state with title and description', () => {
      render(
        <EmptyState 
          title="No items" 
          description="There are no items to display"
        />
      )
      expect(screen.getByText('No items')).toBeInTheDocument()
      expect(screen.getByText('There are no items to display')).toBeInTheDocument()
    })

    it('renders with action when provided', () => {
      const action = <button>Add Item</button>
      render(
        <EmptyState 
          title="No items" 
          description="There are no items to display"
          action={action}
        />
      )
      expect(screen.getByText('Add Item')).toBeInTheDocument()
    })
  })
})
