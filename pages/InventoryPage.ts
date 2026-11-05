import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addToCart(productSlug: string) {
    await this.page.getByTestId(`add-to-cart-${productSlug}`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}