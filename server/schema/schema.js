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
    id: "1",
    name: "Book 1",
    genre: "Fantasy",
    authorId: "1",
  },
  {
    id: "2",
    name: "Book 2",
    genre: "Fantasy",
    authorId: "2",
  },
  {
    id: "3",
    name: "Book 3",
    genre: "Fantasy",
    authorId: "3",
  },
  {
    id: "4",
    name: "Book 4",
    genre: "Fantasy",
    authorId: "1",
  },
  {
    id: "5",
    name: "Book 5",
    genre: "Fantasy",
    authorId: "2",
  },
  {
    id: "6",
    name: "Book 6",
    genre: "Fantasy",
    authorId: "3",
  },
];

let authors = [
  {
    id: "1",
    name: "Author 1",
    age: 30,
    books: ["1", "2"],
  },
  {
    id: "2",
    name: "Author 2",
    age: 40,
    books: ["2", "3"],
  },
  {
    id: "3",
    name: "Author 3",
    age: 50,
    books: ["1", "3"],
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.id });
      },
    },
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
        return _.filter(books, { authorId: parent.id });
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
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: mutation,
  // subscription: subscription,
});
