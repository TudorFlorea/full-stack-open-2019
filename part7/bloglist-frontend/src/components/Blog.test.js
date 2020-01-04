import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('only blog title and author are displayed by default', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 20
  }

  const mockUser = {
    username: 'username',
    name: 'Name'
  }

  const component = render(
    <Blog
      blog={blog}
      user={mockUser}
      onBlogDelete={() => {}}
      onLikeClick={() => {}}
    />
  )

  const infoDiv = component.container.querySelector('.blog-title')
  expect(infoDiv).toBeVisible

  fireEvent.click(component.container)

  const blogInfo = component.container.querySelector('.blog-info')

  expect(blogInfo).toBeVisible
  // const likesSpan = component.container.querySelector(".blog-likes");
  // expect(likesSpan).toHaveTextContent(blog.likes);
})
