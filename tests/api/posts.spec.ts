import { test, expect } from '@playwright/test';

test.describe('Posts API', () => {
  test('GET /posts/1 devuelve el post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(body.title).toBeTruthy();
  });

  test('POST /posts crea un post', async ({ request }) => {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject(payload);
  });

  test('GET /posts/99999 devuelve 404', async ({ request }) => {
    const response = await request.get('/posts/99999');
    expect(response.status()).toBe(404);
  });
});