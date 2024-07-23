import {GET_ICON_STATUS} from './types';


export const hideShowMenuIcon=(iconstatus) => async dispatch =>{
       const res =iconstatus;
         dispatch({
			type:GET_ICON_STATUS,
			payload:res
         });
       
}

