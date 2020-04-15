import React from 'react'
import { withStyles } from "@material-ui/core/styles"
import CustomCard from "../components/custom-card"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import firebase from "gatsby-plugin-firebase"
import firebase from '../helper/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650,
  },
});   


class AdminTestCenter extends React.Component{
        constructor(props){
          super(props)
          this.state = {
            rows: [],          
          }
          
      }

        

        deleteRow = (id) =>{

            // console.log('Id to be deleted.... ', id);
            firebase.firestore().collection('admin-form').doc(id).delete();
            // console.log('Id deleted ', id);
    
          }

          handleUpdate = () => {
            console.log('Click event ');
            firebase.firestore().collection('admin-form').onSnapshot( snapshot => {
                let snaps = snapshot.docChanges();
                // console.log('Snaps: ', snaps);
                snaps.forEach( row => {
                    console.log('Data ',row.doc.id);
                    if(row.type === 'remove'){
                        
                    }
                    
                })
            })
          }
 
    componentDidMount(){
      const context = this
      firebase.firestore().collection('admin-form').orderBy('city').onSnapshot(snapshot =>{
        let changes = snapshot.docChanges();

        changes.forEach(change => {                  
          if(change.doc.exists) { 
          let newRows = {
            hospitalName: change.doc.data().hospitalName,
            city: change.doc.data().city,
            location: change.doc.data().location,
            address: change.doc.data().address,
            phoneNumber: change.doc.data().phoneNumber,
            id: change.doc.id
          }
          let rows = [...this.state.rows, newRows];
            context.setState({rows: rows })
          }  
        })
      })
     
    }

    render (){
        // const { title } = this.props
        const {classes} = this.props;
        // const {handleOnclick} = this.handleOnclick;        
        const {rows} = this.state
        return(                        
            <CustomCard title={'Admin Test Center'}>             
        <TableContainer component={Paper}>
        {rows.length <= 0 ? (
          <div className={classes.root}>
          <LinearProgress color="primary" />
          </div>
          ) : null}       
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>          
            <TableCell>City</TableCell>
            <TableCell align="right">Hospital</TableCell>
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
              <TableCell align="right">{row.hospitalName}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell> 
              <TableCell align="right"><button style={{background: 'red'}} onClick={ () => {this.deleteRow(row.id)} } type="submit" size="large" ><span>x</span></button></TableCell> 
              {/* <div>
                  <button onClick={this.handleOnclick} type="submit" size="large" ><span>x</span></button>
              </div>               */}
            </TableRow>            
          ))}                   
        </TableBody>
      </Table>      
    </TableContainer>
</CustomCard>
)
    }
}

export default withStyles(useStyles) (AdminTestCenter)