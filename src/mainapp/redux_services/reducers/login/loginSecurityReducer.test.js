import React from 'react';
import { shallow } from 'enzyme';
import { SET_CURRENT_USER } from "../../actions/types"
import loginSecurityReducer from './loginSecurityReducer';

describe('Login Security Reducer', () => {

    const initialState = {
        user: {},
        validToken: false
    }

    it('Should return default state in Login Security reducer', () => {
        const newState = loginSecurityReducer(undefined, {});
        expect(newState).toEqual(initialState);
    })
    it('Should return new state if receiving type SET_CURRENT_USER with payload', () => {
        const updatedState = {
            validToken: true,
            user: 'rasmus'
        };
        const newState = loginSecurityReducer(undefined, {
            type: SET_CURRENT_USER,

            payload: 'rasmus'
        });
        expect(newState).toEqual(updatedState);
    })
    it('Should return new state if receiving type SET_CURRENT_USER without payload', () => {
        const updatedState = {
            validToken: false,
            user: null
        };
        const newState = loginSecurityReducer(undefined, {
            type: SET_CURRENT_USER,

            payload: null
        });
        expect(newState).toEqual(updatedState);
    })
})