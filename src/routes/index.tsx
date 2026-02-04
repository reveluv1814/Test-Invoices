import { Routes, Route } from "react-router-dom";
import { SearchPage } from "../pages/SearchPage";
import { InvoicesPage } from "../pages/InvoicesPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/invoices/:customerId" element={<InvoicesPage />} />
    </Routes>
  );
};
