import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Landing.css";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const SignInLazy = lazy(() => import("../../UserManagement/Login/Login"));
const DashBoardLazy = lazy(() =>
  import("./../../PortalDashBoard/PortalDashBoard")
);
import NotFoundPage from "./../../../../NotFoundPage";
import SecureRoutes from "../../../SecurityUtils/SecureRoutes";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { logout } from "./../../../redux_services/actions/login/loginSecurity";
import { hideShowMenuIcon } from "../../../redux_services/actions/commonactions";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
import Progress from "../Progress/Progress";
const CarInsuranceAppLazy = lazy(() => import("../../CarInsuranceApp"));
const HealthInsuranceAppLazy = lazy(() => import("../../HealthInsuranceApp"));
const HomeInsuranceAppLazy = lazy(() => import("../../HomeInsuranceApp"));
import { Toolbar } from "@material-ui/core";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0) + 0,
    [theme.breakpoints.up("xm")]: {
      width: theme.spacing(0) + 0,
    },
  },
  root1: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
  },
  appBarfooter: {
    top: "auto",
    bottom: 0,
  },
});

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerid: "",
      open: true,
      setOpen: true,
      errors: {},
      sucess: "",
      headerLinks: "",
      user: {},
      copy: "©",
      loginSecurity: {},
      customerProfile: {},
      validToken: false,
      hideshowmenus: false,
      menuIcon: true,
      selectedIndex: 0,
    };

    this.fetchcustomerProfile = this.fetchcustomerProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.logout = this.logout.bind(this);
    this.hideandshowmenus = this.hideandshowmenus.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ setOpen: true });
  }

  handleDrawerClose() {
    this.setState({ setOpen: false });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  componentDidMount() {
    this.hideandshowmenus();
  }

  hideandshowmenus() {
    if (this.state.loginSecurity.validToken && this.state.loginSecurity.user) {
      console.log(this.state.loginSecurity.validToken);
      this.setState({
        hideshowmenus:
          this.state.loginSecurity.validToken === null ? false : true,
      });
      this.setState({
        user: this.state.loginSecurity.user,
      });
    }
  }

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loginSecurity !== this.props.loginSecurity) {
      this.setState({ loginSecurity: prevProps.loginSecurity });
      this.hideandshowmenus();
    } else if (prevProps.menuIcon !== this.props.menuIcon) {
      this.setState({ open: prevProps.menuIcon.menuIcon });
      console.log(this.state.open);
    }
  }

  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginSecurity !== prevState.loginSecurity) {
      return { loginSecurity: nextProps.loginSecurity };
    } else if (nextProps.menuIcon !== prevState.menuIcon) {
      return { menuIcon: nextProps.menuIcon };
    } else return null;
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  fetchcustomerProfile(event) {
    event.preventDefault();
    this.props.getCustomerProfile(parseInt(this.state.customerid));
    console.log(parseInt(this.state.customerid));
  }

  hideandshowImage() {
    if (this.state.loginSecurity.validToken && this.state.loginSecurity.user) {
      console.log(this.state.loginSecurity.validToken);
      this.setState({
        hideshowmenus:
          this.state.loginSecurity.validToken === null ? false : true,
      });
      this.setState({
        user: this.state.loginSecurity.user,
      });
    }
  }

  onAddAge = (event) => {
    console.log(event);
  };

  onAddCarInsurance = (event1) => {
    console.log(event1);
  };

  onAddHomeInsurance = (event1) => {
    console.log(event1);
  };
  render() {
    const { classes } = this.props;
    const { open, sucess } = this.state;
    const { user } = this.state;

    return (
      <div className={classes.root}>
        <Snackbar
          open={this.state.cusopen}
          autoHideDuration={3000}
          onClose={this.customerhandleClose}
        >
          <Alert onClose={this.customerhandleClose} severity="success">
            {sucess}
          </Alert>
        </Snackbar>
        <Router
          history={history}
          onAddAge={this.onAddAge}
          onAddCarInsurance={this.onAddCarInsurance}
          onAddHomeInsurance={this.onAddHomeInsurance}
        >
          <CssBaseline />
          <Header />

          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
            style={{ display: this.state.hideshowmenus ? "block" : "none" }}
          >
            <List>
              <div className={classes.toolbar} />
              <ListItem button component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItem>
              <Divider />
              <ListItem
                button
                component={Link}
                className="sidebar"
                to="/carinsurance"
              >
                <ListItemText primary="Car Insurance" />
              </ListItem>
              <Divider />
              <ListItem button component={Link} to="/homeInsurance">
                <ListItemText primary="Home Insurance" />
              </ListItem>
              <Divider />
              <ListItem button component={Link} to="/healthInsurance">
                <ListItemText primary="Health Insurance" />
              </ListItem>
              <Divider />
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.root1}>
              <Suspense fallback={<Progress />}>
                <Switch>
                  <Route exact path="/" component={SignInLazy} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Toolbar
                          className="App-MainBackground"
                          style={{
                            display: this.state.hideshowmenus
                              ? "block"
                              : "none",
                          }}
                        >
                          <SecureRoutes path="/carinsurance">
                            <CarInsuranceAppLazy
                              onAddCarInsurance={(event) =>
                                this.onAddCarInsurance(event)
                              }
                              onAddAge={(age) => this.onAddAge(age)}
                            />
                          </SecureRoutes>
                          <SecureRoutes path="/healthinsurance">
                            <HealthInsuranceAppLazy
                              onAddAge={(age) => this.onAddAge(age)}
                            />
                          </SecureRoutes>

                          <SecureRoutes path="/homeinsurance">
                            <HomeInsuranceAppLazy
                              onAddAge={(age) => this.onAddAge(age)}
                              onAddHomeInsurance={(event) =>
                                this.onAddHomeInsurance(event)
                              }
                            />
                          </SecureRoutes>

                          <SecureRoutes
                            path="/dashboard"
                            component={DashBoardLazy}
                          />
                        </Toolbar>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </Suspense>
            </div>
          </main>
        </Router>
      </div>
    );
  }
}
const style = {
  flexGrow: 1,
};
Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  loginSecurity: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  hideShowMenuIcon: PropTypes.func.isRequired,
  menuIcon: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  loginSecurity: state.loginSecurity,
  menuIcon: state.menuIcon,
});

export default connect(mapStateToProps, { logout, hideShowMenuIcon })(
  withStyles(styles, { withTheme: true })(Landing)
);
