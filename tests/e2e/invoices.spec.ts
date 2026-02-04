import { test, expect } from "@playwright/test";

test.describe("Flujo de Pago", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/invoices/CUST001");
  });

  test.describe("Página de Facturas", () => {
    test("Debería mostrar la tabla de facturas", async ({ page }) => {
      await expect(page.locator("#page-title")).toBeVisible();
      await page.waitForSelector("table tbody tr");
      await expect(page.locator(".invoice-table-container")).toBeVisible();
    });

    test("Debería filtrar las facturas por estado", async ({ page }) => {
      await page.waitForSelector("table tbody tr");
      await page.locator("#filter-button").click();
      await page.getByLabel(/Estado/i).selectOption("Pendiente");

      const pendingChips = page.locator(".chip");
      await expect(pendingChips.first()).toBeVisible();

      const paidChips = page.locator('.chip:has-text("Pagado")');
      await expect(paidChips).toHaveCount(0);
    });

    test("Debería filtrar las facturas por servicio", async ({ page }) => {
      await page.waitForSelector("table tbody tr");
      await page.locator("#filter-button").click();

      await page.locator("#servicio").fill("Electricidad");
      const pendingChips = page.locator(".chip");

      await expect(pendingChips.first()).toBeVisible();
    });

    test("Debería limpiar los filtros", async ({ page }) => {
      await page.waitForSelector("table tbody tr");
      await page.locator("#filter-button").click();

      await page.getByLabel(/Estado/i).selectOption("Pendiente");
      await page.locator("#servicio").fill("Electricidad");

      await page.locator(".filter-btn-reset").click();
      await expect(page.getByLabel(/Estado/i)).toHaveValue("");
      await expect(page.getByLabel(/Servicio/i)).toHaveValue("");
    });

    test("Debería de paginar", async ({ page }) => {
      await page.waitForSelector(".pagination");

      const nextButton = page.getByRole("button", { name: /Siguiente/i });
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        await expect(page.getByText(/Página 2/i)).toBeVisible();
      }
    });
  });

  test.describe("Proceso de Pago", () => {
    test("Debería abrir el modal de pago para una factura pendiente", async ({
      page,
    }) => {
      const payButton = page.getByRole("button", { name: /Pagar/i }).first();
      await payButton.click();

      await expect(
        page.getByRole("heading", { name: /Confirmar Pago/i }),
      ).toBeVisible();
      await page.locator("#btn-payment-confirm").click();
    });

    test("Debería cerrar el modal de pago al cancelar", async ({ page }) => {
      await page.getByRole("button", { name: /Pagar/i }).first().click();
      await page.locator("#btn-payment-cancel").click();

      await expect(
        page.getByRole("heading", { name: /Confirmar Pago/i }),
      ).not.toBeVisible();
    });

    test("Debería procesar el pago con doble confirmación", async ({
      page,
    }) => {
      await page.getByRole("button", { name: /Pagar/i }).first().click();

      await page.locator("#btn-payment-confirm").click();

      await expect(page.getByText(/¿Está seguro/i)).toBeVisible();
      await page.locator("#btn-confirm-confirm").click();

      await expect(page.getByText(/pago procesado/i)).toBeVisible();
    });
  });
});
