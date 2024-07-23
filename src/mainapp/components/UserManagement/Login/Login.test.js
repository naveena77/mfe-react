import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Login from './Login';

describe('Test case for testing Login component', () => {
    const initialState = {}
    const mockStore = configureMockStore();
    let store;
    store = mockStore(initialState);
    const getCustomerProfiles = jest.fn();
    const login = jest.fn();
    let wrapper, instance

    const props = {
        loginSecurity: { validToken: true },
        login: login,
        username: '',
        password: '',
        copy: "©",
        errors: {},
        sucess: '',
        values: '',
        setValues: '',
        showPassword: false,
        passwordSetValues: '',
        history: { push: jest.fn() }

    }
    beforeEach(() => {
        wrapper = shallow(<Login.WrappedComponent store={store} {...props} />);
        instance = wrapper.instance();
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('Should render login page correctly', () => {
        expect(wrapper.find('div')).toHaveLength(5);
        expect(wrapper.find('h3')).toHaveLength(2);
        expect(wrapper.find('br')).toHaveLength(7);
        expect(wrapper.find(TextField)).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find('form')).toHaveLength(1);
        expect(wrapper.find(Link)).toHaveLength(1);
    })
    it('Should test handleInputChange function', () => {
        const e = {
            target: {
                value: 'rasmus',
                name: 'username'
            }
        }
        instance.handleInputChange(e);
        expect(wrapper.state('username')).toEqual('rasmus');
    })
    it('Should test loginSubmit function', () => {
        const event = {
            preventDefault: jest.fn()
        }
        jest.spyOn(instance, 'loginSubmit');
        instance.loginSubmit(event);
        expect(login).toHaveBeenCalled();

    })
    it('Should test handleClickShowPassword function', () => {
        instance.handleClickShowPassword();
        expect(wrapper.state('showPassword')).toBeTruthy();
    })
    it('Should test handleMouseDownPassword function', () => {
        const event = {
            preventDefault: jest.fn()
        }
        jest.spyOn(instance, 'handleMouseDownPassword');
        instance.handleMouseDownPassword(event);
        expect(instance.handleMouseDownPassword).toHaveBeenCalled();
    })
    it('Should test componentDidUpdate function', () => {
        wrapper.setProps({sucess : 'alo'})
        expect(wrapper.state('sucess')).toBe("login sucess");
        wrapper.setProps({errors : 'login error',loginSecurity: {validToken:false} })
        wrapper.setState({errors : 'login error'})
        expect(wrapper.state('errors')).toBe("login error");
       /* const props2 = { errors: {},loginSecurity: {} };
        instance.componentDidUpdate(props2);
        expect(props.history.push).toHaveBeenCalledTimes(1);
    */})
    it('Should test componentDidMount function', () => {
        instance.componentDidMount();
        expect(props.history.push).toHaveBeenCalledWith('/dashboard');
        wrapper.setProps({ loginSecurity: {} });
        instance.componentDidMount();
        expect(props.history.push).toHaveBeenCalledTimes(1);
    })
    it('Should test the render errorhandling ', () => {
		wrapper.setState({ errors: { username: 'today' } });
        expect(wrapper.state('errors')).toStrictEqual({ username: 'today' });
		wrapper.setState({errors: {password: 'today'}});
		expect(wrapper.state('errors')).toStrictEqual({password: 'today'});
    })
})