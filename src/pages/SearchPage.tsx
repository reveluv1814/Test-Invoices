import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../components/SearchForm";
import { invoiceService } from "../services/invoiceService";
import "./SearchPage.css";

export const SearchPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (customerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await invoiceService.verifyCustomer(customerId);

      if (response.success && response.customer) {
        navigate(`/invoices/${response.customer.id}`);
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Cliente no encontrado. Verifique el ID e intente nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <header className="hero-header">
        <h1>Sistema de Pago de Facturas</h1>
        <p>Consulte y pague sus facturas de servicios</p>
      </header>

      <div className="search-container">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        {error && (
          <div className="alert-error">
            <i className="ri-error-warning-line" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
