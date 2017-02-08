import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1 className="text-center">feeds parser</h1>

    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/feeds' activeClassName='route--active'>
      Feeds
    </Link>
  </div>
)

export default Header
