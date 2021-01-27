import { Router, Route } from 'preact-router';
import {h, FunctionComponent} from 'preact';
import Login from '../../routes/login';
import Register from '../../routes/register';
import { Redirect } from '..';

const UnauthenticatedApp: FunctionComponent = () =>
  <Router>
    <Route path='/login' component={Login}/> 
    <Route default path='/login' component={Redirect}/> 
    <Route path='/register' component={Register}/> 
    {/* <Login path='/login' />
    <Register path='/register' />
    <Redirect default to='/login' /> */}
  </Router>

export default UnauthenticatedApp
