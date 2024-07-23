import React from 'react';
import { shallow } from 'enzyme';
import  {GET_ICON_STATUS}  from './../actions/types';
import commonReducer from './commonreducer';

describe('Common Reducer',() =>{
    
    const intialState ={
        menuIcon:false
    };

    it('Should return default state in common reducer',() =>{
        const newState = commonReducer(undefined,{});
        expect(newState).toEqual(intialState);
    });

    it('Should return new state if receiving type GET_ICON_STATUS',()=>{
        const updatedState ={
            menuIcon: true
        };
        const newState = commonReducer(undefined,{
            type: GET_ICON_STATUS,
            
            payload:updatedState.menuIcon
        });
        expect(newState).toEqual(updatedState);
    })
})