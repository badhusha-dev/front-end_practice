import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loading, { PageLoading, InlineLoading } from '../Loading'

describe('Loading Components', () => {
  describe('Loading', () => {
    it('renders loading spinner with default size', () => {
      render(<Loading />)
      const spinner = screen.getByTestId('loading-spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('renders loading spinner with small size', () => {
      render(<Loading size="sm" />)
      const spinner = screen.getByTestId('loading-spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('renders loading spinner with large size', () => {
      render(<Loading size="lg" />)
      const spinner = screen.getByTestId('loading-spinner')
      expect(spinner).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Loading className="custom-class" />)
      const container = screen.getByTestId('loading-container')
      expect(container).toHaveClass('custom-class')
    })
  })

  describe('PageLoading', () => {
    it('renders page loading with text', () => {
      render(<PageLoading />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('InlineLoading', () => {
    it('renders inline loading with default text', () => {
      render(<InlineLoading />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders inline loading with custom text', () => {
      render(<InlineLoading text="Custom loading..." />)
      expect(screen.getByText('Custom loading...')).toBeInTheDocument()
    })
  })
})
