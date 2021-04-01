const mongoose = require("mongoose");
const Categories = require("./models/categories.mongo");
const Sections = require("./models/sections.mongo");
const Options = require("./models/options.mongo");
const Item = require("./models/items.mongo");
const Orders = require("./models/orders.mongo");

const sections = [
  { id: 1, name: "Starters" },
  { id: 2, name: "Mains" },
  { id: 3, name: "Dessert" },
  { id: 3, name: "Drinks" },
];
exports.sections = sections;

const categories = [
  { id: 1, name: "Salads", sectionId: 1 },
  { id: 2, name: "Fries", sectionId: 1 },
  { id: 3, name: "Soups", sectionId: 1 },
  { id: 4, name: "Sandwiches", sectionId: 2 },
  { id: 5, name: "Pizzas", sectionId: 2 },
  { id: 6, name: "Tacos", sectionId: 2 },
  { id: 7, name: "Cake", sectionId: 3 },
  { id: 8, name: "Pie", sectionId: 3 },
  { id: 9, name: "Soda", sectionId: 4 },
  { id: 10, name: "Cafe", sectionId: 4 },
  { id: 11, name: "Alchohol", sectionId: 4 },
];
exports.categories = categories;

const items = [
  {
    id: 4,
    name: "Garden Salad",
    price: 775,
    presetOptionId: [20],
    validOptionId: [20, 21, 22],
    categoryId: 1,
  },
  {
    id: 4,
    name: "Ceaser Salad",
    price: 975,
    presetOptionId: [],
    validOptionId: [38, 39],
    categoryId: 1,
  },
  {
    id: 4,
    name: "Quinoa Salad",
    price: 825,
    presetOptionId: [],
    validOptionId: [38],
    categoryId: 1,
  },
  {
    id: 5,
    name: "French Fries",
    price: 550,
    presetOptionId: [11],
    validOptionId: [11, 19],
    categoryId: 2,
  },
  {
    id: 5,
    name: "Sweat Potato Fries",
    price: 550,
    presetOptionId: [19],
    validOptionId: [11, 19],
    categoryId: 2,
  },
  {
    id: 14,
    name: "Calamari",
    price: 550,
    presetOptionId: [19],
    validOptionId: [11, 19],
    categoryId: 2,
  },
  {
    id: 15,
    name: "Chicken Noodle",
    price: 1200,
    presetOptionId: [15],
    validOptionId: [15],
    categoryId: 3,
  },
  {
    id: 6,
    name: "Chili",
    price: 1200,
    presetOptionId: [15],
    validOptionId: [13, 14, 15],
    categoryId: 3,
  },
  {
    id: 1,
    name: "Classic Burger",
    price: 1250,
    presetOptionId: [7, 8, 9, 10, 11, 12],
    validOptionId: [7, 8, 9, 10, 11, 12],
    categoryId: 4,
  },
  {
    id: 2,
    name: "Deluxe Pizza",
    price: 2200,
    presetOptionId: [1, 2, 4, 5, 6],
    validOptionId: [1, 2, 3, 4, 5, 6],
    categoryId: 5,
  },
  {
    id: 3,
    name: "Fish Tacos",
    price: 1500,
    presetOptionId: [23],
    validOptionId: [23, 24, 25],
    categoryId: 6,
  },
  {
    id: 7,
    name: "Coffee",
    price: 100,
    presetOptionId: [],
    validOptionId: [16, 17, 18],
    categoryId: 10,
  },
  {
    id: 7,
    name: "Espresso",
    price: 100,
    presetOptionId: [],
    validOptionId: [16, 17, 18],
    categoryId: 10,
  },
  {
    id: 7,
    name: "Cappuccino",
    price: 100,
    presetOptionId: [],
    validOptionId: [16, 17, 18],
    categoryId: 10,
  },
  {
    id: 8,
    name: "Tea",
    price: 100,
    presetOptionId: [26, 27, 28],
    validOptionId: [26],
    categoryId: 10,
  },
  {
    id: 9,
    name: "Beer",
    price: 450,
    presetOptionId: [29],
    validOptionId: [29, 30, 31],
    categoryId: 11,
  },
  {
    id: 14,
    name: "White wine",
    price: 000,
    presetOptionId: [32],
    validOptionId: [32, 33, 34],
    categoryId: 11,
  },
  {
    id: 15,
    name: "Red wine",
    price: 000,
    presetOptionId: [35],
    validOptionId: [35, 36, 37],
    categoryId: 11,
  },
  {
    id: 10,
    name: "Coke",
    price: 000,
    presetOptionId: [32],
    validOptionId: [32],
    categoryId: 9,
  },
  {
    id: 10,
    name: "Sprite",
    price: 000,
    presetOptionId: [32],
    validOptionId: [32],
    categoryId: 9,
  },
  {
    id: 10,
    name: "Fanta",
    price: 000,
    presetOptionId: [32],
    validOptionId: [32],
    categoryId: 9,
  },
  {
    id: 11,
    name: "Applie Pie",
    price: 300,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 7,
  },
  {
    id: 12,
    name: "Pumpkin Pie",
    price: 300,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 7,
  },
  {
    id: 14,
    name: "Chocolate cake",
    price: 250,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 8,
  },
  {
    id: 13,
    name: "Carrot cake",
    price: 250,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 8,
  },
];
exports.items = items;

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
  { id: 13, name: "Cheddar", price: 000 },
  { id: 14, name: "Sour cream", price: 000 },
  { id: 15, name: "Roll", price: 100 },
  { id: 16, name: "Cream", price: 0 },
  { id: 17, name: "Sugar", price: 0 },
  { id: 18, name: "Almond milk", price: 50 },
  { id: 19, name: "Aioli", price: 000 },
  { id: 20, name: "Balsamic Vinaigrette ", price: 000 },
  { id: 21, name: "Italian", price: 000 },
  { id: 22, name: "Sesame", price: 000 },
  { id: 23, name: "Cod", price: 000 },
  { id: 24, name: "Halibut", price: 200 },
  { id: 25, name: "Shrimp", price: 300 },
  { id: 26, name: "Jasmine", price: 0 },
  { id: 27, name: "Earl Grey.", price: 0 },
  { id: 28, name: "Chamomile", price: 0 },
  { id: 29, name: "Lager", price: 0 },
  { id: 30, name: "IPA", price: 0 },
  { id: 31, name: "Stout", price: 0 },
  { id: 32, name: "Chardonnay", price: 0 },
  { id: 33, name: "Sauvignon Blanc", price: 0 },
  { id: 34, name: "Riesling", price: 0 },
  { id: 35, name: "Cabernet Sauvignon", price: 0 },
  { id: 36, name: "Merlot", price: 0 },
  { id: 37, name: "Shiraz", price: 0 },
  { id: 38, name: "Chicken", price: 300 },
  { id: 39, name: "Bacon", price: 300 },
];
exports.options = options;

