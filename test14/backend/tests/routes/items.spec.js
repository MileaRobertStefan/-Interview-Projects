const express = require('express');
const request = require('supertest');

jest.mock('@services/dataService');
jest.mock('@utils/query');

const dataService = require('@services/dataService');
const { filter, paginate } = require('@utils/query');

const itemsRouter = require('@routes/items');

describe('Items Router', () => {
  let app;
  let mockData;

  beforeEach(() => {
    jest.clearAllMocks();

    mockData = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Cherry' },
    ];

    // Mock Express app
    app = express();
    app.use(express.json());
    app.use('/api/items', itemsRouter);

    // Default mocks
    dataService.data = mockData;
    dataService.findById.mockImplementation(id => mockData.find(i => i.id === id));
    dataService.addItem.mockImplementation(item => ({ id: 4, ...item }));

    filter.mockImplementation((data, q) => {
      if (!q) return data;
      return data.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
    });

    paginate.mockImplementation((data, skip, take) => data.slice(skip, skip + take));
  });

  // ------------------------------
  // GET /api/items
  // ------------------------------
  test('GET /api/items should return filtered and paginated results', async () => {
    const res = await request(app)
      .get('/api/items')
      .query({ q: 'a', skip: 0, take: 2 });

    expect(res.statusCode).toBe(200);
    expect(filter).toHaveBeenCalledWith(mockData, 'a');
    expect(paginate).toHaveBeenCalled();
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ------------------------------
  // GET /api/items/:id
  // ------------------------------
  test('GET /api/items/:id should return the correct item', async () => {
    const res = await request(app).get('/api/items/2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 2, name: 'Banana' });
  });

  test('GET /api/items/:id should return 404 if not found', async () => {
    dataService.findById.mockReturnValue(undefined);

    const res = await request(app).get('/api/items/99');

    expect(res.statusCode).toBe(404);
    expect(res.text).toContain('Item not found');
  });

  // ------------------------------
  // POST /api/items
  // ------------------------------
  test('POST /api/items should add an item and return 201', async () => {
    const newItem = { name: 'Mango' };

    const res = await request(app)
      .post('/api/items')
      .send(newItem)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(dataService.addItem).toHaveBeenCalledWith(newItem);
    expect(res.body).toEqual(newItem);
  });

  test('POST /api/items should handle exceptions', async () => {
    dataService.addItem.mockImplementation(() => { throw new Error('write fail'); });

    const res = await request(app)
      .post('/api/items')
      .send({ name: 'FailItem' });

    expect(res.statusCode).toBe(500);
  });
});
