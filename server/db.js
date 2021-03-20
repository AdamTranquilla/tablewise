const mongoose = require("mongoose");
const Categories = require("./models/categories.mongo");
const Sections = require("./models/sections.mongo");
const Options = require("./models/options.mongo");
const Item = require("./models/items.mongo");
const Orders = require("./models/orders.mongo");

const sections = [
  { id: 1, name: "Appetizers" },
  { id: 2, name: "Mains" },
  { id: 3, name: "Drinks" },
  { id: 3, name: "Desert" },
];
exports.sections = sections;

const categories = [
  { id: 1, name: "Burgers", sectionId: 1 },
  { id: 2, name: "Pizzas", sectionId: 1 },
  { id: 3, name: "Tacos", sectionId: 1 },
  { id: 4, name: "Salads", sectionId: 2 },
  { id: 5, name: "Wings", sectionId: 2 },
  { id: 6, name: "Fries", sectionId: 2 },
  { id: 7, name: "Cake", sectionId: 3 },
  { id: 8, name: "Icecream", sectionId: 3 },
  { id: 9, name: "Soda", sectionId: 4 },
  { id: 10, name: "Cafe", sectionId: 4 },
  { id: 11, name: "Alchohol", sectionId: 4 },
];
exports.categories = categories;

const items = [
  {
    id: 1,
    name: "Cheese burger",
    price: 1250,
    validOptionId: [7, 8, 9, 10, 11, 12],
    categoryId: 1,
  },
  {
    id: 2,
    name: "Deluxe Pizza",
    price: 2200,
    validOptionId: [7, 8, 9, 10, 11, 12],
    categoryId: 2,
  },
  {
    id: 3,
    name: "Fish Tacos",
    price: 1500,
    validOptionId: [1, 2, 3],
    categoryId: 3,
  },
  {
    id: 4,
    name: "Garden Salad",
    price: 975,
    validOptionId: [1, 2, 3],
    categoryId: 4,
  },
  { id: 5, name: "Fries", price: 550, validOptionId: [1, 2, 3], categoryId: 6 },
  {
    id: 6,
    name: "Hot Wings",
    price: 1200,
    validOptionId: [1, 2, 3],
    categoryId: 5,
  },
  {
    id: 7,
    name: "Coke",
    price: 000,
    validOptionId: [1, 2, 3],
    categoryId: 9,
  },
  {
    id: 7,
    name: "Coffee",
    price: 100,
    validOptionId: [1, 2, 3],
    categoryId: 10,
  },
  { id: 8, name: "Beer", price: 450, validOptionId: [1, 2, 3], categoryId: 11 },
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
  { id: 13, name: "BBQ", price: 000 },
  { id: 14, name: "Hot", price: 000 },
  { id: 15, name: "Honey Garlic", price: 000 },
  { id: 16, name: "Cream", price: 50 },
  { id: 17, name: "Sugar", price: 50 },
  { id: 18, name: "Almond milk", price: 50 },
];
exports.options = options;

exports.orders = [];

// Redo Every able
//filling sections
//const _sections = sections.map((section) => ({ name: section.name }));
//Sections.insertMany(_sections);

// filling categories ****** needs to also have sectionId
//(async () => {
//  let sections = await Sections.find({});
//  const _categories = categories.map((cat) => {
//    return {
//      name: cat.name,
//      sectionId: sections[cat.sectionId - 1]._id,
//    };
//  });
//  Categories.insertMany(_categories);
//})();

// filling items
//(async () => {
//  let cats = await Categories.find({});
//  let options = await Options.find({});
//  const _items = items.map((item) => {
//    item = { ...item };
//    console.log(cats[item.categoryId - 1]);
//    item.categoryId = cats[item.categoryId - 1]
//      ? cats[item.categoryId - 1]._id
//      : null;
//    delete item.id;
//    item.validOptionId.forEach((validOption, index) => {
//      validOption -= 1;
//      item.validOptionId[index] = options[validOption]._id;
//    });
//    return item;
//  });
//  Item.insertMany(_items);
//})();

// filling options
// const _options = options.map((opt) => ({ name: opt.name, price: opt.price }));
// Options.insertMany(_options);
