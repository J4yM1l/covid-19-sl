import React from "react"
import { Box } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AdminForm from '../components/admin-form'
// import AdminLogin from "../components/admin-login"
import Profile from '../components/profile'
import Login from '../components/login'
import Layout from "../components/layout"
import { Router } from "@reach/router"
import PrivateRoute from '../components/privateRoute'
import NavBar from "../components/nav-bar"
import AdminTestCenters from '../components/admin-testCenter'

const Admin  = () => {
  const matches = useMediaQuery("(min-width:600px)")
  return (
    <Layout>
      <Box
          display="flex"
          flexDirection={matches ? "row" : "column"}
          p={1}
          m={1}
        >
          <Box flexGrow={1} p={1}>
          <NavBar/>
          </Box>
        </Box>

        <Router>       
        {/* <Profile path="/admin/profile" /> */}
        <PrivateRoute path="/admin/admin-form" component={AdminForm} />
        <PrivateRoute path="/admin/profile" component={Profile} />
        <PrivateRoute path="/admin/admin-testCenter" component={AdminTestCenters}/>
        <Login path="/admin/login" />
      </Router>

      {/* <Box
          display="flex"
          flexDirection={matches ? "row" : "column"}
          p={1}
          m={1}
        >  
          <Box flexGrow={1} p={1}>          
          <AdminForm
              title={"Add/Update Test Center"}
            />
            {/* <Summary
              title={"Add/Update Test Center"}
            />
          </Box>
        </Box> */}
    </Layout>
  )
}

export default Admin
