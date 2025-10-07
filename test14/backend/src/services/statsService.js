const log = require('../utils/myLog').log;

class StatsService {
    average = 0;
    total = 0;
    count = 0

    constructor() {
    }

    calculate(items) {
        if (items.length === 0) {
            this.average = 0;
            this.total = 0;
            this.count = 0;
            return;
        }

        let sum = 0;
        for (let i = 0; i < items.length; i++) {
            sum += items[i].price || 0;
        }
        this.average = sum / items.length;
        this.count = items.length;
        this.total = sum;
        log(`Stats recalculated: averagePrice=${this.average}, total=${this.total}`);
    }

    addItem(item) {
        this.count++;
        this.total += item.price || 0;
        this.average = this.total / (this.count === 0 ? 1 : this.count);
        log(`Stats updated with new item: averagePrice=${this.average}, total=${this.total}`);
    }

    getStats() {
        return {
            total: this.total,
            averagePrice: this.average,
            count: this.count
        };
    }
}



module.exports = new StatsService();
