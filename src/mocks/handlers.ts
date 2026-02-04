import { http, HttpResponse } from "msw";
import { mockInvoices, mockCustomers } from "./data";
import type { Invoice } from "../types";
import { constantsConfig } from "../config/config";

const API_BASE_URL = `${constantsConfig.baseUrl}/api`;

const invoicesDB: Invoice[] = [...mockInvoices];

export const handlersEndPoint = [
  // Verificar/Buscar cliente por ID
  http.get(`${API_BASE_URL}/customers/:customerId`, ({ params }) => {
    const { customerId } = params;

    const customer = mockCustomers.find(
      (customer) => customer.id === customerId,
    );

    if (!customer) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            HttpResponse.json(
              { message: "Cliente no encontrado" },
              { status: 404 },
            ),
          );
        }, 300);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            success: true,
            customer,
          }),
        );
      }, 300);
    });
  }),

  // Obtener facturas por customerId
  http.get(`${API_BASE_URL}/invoices`, ({ request }) => {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const estado = url.searchParams.get("estado");
    const servicio = url.searchParams.get("servicio");
    if (!customerId) {
      return HttpResponse.json(
        { message: "customerId es requerido" },
        { status: 400 },
      );
    }

    let customerInvoices = invoicesDB.filter(
      (invoice) => invoice.customerId === customerId,
    );

    if (estado) {
      customerInvoices = customerInvoices.filter(
        (invoice) => invoice.estado === estado,
      );
    }

    if (servicio) {
      customerInvoices = customerInvoices.filter(
        (invoice) => invoice.servicio.toLowerCase() === servicio.toLowerCase(),
      );
    }

    const total = customerInvoices.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = customerInvoices.slice(startIndex, endIndex);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            data: paginatedData,
            pagination: {
              page,
              total,
              totalPages,
            },
          }),
        );
      }, 500);
    });
  }),

  // Pagar una factura
  http.post(`${API_BASE_URL}/invoices/:id/pay`, async ({ params }) => {
    const { id } = params;

    const invoiceIndex = invoicesDB.findIndex((invoice) => invoice.id === id);

    if (invoiceIndex === -1) {
      return HttpResponse.json(
        { message: "Factura no encontrada" },
        { status: 404 },
      );
    }

    const invoice = invoicesDB[invoiceIndex];

    if (invoice.estado === "PAID") {
      return HttpResponse.json(
        { message: "La factura ya está pagada" },
        { status: 400 },
      );
    }

    invoicesDB[invoiceIndex] = {
      ...invoice,
      estado: "PAID",
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            success: true,
            message: "Pago procesado exitosamente",
            invoice: invoicesDB[invoiceIndex],
          }),
        );
      }, 800);
    });
  }),

  // Obtener una factura por ID
  http.get(`${API_BASE_URL}/invoices/:id`, ({ params }) => {
    const { id } = params;
    const invoice = invoicesDB.find((inv) => inv.id === id);

    if (!invoice) {
      return HttpResponse.json(
        { message: "Factura no encontrada" },
        { status: 404 },
      );
    }

    return HttpResponse.json(invoice);
  }),
];
