const mongoose = require("mongoose");
const Categories = require("./models/categories.mongo");
const Sections = require("./models/sections.mongo");
const Options = require("./models/options.mongo");
const Item = require("./models/items.mongo");
const Orders = require("./models/orders.mongo");
const Cart = require("./models/cart.mongo");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/development",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");
});

const sections = [
  { id: 1, name: "Starters" },
  { id: 2, name: "Mains" },
  { id: 3, name: "Dessert" },
  { id: 3, name: "Drinks" },
];

const categories = [
  { id: 1, name: "Salads", img: "saladclr.svg", sectionId: 1 },
  { id: 2, name: "Fries", img: "friesclr.svg", sectionId: 1 },
  { id: 3, name: "Soups", img: "soupclr.svg", sectionId: 1 },
  { id: 4, name: "Sandwiches", img: "sandwichclr.svg", sectionId: 2 },
  { id: 5, name: "Pizzas", img: "pizzaclr.svg", sectionId: 2 },
  { id: 6, name: "Tacos", img: "tacoclr.svg", sectionId: 2 },
  { id: 7, name: "Cake", img: "cakeclr.svg", sectionId: 3 },
  { id: 8, name: "Pie", img: "pieclr.svg", sectionId: 3 },
  { id: 9, name: "Soda", img: "sodaclr.svg", sectionId: 4 },
  { id: 10, name: "Cafe", img: "cafeclr.svg", sectionId: 4 },
  { id: 11, name: "Alchohol", img: "beerclr.svg", sectionId: 4 },
];
exports.categories = categories;

const items = [
  {
    id: 1,
    name: "Garden Salad",
    price: 7.75,
    presetOptionId: [20],
    validOptionId: [20, 21, 22],
    categoryId: 1,
  },
  {
    id: 2,
    name: "Caesar Salad",
    price: 9.75,
    presetOptionId: [],
    validOptionId: [38, 39],
    categoryId: 1,
  },
  {
    id: 3,
    name: "Quinoa Salad",
    price: 8.25,
    presetOptionId: [],
    validOptionId: [38],
    categoryId: 1,
  },
  {
    id: 4,
    name: "French Fries",
    price: 5.5,
    presetOptionId: [11],
    validOptionId: [11, 19],
    categoryId: 2,
  },
  {
    id: 5,
    name: "Sweat Potato Fries",
    price: 5.5,
    presetOptionId: [19],
    validOptionId: [11, 19],
    categoryId: 2,
  },
  {
    id: 6,
    name: "Calamari",
    price: 5.5,
    presetOptionId: [19],
    validOptionId: [11, 19],
    categoryId: 2,
  },
  {
    id: 7,
    name: "Chicken Noodle",
    price: 12.0,
    presetOptionId: [15],
    validOptionId: [15],
    categoryId: 3,
  },
  {
    id: 8,
    name: "Chili",
    price: 12.0,
    presetOptionId: [15],
    validOptionId: [13, 14, 15],
    categoryId: 3,
  },
  {
    id: 9,
    name: "Classic BLT",
    price: 12.5,
    presetOptionId: [39, 8, 7, 19],
    validOptionId: [39, 8, 7, 19, 38, 13],
    categoryId: 4,
  },
  {
    id: 10,
    name: "Classic Burger",
    price: 12.5,
    presetOptionId: [7, 8, 9, 10, 11, 12],
    validOptionId: [7, 8, 9, 10, 11, 12],
    categoryId: 4,
  },
  {
    id: 11,
    name: "Margherita Pizza",
    price: 22.0,
    presetOptionId: [1, 7],
    validOptionId: [1, 2, 3, 4, 5, 6, 7],
    categoryId: 5,
  },
  {
    id: 12,
    name: "Pepperoni Pizza",
    price: 22.0,
    presetOptionId: [1, 2, 7],
    validOptionId: [1, 2, 3, 4, 5, 6],
    categoryId: 5,
  },
  {
    id: 13,
    name: "Deluxe Pizza",
    price: 22.0,
    presetOptionId: [1, 2, 4, 5, 6],
    validOptionId: [1, 2, 3, 4, 5, 6],
    categoryId: 5,
  },
  {
    id: 3,
    name: "Surf Tacos",
    price: 15.0,
    presetOptionId: [23],
    validOptionId: [23, 24, 25],
    categoryId: 6,
  },
  {
    id: 14,
    name: "Turf Tacos",
    price: 15.0,
    presetOptionId: [38],
    validOptionId: [38, 40, 41],
    categoryId: 6,
  },
  {
    id: 15,
    name: "Chocolate cake",
    price: 5.0,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 7,
  },
  {
    id: 16,
    name: "Carrot cake",
    price: 4.5,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 7,
  },
  {
    id: 17,
    name: "Applie Pie",
    price: 4.5,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 8,
  },
  {
    id: 18,
    name: "Pumpkin Pie",
    price: 3.0,
    presetOptionId: [],
    validOptionId: [],
    categoryId: 8,
  },
  {
    id: 19,
    name: "Coffee",
    price: 2.5,
    presetOptionId: [],
    validOptionId: [16, 17, 18],
    categoryId: 10,
  },
  {
    id: 20,
    name: "Espresso",
    price: 3.0,
    presetOptionId: [],
    validOptionId: [16, 17, 18],
    categoryId: 10,
  },
  {
    id: 21,
    name: "Cappuccino",
    price: 3.0,
    presetOptionId: [],
    validOptionId: [16, 17, 18],
    categoryId: 10,
  },
  {
    id: 22,
    name: "Tea",
    price: 2.0,
    presetOptionId: [26],
    validOptionId: [26, 27, 28],
    categoryId: 10,
  },
  {
    id: 23,
    name: "Beer",
    price: 6.5,
    presetOptionId: [29],
    validOptionId: [29, 30, 31],
    categoryId: 11,
  },
  {
    id: 24,
    name: "White wine",
    price: 7.5,
    presetOptionId: [32],
    validOptionId: [32, 33, 34],
    categoryId: 11,
  },
  {
    id: 25,
    name: "Red wine",
    price: 7.5,
    presetOptionId: [35],
    validOptionId: [35, 36, 37],
    categoryId: 11,
  },
  {
    id: 26,
    name: "Coke",
    price: 2.0,
    presetOptionId: [42],
    validOptionId: [42],
    categoryId: 9,
  },
  {
    id: 27,
    name: "Sprite",
    price: 2.0,
    presetOptionId: [42],
    validOptionId: [42],
    categoryId: 9,
  },
  {
    id: 28,
    name: "Fanta",
    price: 2.0,
    presetOptionId: [42],
    validOptionId: [42],
    categoryId: 9,
  },
];

