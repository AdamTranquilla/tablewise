const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();

const categories = [
  { id: 1, name: "Mains" },
  { id: 2, name: "Appetizers" },
  { id: 3, name: "Drinks" },
];

const items = [
  { id: 1, name: "Beesechurger", price: 1250, categoryId: 1 },
  { id: 2, name: "Pizza", price: 2200, categoryId: 1 },
  { id: 3, name: "Tacos", price: 1500, categoryId: 1 },
  { id: 4, name: "Garden Salad", price: 975, categoryId: 2 },
  { id: 5, name: "Fries", price: 550, categoryId: 2 },
  { id: 6, name: "Wings", price: 1200, categoryId: 2 },
  { id: 7, name: "Tap water", price: 000, categoryId: 3 },
  { id: 8, name: "Beer", price: 450, categoryId: 3 },
];

const itemType = new GraphQLObjectType({
  name: "Item",
  description: "This represents an Item of a Category",
  //field uses a function because items and categories need to be defined to ref ea/other
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
app.listen(5000, () => console.log("Server running on PORT 5000"));
