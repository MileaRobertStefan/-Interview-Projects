const fs = require('fs');
const path = require('path');
const statsService = require('@services/statsService');
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue(JSON.stringify([])),
    writeFile: jest.fn()
  }
}));
jest.mock('@services/statsService');

jest.isolateModules(() => {
  DataService = require('@services/dataService');
});

describe('DataService', () => {
  let mockData;

  beforeEach(() => {
    jest.clearAllMocks();

    mockData = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
    ];

    fs.promises = {
      readFile: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
      writeFile: jest.fn().mockResolvedValue(),
    };
  });

  test('should read data on startup and call statsService.calculate', async () => {
    const DataService = require('@services/dataService');
    
    await new Promise(setImmediate);

    expect(fs.promises.readFile).toHaveBeenCalledWith(
      expect.stringContaining('items.json'),
      'utf8'
    );
    expect(statsService.calculate).toHaveBeenCalledWith(mockData);
  });

  test('readData() should read and parse JSON', async () => {
    const data = await DataService.readData();
    expect(data).toEqual(mockData);
  });

  test('writeData() should stringify and write data', async () => {
    await DataService.writeData(mockData);
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('items.json'),
      JSON.stringify(mockData, null, 2)
    );
  });

  test('findById() should return correct item', () => {
    DataService.data = mockData;
    const item = DataService.findById(2);
    expect(item).toEqual({ id: 2, name: 'Banana' });
  });

  test('addItem() should add item, assign id, write data, and recalc stats', async () => {
    const item = { name: 'Cherry' };
    const result = DataService.addItem(item);

    expect(result.id).toBeDefined();
    expect(DataService.data).toContainEqual(result);
    expect(fs.promises.writeFile).toHaveBeenCalled();
    expect(statsService.calculate).toHaveBeenCalledWith(DataService.data);
  });

  test('should handle read errors gracefully on startup', async () => {
    fs.promises.readFile.mockRejectedValueOnce(new Error('read fail'));
    console.error = jest.fn();

    jest.isolateModules(() => {
      require('@services/dataService');
    });

    await new Promise(setImmediate);

    expect(console.error).toHaveBeenCalledWith(
      'Failed to read data on startup:',
      expect.any(Error)
    );
  });
});
