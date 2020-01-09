require('dotenv').config()
const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');

const pubsub = new PubSub()

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

type Subscription {
  bookAdded: Book!
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
    allAuthors: () => {
      try {
        return  Author.find({});
      } catch(err) {

      }
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Mutation: {
      addBook: async (root, args, {currentUser}) => {

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const isAuthor = await Author.findOne({ name: args.author })

        if(!isAuthor) {
          const author = new Author({ "name": args.author })
          try {
            const newAuthor = await author.save()
            const book = new Book({...args, author: author._id});
            const savedBook = await book.save();
            const authorWithBook = new Author({...newAuthor, books: [savedBook._id]})
            await authorWithBook.save();
            const bookWithAuthor = await Book.populate(savedBook, {path:"author"});

            pubsub.publish('BOOK_ADDED', {bookAdded: bookWithAuthor})
            
            return bookWithAuthor;
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
          })
          }
        } else {
          try {
            const existingAuthor = isAuthor.toJSON();
            const book = new Book({...args, author: existingAuthor.id});
            const savedBook = await book.save();
            await Author.findByIdAndUpdate(existingAuthor.id, {...existingAuthor, books: Array.isArray(existingAuthor.books) ? [...existingAuthor.books, savedBook._id] : [savedBook._id]})
            const bookWithAuthor = await Book.populate(savedBook, {path:"author"});
            
            pubsub.publish('BOOK_ADDED', {bookAdded: bookWithAuthor})
            
            return bookWithAuthor;
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
          })
          }

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})