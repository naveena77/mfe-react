import  {GET_ICON_STATUS}  from './../actions/types';

const intialState ={
    menuIcon:false
};

export default function(state = intialState,action){
  switch(action.type){
    case GET_ICON_STATUS:
    return {
        ...state,
        menuIcon:action.payload
    };
      default:
          return state;
  }
}