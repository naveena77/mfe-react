import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({
  component: Component,
  loginSecurity,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      loginSecurity.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="" />
      )
    }
  />
);

SecuredRoute.propTypes = {
  loginSecurity: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loginSecurity: state.loginSecurity,
});

export default connect(mapStateToProps)(SecuredRoute);
