import type { Invoice, Customer } from "../types";

export const EnumInvoiceStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
} as const;

export const mockCustomers: Customer[] = [
  {
    id: "CUST001",
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
  },
  {
    id: "CUST002",
    nombre: "María García",
    email: "maria.garcia@example.com",
  },
  {
    id: "CUST003",
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
  },
  {
    id: "CUST004",
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "INV001",
    customerId: "CUST001",
    servicio: "Electricidad",
    periodo: "Enero 2026",
    monto: 45000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-15",
  },
  {
    id: "INV002",
    customerId: "CUST001",
    servicio: "Agua",
    periodo: "Enero 2026",
    monto: 18500,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-15",
  },
  {
    id: "INV003",
    customerId: "CUST001",
    servicio: "Gas",
    periodo: "Diciembre 2025",
    monto: 12300,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2025-12-15",
  },
  {
    id: "INV004",
    customerId: "CUST002",
    servicio: "Internet",
    periodo: "Enero 2026",
    monto: 35000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-10",
  },
  {
    id: "INV005",
    customerId: "CUST002",
    servicio: "Electricidad",
    periodo: "Enero 2026",
    monto: 52000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-15",
  },
  {
    id: "INV006",
    customerId: "CUST003",
    servicio: "Agua",
    periodo: "Enero 2026",
    monto: 21000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-15",
  },
  {
    id: "INV007",
    customerId: "CUST001",
    servicio: "Gas",
    periodo: "Enero 2026",
    monto: 15000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-15",
  },
  {
    id: "INV008",
    customerId: "CUST001",
    servicio: "Telefonía Móvil",
    periodo: "Enero 2026",
    monto: 29000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-12",
  },
  {
    id: "INV009",
    customerId: "CUST001",
    servicio: "Gas",
    periodo: "Enero 2026",
    monto: 18000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-01-15",
  },
  {
    id: "INV010",
    customerId: "CUST002",
    servicio: "Electricidad",
    periodo: "Febrero 2026",
    monto: 48000,
    estado: EnumInvoiceStatus.PENDING,
    fechaEmision: "2026-02-15",
  },
];
