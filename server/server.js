const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const app = express();
const cors = require("cors");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { inputItemType } = require("./inputTypes.js");
const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("./models/categories.mongo");
const Option = require("./models/options.mongo");
const Item = require("./models/items.mongo");
const Order = require("./models/orders.mongo");
const Section = require("./models/sections.mongo");
const { getAll, get, create, getById } = require("./transactions");

app.use(cors());

mongoose.connect("mongodb://localhost:27017/development", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");
});

const { items, categories, options, orders } = require("./db");

const itemType = new GraphQLObjectType({
  name: "Item",
  description: "This represents an Item of a Category",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    categoryId: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLInt },
    category: {
      type: categoryType,
      resolve: async (item) => {
        let category = await getById(Category, item.categoryId);
        return category;
      },
    },
    validOptionId: { type: GraphQLNonNull(GraphQLString) },
    options: {
      type: new GraphQLList(optionType),
      resolve: async (item) => {
        let validOptionsIds = item.validOptionId;
        let _options = await get(Option, {
          _id: { $in: validOptionsIds },
        });
        return _options;
      },
    },
  }),
});

const optionType = new GraphQLObjectType({
  name: "Option",
  description: "This represents the Options of an Item",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const categoryType = new GraphQLObjectType({
  name: "Category",
  description: "This represents the Category of an Item",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    section: {
      type: GraphQLNonNull(sectionType),
      resolve: async (parent, args) => {
        let sections = await getAll(Section);
        return sections;
      },
    },
    items: {
      type: GraphQLList(itemType),
      resolve: async (category) => {
        let items = await get(Item, { categoryId: category._id });
        return items;
      },
    },
  }),
});

const sectionType = new GraphQLObjectType({
  name: "Section",
  description: "This represents the section of an Item",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    categories: {
      type: GraphQLList(categoryType),
      resolve: async (section) => {
        let categories = await get(Category, { sectionId: section._id });
        return categories;
      },
    },
  }),
});

const orderType = new GraphQLObjectType({
  name: "Order",
  description: "This represents the Order",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    tableId: {
      type: new GraphQLList(GraphQLInt),
    },
    price: { type: GraphQLNonNull(GraphQLInt) },
    orderItems: {
      type: new GraphQLList(orderItemType),
    },
  }),
});

const orderItemType = new GraphQLObjectType({
  name: "OrderItem",
  description: "This represents the Order",
  fields: () => ({
    itemId: { type: GraphQLNonNull(GraphQLString) },
    quantity: {
      type: GraphQLNonNull(GraphQLInt),
    },
    seatId: { type: new GraphQLList(GraphQLNonNull(GraphQLInt)) },
    splitBill: { type: GraphQLFloat },
    options: {
      type: new GraphQLList(optionType),
      resolve: (parent, args) => {
        const itemOptions = parent.options;
        const optionIds = itemOptions.map((option) => option.optionId);
        const optionDetails = options.filter((option) => {
          return optionIds.indexOf(option.id) !== -1;
        });
        return optionDetails;
      },
    },
  }),
});

const orderOptionType = new GraphQLObjectType({
  name: "OrderOption",
  description: "Options in order",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    quantity: {
      type: GraphQLNonNull(GraphQLInt),
    },
    resolve: (option) => {
      return { id: 1, orderItemId: 1, quantity: 1 };
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    item: {
      type: itemType,
      description: "A single item",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let item = await get(Item, args.id);
        return item;
      },
    },
    items: {
      type: new GraphQLList(itemType),
      description: "List of item",
      resolve: async (parent, args) => {
        let items = await getAll(Item);
        return items;
      },
    },
    section: {
      type: sectionType,
      description: "A single section",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let section = await getById(Section, args.id);
        return section;
      },
    },
    sections: {
      type: new GraphQLList(sectionType),
      description: "List of Sections",
      resolve: async () => {
        let sections = await getAll(Section);
        return sections;
      },
    },
    category: {
      type: categoryType,
      description: "A single category",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let category = await getById(Category, args.id);
        return category;
      },
    },
    categories: {
      type: new GraphQLList(categoryType),
      description: "List of Categories",
      resolve: async () => {
        let categories = await getAll(Category);
        return categories;
      },
    },
    orders: {
      type: new GraphQLList(orderType),
      description: "List of Orders",
      resolve: async () => {
        let order = await getAll(Order);
        return orders;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addItem: {
      type: itemType,
      description: "Add a Item",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        categoryId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const item = {
          id: items.length + 1,
          name: args.name,
          categoryId: args.categoryId,
        };
        items.push(item);
        return item;
      },
    },
    addCategory: {
      type: categoryType,
      description: "Add a Category",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const category = {
          id: categories.length + 1,
          name: args.name,
        };
        categories.push(category);
        return category;
      },
    },
    placeOrder: {
      type: orderType,
      description: "Place Order",
      args: {
        items: {
          type: new GraphQLList(inputItemType),
        },
        tableId: {
          type: GraphQLInt,
        },
      },
      resolve: async (parent, args) => {
        let price = 0;
        let _items = await args.items.map(async (orderItem) => {
          let item = await getById(Item, orderItem.itemId);
          let itemPrice = 0;
          price += item.price * orderItem.quantity;
          itemPrice += item.price * orderItem.quantity;
          await orderItem.options.map(async (orderOption) => {
            let option = await getById(Option, orderOption.optionId);
            if (option && option.price)
              price += option.price * orderOption.quantity;
            itemPrice += option.price * orderOption.quantity;
          });
          orderItem.splitBill = itemPrice / orderItem.seatId.length;
          return orderItem;
        });

        let doc;

        await Promise.all(_items).then(async (d) => {
          doc = {
            orderItems: d[0],
            price,
            tableId: args.tableId,
          };
          doc = await create(Order, doc);
        });

        return doc;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(8001, () => console.log("Server running on PORT 8001"));
