
const API_BASE_URL = 'http://localhost:3001/api';

// Default headers for all requests
const defaultHeaders = {
    'Content-Type': 'application/json',
};



// HTTP service methods
class ItemsHttpService {
    async handleResponse(response) {
        if (!response.ok) {
            const error = new Error('HTTP error ' + response.status);
            throw error;
        }
        return response.json();
    }

    async getItems(params = {skip: 0, take: 10}, signal) {
        const url = new URL(`${API_BASE_URL}/items`);
        this._appendSearchParams(url, params);
        const response = await fetch(url, {signal});
        return this.handleResponse(response);
    }

    async getItemById(id, signal) {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, { signal });
        return this.handleResponse(response);
    }

    async getItemStats(signal) {
        const response = await fetch(`${API_BASE_URL}/stats`, {signal});
        return this.handleResponse(response);
    }

    _appendSearchParams(url, params) {
        if (!params) return;

        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                url.searchParams.append(key, params[key]);
            }
        });
    }
}

export default new ItemsHttpService();