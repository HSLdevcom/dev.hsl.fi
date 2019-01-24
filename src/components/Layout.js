import React from 'react'

import Header from './Header'

import { rhythm } from '../utils/typography'


export default ({children}) => (
  <>
    <Header/>
    { children }
  </>
)
