const path = require('path');
const fs = require('fs');
const statsService = require('./statsService');
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

class DataService {
  _path = DATA_PATH;
  
  constructor(path = DATA_PATH) {
    this._path = path;

    this.data = [];
    this.readData().then(data => {
      this.data = data;
      statsService.calculate(this.data);
    }).catch(err => {
      console.error('Failed to read data on startup:', err);
    });
  }

  async readData() {
    const raw = await fs.promises.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
}

  async writeData(data) {
    this.data = data;
    await fs.promises.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  }

  findById(id) {
    return this.data.find(item => item.id === id);
  }

  addItem(item) {
    item.id = Date.now();
    this.data.push(item);
    this.writeData(this.data);

    statsService.calculate(this.data);

    return item;
  }

}

module.exports = new DataService();