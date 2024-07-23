import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { login } from "../../../redux_services/actions/login/loginSecurity";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { List, ListItem, ListItemText } from "@material-ui/core";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      copy: "©",
      errors: {},
      sucess: "",
      values: "",
      setValues: "",
      showPassword: false,
      passwordSetValues: "",
    };

    this.loginSubmit = this.loginSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }
  componentDidMount() {
    if (this.props.loginSecurity.validToken) {
      ///this.props.history.push("/dashboard");
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSecurity.validToken) {
      this.state.sucess = "login sucess";
      this.props.history.push("/dashboard");
      console.log(history);
    } else if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
    console.log(this.state.showPassword);
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  loginSubmit(event) {
    event.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(LoginRequest);
    this.state.username = "";
    this.state.password = "";
  }
  render() {
    const { errors, sucess } = this.state;

    const { history } = this.props;

    return (
      <div>
        <div className="-loginform-container">
          <div className="loginform-container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
              <h3 className="sucess">{sucess}</h3>
            </div>
            <form onSubmit={this.loginSubmit} autoComplete="off">
              <h3 className="-loginform-container-title">Sign In</h3>
              <TextField
                id="standard-full-width"
                label="Enter Username"
                variant="outlined"
                value={this.state.username}
                name="username"
                className={classnames("", {
                  "is-invalid": errors.username,
                })}
                fullWidth
                margin="normal"
                onChange={this.handleInputChange}
              />
              {errors.username && (
                <div className="sign_up_error">{errors.username}</div>
              )}
              <br></br>
              <TextField
                id="standard-full-width"
                label="Enter Passsword"
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                name="password"
                className={classnames("", {
                  "is-invalid": errors.password,
                })}
                fullWidth
                margin="normal"
                onChange={this.handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && (
                <div className="sign_up_error">{errors.password}</div>
              )}
              <br></br>
              <br></br>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <List>
                <a
                  href="http://localhost:4200/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ListItemText primary="Sign Up In Angular App" />
                </a>
              </List>
              <br></br>
            </form>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}
const style = {
  flexGrow: 1,
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loginSecurity: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  loginSecurity: state.loginSecurity,
  errors: state.errors,
});
export default connect(mapStateToProps, { login })(Login);
