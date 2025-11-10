import { render, screen } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    _id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 10.00,
    image: 'https://example.com/image.jpg',
    stock: 100,
  };

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render product price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('10 TND')).toBeInTheDocument();
  });

  it('should render product stock', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/Stock: 100/)).toBeInTheDocument();
  });

  it('should render product image', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('should have link to product detail', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByText('Voir détails');
    expect(link.closest('a')).toHaveAttribute('href', '/products/1');
  });
});


