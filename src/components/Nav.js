import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMusic} from '@fortawesome/free-solid-svg-icons'

const Nav = ({isNavbar,setIsNavbar}) => {
  const handleNavbar=()=>{
    setIsNavbar(!isNavbar);
  }
  return (
    <div className="nav-bar">
      <h2>20/10</h2>
      <button onClick={()=>handleNavbar()}>
        <p>Library</p>
        <FontAwesomeIcon className="skip-back" icon={faMusic}  />
      </button>
    </div>
  )
}

export default Nav
