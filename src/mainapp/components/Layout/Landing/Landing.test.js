import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Landing from "./Landing";
import Header from "../Header/Header";
import SecureRoutes from "../../../SecurityUtils/SecureRoutes";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

global.window = Object.create(window);
const url = "/PortalDashboard";
Object.defineProperty(window, "location", {
  value: {
    href: url,
  },
});
describe("Test case for testing Landing component", () => {
  const initialState = {};
  const mockStore = configureMockStore();
  let store;
  store = mockStore(initialState);
  const hideShowMenuIcon = jest.fn();
  const getCustomerProfile = jest.fn();
  const logout = jest.fn();
  let wrapper, instance;

  const props = {
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
    menuIcon: {},
    hideShowMenuIcon: hideShowMenuIcon,
    getCustomerProfile: getCustomerProfile,
    logout: logout,
  };
  beforeEach(() => {
    wrapper = shallow(
      <Landing.WrappedComponent store={store} {...props} />
    ).dive();
    instance = wrapper.instance();
  });
  it("Should render landing page correctly", () => {
    expect(wrapper.find("div")).toHaveLength(5);
    expect(wrapper.find(Router)).toHaveLength(1);
    expect(wrapper.find(Drawer)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(5);
    expect(wrapper.find(ListItemText)).toHaveLength(5);
    expect(wrapper.find(Divider)).toHaveLength(4);
    expect(wrapper.find(Route)).toHaveLength(2);
    expect(wrapper.find("main")).toHaveLength(1);
    expect(wrapper.find(Switch)).toHaveLength(1);
    expect(wrapper.find(SecureRoutes)).toHaveLength(6);
    expect(wrapper.find("h6")).toHaveLength(1);
  });
  it("Should test handleInputChange function", () => {
    const e = {
      target: {
        value: true,
        name: "validToken",
      },
    };
    instance.handleInputChange(e);
    expect(wrapper.state("validToken")).toBeTruthy();
  });
  it("Should test fetchcustomerProfile function", () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.setState({ customerid: 123 });
    instance.fetchcustomerProfile(event);
    expect(wrapper.state("customerid")).toBe(123);
  });
  it("should test handleDrawerOpen/Close", () => {
    instance.handleDrawerClose();
    expect(wrapper.state("setOpen")).toBeFalsy();
    instance.handleDrawerOpen();
    expect(wrapper.state("setOpen")).toBeTruthy();
  });
  it("should test handleToggle", () => {
    instance.handleToggle();
    expect(wrapper.state("open")).toBeFalsy();
    instance.handleToggle();
    expect(wrapper.state("open")).toBeTruthy();
  });
  it("should test logout", () => {
    instance.logout();
    expect(window.location.href).toEqual("/");
  });
});
