import React from 'react';
import { shallow } from 'enzyme';
import { GET_ERRORS } from "../actions/types";
import errorReducer from "./errorReducers";

describe('Error Reducer',() =>{
    const initialState = {};

    it('Should return default state in error reducer',() =>{
        const newState = errorReducer(undefined,{});
        expect(newState).toEqual(initialState);
    });
    it('Should return new state if receiving type GET_ERRORS',()=>{
        const errorResp =[{
            errors:'Errror in loading the type GET_ERRORS'
        },
        {
            errors:'Error in loading the Type'
        }];
        const newState = errorReducer(undefined,{
            type: GET_ERRORS,
            payload: errorResp
        });
        expect(newState).toEqual(errorResp);
    })
})