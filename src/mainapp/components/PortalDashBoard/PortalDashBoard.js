import React from 'react';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import { MenuList } from '@material-ui/core';
import HomeInsuranceApp from '../HomeInsuranceApp';
import CarInsuranceApp from '../CarInsuranceApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
	paper: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},table: {
		minWidth: 200,
	  },
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(3),
	}
});
class PortalDashBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			addAgg:0,
			insuranceList:[]
		};

	}

	componentDidMount(){
        //   if(window.sessionStorage.insuranceList != undefined){

		// 	let aof = JSON.parse(window.sessionStorage.insuranceList)
		// 	this.setState({
		// 		insuranceList:[...this.state.insuranceList, ...aof]
		// 	})
		//   }
	}
	onAddAge = (event) => {
		console.log(event);
		this.setState({
		  addAge:event
		})
	  };

	  onAddCarInsurance = (event) => {
		console.log(event);
		this.setState({
			insuranceList:[...this.state.insuranceList, ...event]
		})
		// window.sessionStorage.setItem("insuranceList", JSON.stringify(...event));
	  };

	  onAddHomeInsurance = (event) => {
		console.log(event);
		this.setState({
			insuranceList:[...this.state.insuranceList, ...event]
		})
	  };

	render() {

		const { classes } = this.props;
		return (
			<div>
				
			<Grid container spacing={1}>
				<Grid item xs={4}>
				<Paper className={classes.paper}>
						<CarInsuranceApp onAddCarInsurance={(event) => this.onAddCarInsurance(event)} onAddAge={(age) => this.onAddAge(age)}/>
				</Paper>
				</Grid>
				<Grid item xs={4}>
				<Paper className={classes.paper}>
				<center><h3>Welcome to Insurance Container MFE</h3></center><br></br>
				<center><b> Sum of the Car and Health Insurance: {this.state.addAge}</b></center>
				
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Id</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
					  {this.state.insuranceList.map((row,index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {index+1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.price}
                            </TableCell> 
							<TableCell component="th" scope="row">
                              Approved
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
				</Paper>	
				</Grid>
				<Grid item xs={4}>
				<Paper className={classes.paper}>
					<HomeInsuranceApp onAddHomeInsurance={(event) => this.onAddHomeInsurance(event)} onAddAge={(age) => this.onAddAge(age) }/>
				</Paper>	
				</Grid>
			</Grid>
			</div>
		);
	}
}
PortalDashBoard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PortalDashBoard);

