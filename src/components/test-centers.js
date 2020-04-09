/* eslint-disable no-unused-vars */
import React from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles"
import CustomCard from "../components/custom-card"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import firebase from "gatsby-plugin-firebase"
import firebase from '../helper/firebase'



const useStyles = () => makeStyles({
    table: {
      minWidth: 650,
    },
  });


class TestCenter extends React.Component{
        state = {
          rows: [],
        }
 
    componentDidMount(){
      const context = this
      // console.log('State ',context);
      
      firebase.firestore().collection('admin-form').orderBy('city').onSnapshot((snapshot) => {//get().then((snapshot) => {
        let changes = snapshot.docChanges();
        
        changes.forEach(change => {
          // let rows = [...this.state.rows, changes];
          let { rows } = context.state
            rows.push(change.doc.data());
            context.setState({rows })
          
        })
      })
    }
    render (){
        const { title } = this.props
        const classes = useStyles();
        const {rows} = this.state
        return(
            <CustomCard title={title}>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Telephone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.city}
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</CustomCard>
)
    }
}

export default TestCenter