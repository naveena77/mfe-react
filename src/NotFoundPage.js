import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from './../src/mainapp/assets/images/pnf.png';
class NotFoundPage extends React.Component{
    render(){
        return <div>
            <center><img src={PageNotFound}  /></center>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;