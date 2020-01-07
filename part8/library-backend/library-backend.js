require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

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
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
      addBook: async (root, args, {currentUser}) => {

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

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
      editAuthor: async (root, args, {currentUser}) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

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
      },
      createUser: async (root, args) => {
        const user = new User({...args});
        try {
          return user.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username});

        // hardcoded password required by exercises for simplicity
        if(!user || args.password !== "secret") {
          throw new UserInputError("login failed")
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}

      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})