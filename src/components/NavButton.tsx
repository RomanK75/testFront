import React from 'react'
import { Link } from 'react-router-dom'

export type NavButtonProps = {
  href: string
  btnText: string
}

const NavButton = ({href,btnText}: NavButtonProps) => {
  return (
    <Link to={href}><button>{btnText}</button></Link>
  )
}

export default NavButton