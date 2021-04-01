const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
} = require("graphql");

const inputOptionType = new GraphQLInputObjectType({
  name: "inputOptionsType",
  description: "This represents the Options in a placed order",
  fields: {
    optionId: { type: GraphQLString },
  },
});

const inputItemType = new GraphQLInputObjectType({
  name: "InputItemType",
  description: "Options in order",
  fields: {
    itemId: { type: GraphQLString },
    options: { type: new GraphQLList(inputOptionType) },
    seatId: { type: new GraphQLList(GraphQLInt) },
  },
  resolve: () => {},
});

module.exports = {
  inputItemType: inputItemType,
};