exports.orders = [];

//// filling sections
// const _sections = sections.map((section) => ({ name: section.name }));
// Sections.insertMany(_sections);

//// filling categories ****** needs to also have sectionId
// (async () => {
//   let sections = await Sections.find({});
//   const _categories = categories.map((cat) => {
//     return {
//       name: cat.name,
//       sectionId: sections[cat.sectionId - 1]._id,
//     };
//   });
//   Categories.insertMany(_categories);
// })();

//// filling options
// const _options = options.map((opt) => ({ name: opt.name, price: opt.price }));
// Options.insertMany(_options);

//// filling items
// (async () => {
//   let cats = await Categories.find({});
//   let options = await Options.find({});
//   const _items = items.map((item) => {
//     item = { ...item };
//     console.log(cats[item.categoryId - 1]);
//     item.categoryId = cats[item.categoryId - 1]
//       ? cats[item.categoryId - 1]._id
//       : null;
//     delete item.id;
//     item.presetOptionId.forEach((validOption, index) => {
//       validOption -= 1;
//       item.presetOptionId[index] = options[validOption]._id;
//     });
//     item.validOptionId.forEach((validOption, index) => {
//       validOption -= 1;
//       item.validOptionId[index] = options[validOption]._id;
//     });
//     return item;
//   });
//   Item.insertMany(_items);
// })();
