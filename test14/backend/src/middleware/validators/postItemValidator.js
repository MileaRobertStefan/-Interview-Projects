function validateItem(item) {
    if (!item || typeof item !== 'object') {
        return { valid: false, error: 'Invalid item format' };
    }

    const { name, category, price } = item;

    if (!name || typeof name !== 'string') {
        return { valid: false, error: 'Invalid item name' };
    }

    if (!category || typeof category !== 'string') {
        return { valid: false, error: 'Invalid item category' };
    }

    if (typeof price !== 'number' || price <= 0) {
        return { valid: false, error: 'Invalid item price' };
    }

    return { valid: true };
}

module.exports = { validateItem };
