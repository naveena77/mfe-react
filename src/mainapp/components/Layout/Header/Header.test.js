import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import AppBar from '@material-ui/core/AppBar';
import configureMockStore from 'redux-mock-store';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import { connect, Provider } from "react-redux";
import { Link, Router, MemoryRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setJWTToken from '../../../SecurityUtils/setJWTToken';
import loginSecurity from '../../../redux_services/actions/login/loginSecurity';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

global.window = Object.create(window);
const url = "/PortalDashboard";
Object.defineProperty(window, 'location', {
    value: {
        href: url
    }
});
const initialState = {
  setSearchText: '',
  searchText: '',
  customerProfile: [],
  setOpen: true,
  open: true
};
const mockStore = configureMockStore();
let store;
store = mockStore(initialState);
const getCustomerProfile = jest.fn();
const hideShowMenuIcon = jest.fn();
const createCustomerProfile = jest.fn();
const logout = jest.fn();
let wrapper, instance

const props = {
  hideShowMenuIcon: hideShowMenuIcon,
  createCustomerProfile: createCustomerProfile,
      getCustomerProfile: getCustomerProfile,
      logout: logout,
      setOpen: true,
  open: true,
  loginSecurity:{},
  classes: {
    appBar: "Header-appBar-15",
    button: "Header-button-25",
    content: "Header-content-24",
    drawer: "Header-drawer-18",
    drawerClose: "Header-drawerClose-20",
    drawerOpen: "Header-drawerOpen-19",
    hide: "Header-hide-17",
    menuButton: "Header-menuButton-16",
    paper: "Header-paper-22",
    root: "Header-root-14",
    root1: "Header-root1-21",
    toolbar: "Header-toolbar-23"
  },
  customerProfile: {
    customerProfiles: [{
      customerId: "IKPC02500035",
      dateOfBirth: null,
      emailId: "abc35@ik.com",
      firstName: null,
      gender: null,
      lastName: null,
      phoneNumber: "+463535353535",
      title: null
    }]
  }
}
describe('Test case for testing header component', () => {


  jest.mock('@material-ui/core/styles', () => ({
    withStyles: styles => component => component
  }));
  jest.mock('', () => ({
    connect: mapStateToProps => component => component
  }))
  beforeEach(() => {
    wrapper = shallow(<Header.WrappedComponent store={store} {...props} />).dive();
    instance = wrapper.instance();
  })
  it('Should render Header', () => {
    expect(wrapper.find('div')).toHaveLength(1);
    //expect(wrapper.find('p').text()).toMatch(/Customer Profile/);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(MenuIcon)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(3);
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Toolbar)).toHaveLength(2);
  })
  it('Should test fetchcustomerProfile function', () => {
		const event={
			preventDefault: jest.fn()
		}
		instance.setState({emailId :'hey@rasmus.com'})
        instance.fetchcustomerProfile(event);
        expect(wrapper.state('emailId')).toBe('hey@rasmus.com');
    })
  it('should test handleInputChange', () => {
    const e = {
      target: {
        value: 'rasmus',
        name: 'firstName'
      }
    }
    instance.handleInputChange(e);
    expect(wrapper.state('firstName')).toEqual('rasmus');
  })
  it('should test handleDrawerOpen/Close', () => {
    instance.handleDrawerClose();
    expect(wrapper.state('setOpen')).toBeFalsy();
    instance.handleDrawerOpen();
    expect(wrapper.state('setOpen')).toBeTruthy();
  })
  it('should test handleToggle', () => {
    instance.handleToggle();
    expect(wrapper.state('open')).toBeFalsy();
    instance.handleToggle();
    expect(wrapper.state('open')).toBeTruthy();
  })
  it('should test logout', () => {
    instance.logout();
    expect(window.location.href).toEqual('/');
  })
})
