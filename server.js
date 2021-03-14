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
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { inputItemType } = require("./inputTypes.js");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("mongodb://localhost:27017/development");

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
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
    category: {
      type: categoryType,
      resolve: (item) => {
        return categories.find((category) => category.id === item.categoryId);
      },
    },
    validOptionId: { type: GraphQLNonNull(GraphQLInt) },
    options: {
      type: new GraphQLList(optionType),
      resolve: (item) => {
        let validOptionsIds = item.validOptionId;
        let validOptions = options.filter((option) => {
          return validOptionsIds.indexOf(option.id) !== -1;
        });
        return validOptions;
      },
    },
  }),
});

const optionType = new GraphQLObjectType({
  name: "Option",
  description: "This represents the Options of an Item",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const categoryType = new GraphQLObjectType({
  name: "Category",
  description: "This represents the Category of an Item",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    items: {
      type: GraphQLList(itemType),
      resolve: (category) => {
        return items.filter((item) => item.categoryId === category.id);
      },
    },
  }),
});

const orderType = new GraphQLObjectType({
  name: "Order",
  description: "This represents the Order",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
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
    itemId: { type: GraphQLNonNull(GraphQLInt) },
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
    id: { type: GraphQLNonNull(GraphQLInt) },
    orderItemId: { type: GraphQLNonNull(GraphQLInt) },
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
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => items.find((item) => item.id === args.id),
    },
    items: {
      type: new GraphQLList(itemType),
      description: "List of item",
      resolve: () => items,
    },
    category: {
      type: categoryType,
      description: "A single category",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        categories.find((category) => category.id === args.id),
    },
    categories: {
      type: new GraphQLList(categoryType),
      description: "List of Categories",
      resolve: () => categories,
    },
    orders: {
      type: new GraphQLList(orderType),
      description: "List of Orders",
      resolve: () => orders,
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
        categoryId: { type: GraphQLNonNull(GraphQLInt) },
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
      resolve: (parent, args) => {
        let price = 0;
        args.items.forEach((orderItem) => {
          let item = _.find(items, { id: orderItem.itemId });
          let itemPrice = 0;
          price += item.price * orderItem.quantity;
          itemPrice += item.price * orderItem.quantity;
          orderItem.options.forEach((orderOption) => {
            let option = _.find(options, { id: orderOption.optionId });
            if (option && option.price)
              price += option.price * orderOption.quantity;
            itemPrice += option.price * orderOption.quantity;
          });
          orderItem.splitBill = itemPrice / orderItem.seatId.length;
        });

        let doc = {
          id: uuidv4(),
          orderItems: args.items,
          price,
          tableId: args.tableId,
        };
        orders.push(doc);
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
