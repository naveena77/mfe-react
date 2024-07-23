
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Header.css';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Banner from '../../../assets/images/logo.png';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from "react-redux";
import {logout} from '../../../redux_services/actions/login/loginSecurity';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {hideShowMenuIcon} from './../../../redux_services/actions/commonactions';

const drawerWidth = 270;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0) + 0,
    },
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customerid: '',
      open:true,
      setOpen:true,
      errors: {},
      sucess:'',
      headerLinks:'',
      user:{},
      loginSecurity:{},
      customerProfile:{},
      validToken :false,
      hideshowmenus:false
    }

    this.fetchcustomerProfile = this.fetchcustomerProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.logout =this.logout.bind(this);
    this.hideandshowmenus=this.hideandshowmenus.bind(this);

  }

  handleDrawerOpen() {
    this.state.setOpen=true;
  };

  handleDrawerClose()   {
    this.state.setOpen=false;
  };
 
  handleToggle(){
    this.setState({open: !this.state.open});
    console.log(this.state.open);
    this.props.hideShowMenuIcon(this.state.open);
  }

  componentDidMount() {
      this.hideandshowmenus();
  }

  hideandshowmenus(){
      if(this.state.loginSecurity.validToken && this.state.loginSecurity.user){
        console.log(this.state.loginSecurity.validToken);
            this.setState({
              hideshowmenus: this.state.loginSecurity.validToken === null ? false : true
            });
            const res=this.state.loginSecurity;
            let finalres = res.user;
            let name = finalres;
            this.state.user = name;
            console.log(this.state.user);

      }
  }

  
  logout(){
    this.props.logout();
    window.location.href = "/";
  }
  

  componentDidUpdate(prevProps, prevState) {
	
		if (prevProps.loginSecurity.validToken !==this.props.loginSecurity.validToken) {
         this.setState({ loginSecurity:prevProps.loginSecurity});
         this.hideandshowmenus();
      }
	  }

	
	  static getDerivedStateFromProps(nextProps, prevState){
	      if(nextProps.loginSecurity!==prevState.loginSecurity){
			  return {loginSecurity: nextProps.loginSecurity};
      }
		
		else return null;
	  }
 
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }
 
 
  fetchcustomerProfile(event) {
    event.preventDefault();
    this.props.getCustomerProfile(parseInt(this.state.customerid));
    console.log(parseInt(this.state.customerid));
  }
 
 

  render() {
    const { classes} = this.props;
    const {  open } = this.state;
    const { user} = this.state;

    return (
      <React.Fragment> 
      <div className={classes.root}>
       <CssBaseline />
       <AppBar
        position="fixed"
      
         className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
         
      >
      <Toolbar>
       
        <IconButton style={{ display: this.state.hideshowmenus ? "block" : "none" }}
          color="inherit"
          aria-label="open drawer"
          onClick={this.handleToggle}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.show]: open,
          })}
          
        >
          <MenuIcon />
          
        </IconButton>
        <div >
           <img className="Header-logo" src={Banner} alt="logo" />
          
        </div><p>&nbsp;</p><p>&nbsp;</p>

          <Typography variant="inherit" style={style} className="header_title">

            Insurance Portal
          </Typography>
          <Link to="/dashboard" className="_header" style={{ display: this.state.hideshowmenus ? "block" : "none" }}>
          <Typography variant="inherit" style={style} className="wel_header_title"
           >
                      Hello {user.username} 
             </Typography></Link><PermIdentityIcon className="wel_welcome_icon" style={{ display: this.state.hideshowmenus ? "block" : "none" }}/><p>&nbsp;</p>
          <Link to="/Logout" className="_header" onClick={this.logout} style={{ display: this.state.hideshowmenus ? "block" : "none" }}>
               <Typography variant="inherit" style={style} className="wel_header_title">
                      Logout    
             </Typography></Link><p>&nbsp;</p>
      </Toolbar>
      <Toolbar className="App-MainGroup" style={{ display: this.state.hideshowmenus ? "none" : "block" }}>
          </Toolbar>
    </AppBar>
     </div>
     </React.Fragment> 
    );
  }
}
const style = {
  flexGrow: 1
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired, 
  loginSecurity:PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired,
  hideShowMenuIcon:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loginSecurity : state.loginSecurity
});

export default connect(mapStateToProps,{logout,hideShowMenuIcon}) (withStyles(styles, { withTheme: true })(Header));