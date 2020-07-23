import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Activity from './components/Activity';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div className = 'App'>
      <Layout className = 'App'>
        <Route exact path='/' component={Home} />
        <Route exact path='/activity' component={Activity} />
      </Layout>
      </div>
    );
  }
}
