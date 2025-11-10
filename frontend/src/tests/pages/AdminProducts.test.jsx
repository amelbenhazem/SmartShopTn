import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import AdminProducts from '../../pages/AdminProducts';
import api from '../../services/api';

// Mock API
jest.mock('../../services/api');
const mockApi = api;

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('AdminProducts', () => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Huile d\'olive',
      description: 'Huile d\'olive de Sfax',
      price: 45.00,
      category: 'Épicerie',
      stock: 50,
      origin: 'Sfax, Tunisie',
      image: 'https://example.com/image.jpg',
    },
    {
      _id: '2',
      name: 'Dattes',
      description: 'Dattes Deglet Nour',
      price: 25.00,
      category: 'Épicerie',
      stock: 100,
      origin: 'Tozeur, Tunisie',
      image: 'https://example.com/image2.jpg',
    },
  ];

  beforeEach(() => {
    mockApi.get.mockResolvedValue({ data: { products: mockProducts } });
    mockApi.post.mockResolvedValue({ data: { product: mockProducts[0] } });
    mockApi.put.mockResolvedValue({ data: { product: mockProducts[0] } });
    mockApi.delete.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render products list', async () => {
    renderWithProviders(<AdminProducts />);
    
    await waitFor(() => {
      expect(screen.getByText('Huile d\'olive')).toBeInTheDocument();
      expect(screen.getByText('Dattes')).toBeInTheDocument();
    });
  });

  it('should show add product button', () => {
    renderWithProviders(<AdminProducts />);
    expect(screen.getByText('+ Ajouter un produit')).toBeInTheDocument();
  });

  it('should open form when clicking add product button', async () => {
    renderWithProviders(<AdminProducts />);
    
    const addButton = screen.getByText('+ Ajouter un produit');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Nouveau produit')).toBeInTheDocument();
      expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    });
  });

  it('should submit new product form', async () => {
    renderWithProviders(<AdminProducts />);
    
    // Open form
    fireEvent.click(screen.getByText('+ Ajouter un produit'));

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/Nom/i);
      fireEvent.change(nameInput, { target: { value: 'Nouveau Produit' } });
    });

    const descriptionInput = screen.getByLabelText(/Description/i);
    const priceInput = screen.getByLabelText(/Prix/i);
    const stockInput = screen.getByLabelText(/Stock/i);
    const originInput = screen.getByLabelText(/Origine/i);

    fireEvent.change(descriptionInput, { target: { value: 'Description test' } });
    fireEvent.change(priceInput, { target: { value: '30' } });
    fireEvent.change(stockInput, { target: { value: '50' } });
    fireEvent.change(originInput, { target: { value: 'Tunis, Tunisie' } });

    const submitButton = screen.getByText('Ajouter');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalledWith('/products', expect.objectContaining({
        name: 'Nouveau Produit',
        price: 30,
        stock: 50,
      }));
    });
  });

  it('should edit product', async () => {
    renderWithProviders(<AdminProducts />);
    
    await waitFor(() => {
      expect(screen.getByText('Huile d\'olive')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText('Modifier');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Modifier le produit')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Huile d\'olive')).toBeInTheDocument();
    });
  });

  it('should delete product', async () => {
    // Mock window.confirm
    window.confirm = jest.fn(() => true);

    renderWithProviders(<AdminProducts />);
    
    await waitFor(() => {
      expect(screen.getByText('Huile d\'olive')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('Supprimer');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockApi.delete).toHaveBeenCalledWith('/products/1');
    });
  });

  it('should display empty state when no products', async () => {
    mockApi.get.mockResolvedValue({ data: { products: [] } });
    
    renderWithProviders(<AdminProducts />);
    
    await waitFor(() => {
      expect(screen.getByText('Aucun produit trouvé')).toBeInTheDocument();
    });
  });
});

