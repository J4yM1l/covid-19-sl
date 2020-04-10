import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CustomCard from "./custom-card"
import Button from '@material-ui/core/Button';
// import Input from "@material-ui/core/Input";
// import firebase from "gatsby-plugin-firebase"
import firebase from "../helper/firebase"
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    button: {
        margin: theme.spacing(1),
      },
  }));

  
class AdminForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            city: '',
            location: '',
            address: '',
            phoneNumber: '',
            date: Date.now()
        };
        // console.log('Porps:', props);

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
        console.log('Name value: ', name);
        
        
    }
    handleSubmit = (event) => {
        // alert(`A name was submitted: ' + ${this.state.city} ${this.state.phone}`);
        // console.log('Form Data', this.state);
        event.preventDefault();
        //will change this later
        // const consent = true;
        // const formData = this.state
        // console.log('Form data: ', formData);
        // TODO: add verifiation
        if(this.state.address === "" || this.state.city === "" || this.state.phoneNumber === ""){
          alert('Please fill in form')
        }else{
          firebase
          .firestore()
          .collection("/admin-form").add(this.state)
          alert('Thanks for sumbmitting')
        }
    // if (!consent) {
    //   alert("Please check the consent box")
    // } else {
    //   // TODO: handle error and save to crashlytics 
    //   firebase.auth().signInAnonymously().catch(function(error) {
    //        // Handle Errors here.
    //        var errorCode = error.code;
    //        var errorMessage = error.message;
        
    //        if (errorCode === 'auth/operation-not-allowed') {
    //          //alert('You must enable Anonymous auth in the Firebase Console.');
    //        } else {
    //         alert('Server down, please try again later!');
    //          console.log(error);

    //        }
    //      }).then(function(crenditial) {
    //         console.log(formData);
    //       var data = formData;//JSON.parse(formData)
    //       firebase
    //       .firestore()
    //       .collection("/admin-form").add(data)
    //      });
    // } 
  }
        


render(){
  // const classes = useStyles(); 
    return (
        <CustomCard title={"Test Center Form"}>
      <div >
        <div>
            <form onSubmit={this.handleSubmit}>
            <TextField
            id="standard-full-width"
            name="city" 
            value={this.state.city}
            type="text"
            onChange={this.handleChange} 
            label="City"
            style={{ margin: 8 }}
            placeholder="Enter City"
          //   helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            id="standard-full-width"
            label="Location"
            name="location"
            value={this.state.location}
            type="text"
            onChange={this.handleChange} 
            style={{ margin: 8 }}
            placeholder="Enter regional location"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            id="standard-full-width"
            label="Address"
            name="address"
            value={this.state.address}
            type="text"
            onChange={this.handleChange} 
            style={{ margin: 8 }}
            placeholder="Enter facility address"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            id="standard-full-width"
            type="number"
            label="Telephone"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange} 
            style={{ margin: 8 }}
            placeholder="Enter facility phone number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
         <Button type="submit" size="large" variant="contained" color="primary" disableElevation>
        Save
      </Button>
            </form>
          
          </div>
          </div>
      </CustomCard>
    );
}
  
}
export default AdminForm
