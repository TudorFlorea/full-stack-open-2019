require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose');

const Book = require('./models/Book');
const Author = require('./models/Author')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
}

type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]!
}

type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {

      try {
        if(args.author && args.genre) {
            // TODO - support author
            return Book.find({
              genres: {$all: [args.genre]}
            }).populate('author')
        } else {
            if(args.author) {
                // TODO - support author
                return Book.find({}).populate('author');
            }
            if(args.genre) {
                return Book.find({
                  genres: {$all: [args.genre]}
                }).populate('author')
            }
        }
        return Book.find({}).populate('author');
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }


    },
    allAuthors: () => Author.find({})
  },
  Mutation: {
      addBook: async (root, args) => {
        const book = new Book({...args});
        
        try {
          const savedBook = await book.save();
          return Book.populate(savedBook, {path:"author"});
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      },
      editAuthor: async (root, args) => {
        try {
          return Author.findOneAndUpdate({
            name: args.name
          }, {
            born: args.setBornTo
          }, {
            new: true
          });
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})