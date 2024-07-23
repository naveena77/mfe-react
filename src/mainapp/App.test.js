import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Landing from './components/Container-Layout/Landing/Landing';
import {Provider} from 'react-redux';
import { Route, Router, Switch} from 'react-router-dom';
import SecureRoutes from './SecurityUtils/SecureRoutes';

describe('Test case for testing login Page',() =>{
  
  it('Should display the Landing Component content in App',()=>
  {
      const wrapper = shallow(<App/>);
      const landing = wrapper.find(Landing);
      expect(landing.exists()).toBe(true);
      expect(wrapper.find('div')).toHaveLength(2);
      expect(wrapper.find(Provider)).toHaveLength(1);
      expect(wrapper.find(Router)).toHaveLength(1);
      expect(wrapper.find(Route)).toHaveLength(2);
      expect(wrapper.find(Switch)).toHaveLength(1);
      expect(wrapper.find(SecureRoutes)).toHaveLength(2);
  })
})

