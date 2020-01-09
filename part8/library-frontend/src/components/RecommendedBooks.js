import React from 'react'

const RecommendedBooks = (props) => {
    
    const {user, show} = props;
    if(!show || !user) return null

    const books = props.books.loading ?  [] : props.books.data.allBooks
    const userData = user.data.me
    const userBooks = books.filter(book => book.genres.includes(userData.favoriteGenre))

    return (
        <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre <strong>patterns</strong></p>
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
            {userBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}

export default RecommendedBooks;