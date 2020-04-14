import React, {useState} from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../utils/auth";
// import Login from "../components/login";
import firebase from "../helper/firebase"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {        
    setAnchorEl(event.currentTarget);
    console.log('Current T', anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let navLink = (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      {/* <span>{greetingMessage}</span> */}
      <nav>
      <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/admin/profile">Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}> <Link to="/admin/admin-form">Add Centers</Link></MenuItem>
        <MenuItem onClick={handleClose}> <Link to="/admin/admin-form"> <Link to="/admin/admin-testCenter">Test center</Link></Link></MenuItem>
      </Menu>
    </div>
        {/* <Link to="/">Home</Link> */}
        {` `}
        {/* <Link to="/admin/profile">Profile</Link> */}
        {` `}
        {/* <Link to="/admin/admin-form">Add Centers</Link> */}
        {` `}
        {/* <Link to="/admin/admin-testCenter">Test center</Link> */}
        {` `}

      </nav>
    </div>
  )
  let details;

  if (!isLoggedIn()) {
    details = (
      <Button aria-controls="fade-menu" aria-haspopup="true">
      <Link to="/admin/login"><span>Log in</span></Link>
      {` `}
    </Button> 
    )
  } else {
    const { displayName, email } = getUser()
    details = ( 
<div>
    <Button aria-controls="fade-menu" aria-haspopup="true">
         Logged in as {displayName} ({email})!
        {/* {` `}          */}
    </Button> 
    <Button aria-controls="fade-menu" aria-haspopup="true">      
      <a href="/" onClick={event => { event.preventDefault(); logout(firebase).then(() => navigate(`/admin/login`)) }}>
        <span>log out</span>
      </a>
  </Button>
</div>
  

    )
  }

  return <div>
          {navLink}
          {details}
        </div>

}