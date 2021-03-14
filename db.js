exports.categories = [
  { id: 1, name: "Mains" },
  { id: 2, name: "Appetizers" },
  { id: 3, name: "Drinks" },
  { id: 3, name: "Desert" },
];

exports.options = [
  { id: 1, name: "Mozzarella", price: 100 },
  { id: 2, name: "Pepperonni", price: 100 },
  { id: 3, name: "Pineapple", price: 100 },
  { id: 4, name: "Green Peppers", price: 100 },
  { id: 5, name: "Mushrooms", price: 100 },
  { id: 6, name: "Olives", price: 100 },
  { id: 7, name: "Tomatos", price: 100 },
  { id: 8, name: "Lettuce", price: 100 },
  { id: 9, name: "Pickles", price: 100 },
  { id: 10, name: "Onions", price: 100 },
  { id: 11, name: "Ketchup", price: 100 },
  { id: 12, name: "Mustard", price: 100 },
  { id: 13, name: "BBQ", price: 100 },
  { id: 14, name: "Hot", price: 100 },
  { id: 15, name: "Honey Garlic", price: 100 },
];

exports.items = [
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

exports.orders = [];
