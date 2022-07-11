const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = graphql;

const _ = require("lodash");

let books = [
  {
    id: 1,
    name: "Book 1",
    genre: "Fantasy",
  },
  {
    id: 2,
    name: "Book 2",
    genre: "Fantasy",
  },
  {
    id: 3,
    name: "Book 3",
    genre: "Fantasy",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
        //return Book.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: mutation,
  // subscription: subscription,
});
