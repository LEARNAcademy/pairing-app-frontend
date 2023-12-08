import React from "react"
import { Nav, NavItem } from "reactstrap"
import { NavLink, useNavigate } from "react-router-dom"

const Navigation = ({current_user, logout}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    logout()
    navigate("/")
  }
  return (
    <>
      <Nav className="nav">
        <NavItem>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </NavItem>
        {current_user && (
          <>
            <NavItem>
              <input type="button" value='Logout' onClick={handleClick}/>
            </NavItem>
            <NavLink to="/activities" className="nav-link">
                Activities
              </NavLink>
          </>
        )}
        {!current_user && (
          <>
            <NavItem>
              <NavLink to="/login" className="nav-link">
                Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
          </NavItem>
          </>
        )}
      </Nav>
    </>
  )
}

export default Navigation