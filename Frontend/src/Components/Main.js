import { React } from 'react';
import { Route } from 'react-router-dom';
import login from './Login';
import signup from './Signup';
import landing from './Landing/Landing';
import dashboard from './Dashboard/Dashboard';
import creategroup from './CreateGroup';
import groupsdisplay from './DisplayGroup';


const Main = function () {
  return (
    <div>
      <Route exact path="/" component={landing} />
      <Route exact path="/login" component={login} />
      <Route exact path="/signup" component={signup} />
      <Route exact path="/landing" component={landing} />
      <Route exact path="/dash" component={dashboard} />
      <Route exact path="/creategroup" component={creategroup} />
      <Route exact path="/groupsdisplay" component={groupsdisplay} />
      
      
    </div>
  );
};

export default Main;
