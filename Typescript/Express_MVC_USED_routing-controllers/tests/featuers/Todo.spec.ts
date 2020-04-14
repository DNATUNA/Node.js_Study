import supertest from 'supertest';
import { app } from '../../src/app';

describe('test Todo', () => {
  const client = supertest(app);

  test('index', async () => {
    const response = client.get('/todos');
    expect((await response).status).toEqual(200);
  });

  test('index', async () => {
    const response = client.post('/todos');
    expect((await response).status).toEqual(200);
    expect(Array.isArray((await response).body)).toBe(true);
    const body: any[] = (await response).body;
    expect(body.length).toBeGreaterThanOrEqual(1);
    let mustHasKeys = ['id', 'title', 'description'];
    Object.keys(body[0]).forEach((key: string) => {
      if (mustHasKeys.includes(key)) {
        mustHasKeys = mustHasKeys.splice(mustHasKeys.indexOf(key), 1);
      }
    });
  });
});
