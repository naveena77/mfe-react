import { GET_ERRORS, SET_CURRENT_USER } from '../types';
import axios from "axios";
import * as actions from "./loginSecurity";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockErrorResponse = "mockErrRes";
const errCode500 = "500";
jest.mock('axios');
const setJWTToken = jest.fn();
const mockResponse = "mockRes";

describe("testing login security actions", () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });
    it("should test logout", () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                res: {},
            });
        });
        const res = {};
        const returnValue = [{
            type: SET_CURRENT_USER,
            payload: res
        }];

        const store = mockStore({ posts: {} });

        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        store.dispatch(actions.logout());
        // return of async actions
        expect(store.getActions()).toEqual(returnValue);


    })
    it("should test login error", () => {
        const errorResp = {
            response: {
                data: {
                    code: errCode500,
                    message: mockErrorResponse,
                    violations: null
                },
            }
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject(errorResp);
        });

        const res = {
            username: 'rasmus',
            password: 'rasmus123'
        };

        const returnValue = [];

        const store = mockStore({ posts: {} });

        axios.get.mockImplementationOnce(() => Promise.reject(errorResp));

        store.dispatch(actions.login(res)).then();
        // return of async actions
        expect(store.getActions()).toEqual(returnValue);
    })
})