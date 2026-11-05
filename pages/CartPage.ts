import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  async removeItem(productSlug: string) {
    await this.page.getByTestId(`remove-${productSlug}`).click();
  }
}