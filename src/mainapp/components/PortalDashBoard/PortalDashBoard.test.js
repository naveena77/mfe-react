import React from 'react';
import { shallow, mount } from 'enzyme';
import  PortalDashBoard  from './PortalDashBoard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const props = {
 classes:  {
    button: "PortalDashBoard-button-53",
    content: "PortalDashBoard-content-52",
    paper: "PortalDashBoard-paper-50",
    toolbar: "PortalDashBoard-toolbar-51"
 },
 theme : {}
}

jest.mock('@material-ui/core/styles', () => ({
    withStyles: styles => component => component
  }));

describe('Test case for testing Portaldashboard component', () => {
  it('Should display the dashboard component', () => {
    
    const wrapper = shallow(<PortalDashBoard {...props}/>)
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('h3')).toHaveLength(2);
    expect(wrapper.find(Grid)).toHaveLength(4);
    expect(wrapper.find(Paper)).toHaveLength(2);
  })
  
})
