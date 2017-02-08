import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <IndexLink to='/' activeClassName='route--active'>
      <h1 className="text-center">feeds parser</h1>
    </IndexLink>
  </div>
)

export default Header
