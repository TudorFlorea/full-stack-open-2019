import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {gql} from 'apollo-boost';
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'
import Login from './components/Login';
import RecommendedBooks from "./components/RecommendedBooks";

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

const SET_AUTHOR_BIRTH_YEAR = gql`
  mutation setAuthorBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
    }
  }
`

const LOGIN = gql`
  mutation doLogin($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`
const USER = gql`{
  me {
    username
    favoriteGenre
  }
}`


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const user = useQuery(USER)
  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      console.log('heresss')
      updateCacheWith(response.data.bookAdded)
    }
  })

  const [setBirthYear] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const [login] = useMutation(LOGIN);

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData }) => {
      console.log(subscriptionData);
      const bookAdded = subscriptionData.data.bookAdded
      notify(`${bookAdded.title} was added!`)
      updateCacheWith(bookAdded)
    }
  })

  const notify = message => { alert(message) }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      const newData = [...dataInStore.allBooks, addedBook]
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: newData
        }
      })
    }   
  }

  const logout = () => {
    setToken(null)
    setPage('books')
    localStorage.clear()
    client.resetStore()
  }

  const doLogin = async (username, password) => {

    const result = await login({
        variables: {username, password}
    });

    if(result) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)
    }
    setPage('books')
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  })

  return (
    <div>
      {errorNotification()}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={() => logout()}>Logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        setBirthYear={setBirthYear}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <RecommendedBooks
        show={page === 'recommended'} books={books} user={user}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Login 
        show={page === 'login'}
        login={doLogin}
        logout={logout}
        setToken={setToken}
      />

    </div>
  )
}

export default App