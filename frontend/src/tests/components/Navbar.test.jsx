import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('should render SmartShop TN brand', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('🛍️ SmartShop TN')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Produits')).toBeInTheDocument();
  });

  it('should render login and register links when not authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText('Inscription')).toBeInTheDocument();
  });
});


