import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('App shows a login message when user is not logged in', async () => {
    let component = render(<App />)
    await waitForElement(
      () => component.container.querySelector('.heading')
    )
    const heading = component.container.querySelector('.heading')
    expect(heading).toHaveTextContent('log in to application')
  })

  test('App shows notes', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    let component = render(<App />)
    await waitForElement(
      () => component.container.querySelector('.heading')
    )
    const heading = component.container.querySelector('.heading')
    expect(heading).toHaveTextContent('blogs')

    const blogs = component.container.querySelectorAll('.blog-title')
    expect(blogs.length).toBe(2)
  })
})