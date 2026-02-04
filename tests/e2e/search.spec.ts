import { test, expect } from "@playwright/test";

test.describe("Search Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Debería mostrar el formulario de búsqueda", async ({ page }) => {
    await expect(page.locator("#customer-form")).toBeVisible();
    await expect(page.getByPlaceholder(/ID del cliente/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Buscar/i })).toBeVisible();
  });

  test("Debería validar el campo ID del cliente, vacío", async ({ page }) => {
    await page.getByRole("button", { name: /Buscar/i }).click();
    await expect(
      page.getByText(/El ID del cliente es obligatorio/i),
    ).toBeVisible();
  });

  test("Debería validar el campo ID del cliente, formato incorrecto", async ({
    page,
  }) => {
    await page.getByPlaceholder(/ID del cliente/i).fill("cust001@");
    await page.getByRole("button", { name: /Buscar/i }).click();
    await expect(page.getByText(/debe ser alfanumérico /i)).toBeVisible();
  });

  test("Debería encontrar al cliente y redirigir a la página de facturas", async ({
    page,
  }) => {
    await page.getByPlaceholder(/ID del cliente/i).fill("CUST001");
    await page.getByRole("button", { name: /Buscar/i }).click();

    await expect(page).toHaveURL(/\/invoices\/CUST001/);
    await expect(page.locator("#page-title")).toBeVisible();
  });

  test("debería mostrar un error para clientes inexistentes", async ({
    page,
  }) => {
    await page.getByPlaceholder(/ID del cliente/i).fill("CUST0015");
    await page.getByRole("button", { name: /Buscar/i }).click();

    await expect(page.getByText(/no encontrado/i)).toBeVisible();
  });
});
