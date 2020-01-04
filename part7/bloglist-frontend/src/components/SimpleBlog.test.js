import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('it renders correctly', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 20
  }

  const component = render(<SimpleBlog blog={blog} />)

  const titleDiv = component.container.querySelector('.blog-title')
  expect(titleDiv).toHaveTextContent(`${blog.title} ${blog.author}`)

  const likesSpan = component.container.querySelector('.blog-likes')
  expect(likesSpan).toHaveTextContent(blog.likes)
})

test('clicking on the like button fires the click event', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 20
  }

  const clickMock = jest.fn()
  const component = render(<SimpleBlog blog={blog} onClick={clickMock} />)
  const button = component.container.querySelector('.blog-like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(clickMock.mock.calls.length).toBe(2)
})
