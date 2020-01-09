import React, { useState } from 'react'
import BirthYear from './BirthYear'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors.loading ?  [] : props.authors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors && authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYear authors={authors} setBirthYear={props.setBirthYear} />
    </div>
  )
}

export default Authors