import { mount } from 'carInsurance/CarInsuranceApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onAddAge,handleOnClick,onAddCarInsurance }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onAddAge,
      onAddCarInsurance,
      handleOnClick : (data) =>{
        console.log('user login')
      }      
    });
    
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