const options = [
  { id: 1, name: "Mozzarella", price: 1 },
  { id: 2, name: "Pepperoni", price: 1 },
  { id: 3, name: "Pineapple", price: 1 },
  { id: 4, name: "Green Peppers", price: 1 },
  { id: 5, name: "Mushrooms", price: 1 },
  { id: 6, name: "Olives", price: 1 },
  { id: 7, name: "Tomatos", price: 1 },
  { id: 8, name: "Lettuce", price: 1 },
  { id: 9, name: "Pickles", price: 1 },
  { id: 10, name: "Onions", price: 0 },
  { id: 11, name: "Ketchup", price: 0 },
  { id: 12, name: "Mustard", price: 0 },
  { id: 13, name: "Cheddar", price: 0 },
  { id: 14, name: "Sour cream", price: 0 },
  { id: 15, name: "Roll", price: 1 },
  { id: 16, name: "Cream", price: 0 },
  { id: 17, name: "Sugar", price: 0 },
  { id: 18, name: "Almond milk", price: 0.5 },
  { id: 19, name: "Aioli", price: 0 },
  { id: 20, name: "Balsamic Vinaigrette ", price: 0 },
  { id: 21, name: "Italian", price: 0 },
  { id: 22, name: "Sesame", price: 0 },
  { id: 23, name: "Cod", price: 0 },
  { id: 24, name: "Halibut", price: 2 },
  { id: 25, name: "Shrimp", price: 3 },
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
  { id: 38, name: "Chicken", price: 3 },
  { id: 39, name: "Bacon", price: 3 },
  { id: 40, name: "Beef", price: 3 },
  { id: 41, name: "Pulled Pork", price: 4.5 },
  { id: 42, name: "Ice", price: 3 },
];

/**
 * This function will fill sections
 */

const fillSections = async () => {
  const _sections = sections.map((section) => ({ name: section.name }));
  await Sections.insertMany(_sections);
};

/**
 * This function will fill categories
 */
const fillCategories = async () => {
  let sections = await Sections.find({});
  const _categories = categories.map((cat) => {
    return {
      name: cat.name,
      img: cat.img,
      sectionId: sections[cat.sectionId - 1]._id,
    };
  });
  Categories.insertMany(_categories);
};

/**
 * This function will fill options
 */
const fillOptions = async () => {
  const _options = options.map((opt) => ({ name: opt.name, price: opt.price }));
  await Options.insertMany(_options);
};
/**
 * This function will fill items
 */
const fillItems = async () => {
  let cats = await Categories.find({});
  let options = await Options.find({});
  const _items = items.map((item) => {
    item = { ...item };
    console.log(cats[item.categoryId - 1]);
    item.categoryId = cats[item.categoryId - 1]
      ? cats[item.categoryId - 1]._id
      : null;
    delete item.id;
    item.presetOptionId.forEach((validOption, index) => {
      validOption -= 1;
      item.presetOptionId[index] = options[validOption]._id;
    });
    item.validOptionId.forEach((validOption, index) => {
      validOption -= 1;
      item.validOptionId[index] = options[validOption]._id;
    });
    return item;
  });
  Item.insertMany(_items);
};

const fill = async () => {
  try {
    await fillSections();
    await fillCategories();
    await fillOptions();
    await fillItems();
    console.log("FILLED DATABASE");
  } catch (err) {
    throw err;
  }
};

const reset = async () => {
  await Categories.deleteMany({});
  await Sections.deleteMany({});
  await Options.deleteMany({});
  await Item.deleteMany({});
  await Orders.deleteMany({});
  await Cart.deleteMany({});
  console.log("Database Reset");
};

exports.sections = sections;
exports.items = items;
exports.options = options;
exports.orders = [];
