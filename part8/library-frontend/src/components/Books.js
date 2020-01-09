import React, {useState, useEffect} from 'react'

import Genras from './Genras'

const Books = (props) => {

  const [books, setBooks] = useState([]);
  const [booksToShow, setBooksToShow] = useState([]);
  const [genras, setGenras] = useState([]);


  useEffect(() => {
    setBooks(props.books.loading ?  [] : props.books.data.allBooks)
  }, [props.books])

  useEffect(() => {
    const genrasArray = books.reduce((acc, book) => {
      return acc.concat(book.genres)
    }, []);
    
    setGenras(Array.from(new Set(genrasArray)));
    setBooksToShow(books)
  }, [books])

  if (!props.show) {
    return null
  }
  
  const onGenraSelected = genra => {
    setBooksToShow(books.filter(book => book.genres.includes(genra)))
  }

  const clearGenraFilted = () => {
    setBooksToShow(books)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              book
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Genras genras={genras} onGenraSelected={onGenraSelected} clear={clearGenraFilted} />
    </div>
  )
}

export default Books