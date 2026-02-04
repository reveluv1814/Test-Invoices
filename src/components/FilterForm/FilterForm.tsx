import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import type { FilterFormProps } from "./FilterForm.types";
import "./FilterForm.css";
import { EnumInvoiceStatus, type InvoiceStatus } from "../../types";

const filterSchema = z.object({
  estado: z
    .enum([EnumInvoiceStatus.PENDING, EnumInvoiceStatus.PAID, ""])
    .optional(),
  servicio: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

export const FilterForm = ({
  setEstado,
  setServicio,
  isLoading,
}: FilterFormProps) => {
  const {
    register,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      estado: "",
      servicio: "",
    },
  });

  const estadoWatch = watch("estado");
  const servicioWatch = watch("servicio");

  useEffect(() => {
    const timer = setTimeout(() => {
      setEstado(estadoWatch as InvoiceStatus | undefined);
      setServicio(servicioWatch);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estadoWatch, servicioWatch]);

  const handleReset = () => {
    if (!isDirty) return;
    reset({
      estado: "",
      servicio: "",
    });
    setEstado(undefined);
    setServicio("");
  };

  return (
    <div className="filter-form">
      <div className="filter-form-header">
        <div className="filter-header-content">
          <i className="ri-filter-3-line filter-icon" />
          <h3>Filtros de Búsqueda</h3>
        </div>
        <button
          type="button"
          className={`filter-btn-reset ${isDirty ? "active" : ""}`}
          onClick={handleReset}
          disabled={isLoading || !isDirty}
          title="Limpiar filtros"
        >
          <i className="ri-close-circle-line" />
          Limpiar
        </button>
      </div>

      <div className="filter-fields">
        <div className="filter-field">
          <label htmlFor="estado">
            <i className="ri-checkbox-circle-line" />
            Estado
          </label>
          <select
            id="estado"
            {...register("estado")}
            disabled={isLoading}
            className="filter-select"
          >
            <option value="">Todos los estados</option>
            <option value={EnumInvoiceStatus.PENDING}>Pendiente</option>
            <option value={EnumInvoiceStatus.PAID}>Pagada</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="servicio">
            <i className="ri-search-line" />
            Servicio
          </label>
          <input
            type="text"
            id="servicio"
            {...register("servicio")}
            disabled={isLoading}
            className="filter-input"
            placeholder="Buscar por servicio..."
          />
        </div>
      </div>
    </div>
  );
};
