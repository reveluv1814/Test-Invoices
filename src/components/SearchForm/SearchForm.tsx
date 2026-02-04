import "./SearchForm.css";
import type { SearchFormProps } from "./SearchForm.types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const searchSchema = z.object({
  customerId: z
    .string()
    .min(1, "El ID del cliente es obligatorio")
    .regex(
      /^[A-Z0-9]+$/,
      "El ID debe ser alfanumérico en mayúsculas (ej: CUST001)",
    )
    .transform((val) => val.toUpperCase()),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.customerId);
  };

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit(onSubmit)}
      id="customer-form"
    >
      <div className="input-group">
        <label htmlFor="customerId" className="input-label">
          ID del Cliente
          <span
            className="icon-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Información sobre el formato"
          >
            <i className="ri-question-line" />
          </span>
          {showTooltip && (
            <span className="help-tooltip">
              Formato: MAYÚSCULAS y números (ej: CUST001)
            </span>
          )}
        </label>

        <div className="input-wrapper">
          <i className="ri-user-line input-icon" />
          <input
            type="text"
            id="customerId"
            {...register("customerId")}
            placeholder="Ingrese el ID del cliente"
            className={`input-field ${errors.customerId ? "error" : ""}`}
            disabled={isLoading}
          />
        </div>
        {errors.customerId && (
          <span className="error-text">{errors.customerId.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="btn-search"
        disabled={!!errors.customerId || isLoading}
      >
        {isLoading ? (
          <>
            <i className="ri-loader-4-line btn-icon spinning" />
            Buscando...
          </>
        ) : (
          <>
            <i className="ri-search-line btn-icon" />
            Buscar Facturas
          </>
        )}
      </button>
    </form>
  );
};
