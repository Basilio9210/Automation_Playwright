import { test, expect } from '../../fixtures/pages';

const products = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  bikeLight: { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
};

test.describe('Shopping Cart', () => {
  test('adding a product shows 1 in the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('the cart contains the added product', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
  });

  test('removing the product leaves the cart empty', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.openCart();
    await cartPage.removeItem(products.backpack.slug);
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  // Caso borde: con dos productos, quitar uno deja el otro
  test('removing one of two products keeps the other', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.addToCart(products.bikeLight.slug);
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.openCart();
    await cartPage.removeItem(products.bikeLight.slug);
    await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});