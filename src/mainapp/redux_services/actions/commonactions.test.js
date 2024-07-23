import {GET_ICON_STATUS} from './types';
import axios from "axios";
import * as commonactions from "./commonactions";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

const mockResponse = "mockRes";

describe("testing commonactions", () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });
    it("should test hideShowMenuIcon", () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                res: {},
            });
        });
        const iconstatus ={};
        const res =iconstatus;
        const returnValue = [{
            type:GET_ICON_STATUS,
			payload:res
        }];

        const store = mockStore({ posts: {} });
        
        axios.get.mockImplementationOnce(() => Promise.resolve(res));

        return store.dispatch(commonactions.hideShowMenuIcon(res)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(returnValue);
    })

})})