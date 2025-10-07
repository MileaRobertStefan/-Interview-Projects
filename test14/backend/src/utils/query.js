const { search } = require("../routes/items");

function filter(data, q) {
  if (!q) return data;

  const searchWord = q.toLowerCase();

  return data.filter(
    item => item.name.toLowerCase().includes(searchWord) ||
            item.category.toLowerCase().includes(searchWord) ||
            item.price.toString().includes(searchWord)
        );
}

function paginate(data, skip, take) {
  return data.slice(skip, skip + take);
}

module.exports = {
  filter,
  paginate
};
