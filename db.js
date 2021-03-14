const mongoose = require("mongoose");
const Categories = require("./models/categories.mongo");
// const Options = require("./models/options.mongo");
const Item = require("./models/items.mongo");
// const Orders = require("./models/orders.mongo");

const categories = [
  { id: 1, name: "Mains" },
  { id: 2, name: "Appetizers" },
  { id: 3, name: "Drinks" },
  { id: 3, name: "Desert" },
];
exports.categories = categories;

const options = [
  { id: 1, name: "Mozzarella", price: 100 },
  { id: 2, name: "Pepperonni", price: 100 },
  { id: 3, name: "Pineapple", price: 100 },
  { id: 4, name: "Green Peppers", price: 100 },
  { id: 5, name: "Mushrooms", price: 100 },
  { id: 6, name: "Olives", price: 100 },
  { id: 7, name: "Tomatos", price: 100 },
  { id: 8, name: "Lettuce", price: 100 },
  { id: 9, name: "Pickles", price: 100 },
  { id: 10, name: "Onions", price: 000 },
  { id: 11, name: "Ketchup", price: 000 },
  { id: 12, name: "Mustard", price: 000 },
  { id: 13, name: "BBQ", price: 000 },
  { id: 14, name: "Hot", price: 000 },
  { id: 15, name: "Honey Garlic", price: 000 },
];
exports.options = options;

const items = [
  {
    id: 1,
    name: "Burgers",
    price: 1250,
    validOptionId: [7, 8, 9, 10, 11, 12],
    categoryId: 1,
  },
  {
    id: 2,
    name: "Pizza",
    price: 2200,
    validOptionId: [7, 8, 9, 10, 11, 12],
    categoryId: 1,
  },
  {
    id: 3,
    name: "Tacos",
    price: 1500,
    validOptionId: [1, 2, 3],
    categoryId: 1,
  },
  {
    id: 4,
    name: "Garden Salad",
    price: 975,
    validOptionId: [1, 2, 3],
    categoryId: 2,
  },
  { id: 5, name: "Fries", price: 550, validOptionId: [1, 2, 3], categoryId: 2 },
  {
    id: 6,
    name: "Wings",
    price: 1200,
    validOptionId: [1, 2, 3],
    categoryId: 2,
  },
  {
    id: 7,
    name: "Tap water",
    price: 000,
    validOptionId: [1, 2, 3],
    categoryId: 3,
  },
  { id: 8, name: "Beer", price: 450, validOptionId: [1, 2, 3], categoryId: 3 },
];

exports.items = items;

exports.orders = [];

// filling categories
// const _categories = categories.map((cat) => ({ name: cat.name }));
// Categories.insertMany(_categories);

// filling items
(async () => {
  let cats = await Categories.find({});
  const _items = items.map((item) => {
    item = { ...item };
    item.categoryId = cats[item.categoryId - 1]
      ? cats[item.categoryId - 1].id
      : null;
    delete item.id;
    return item;
  });
  Item.insertMany(_items);
})();
