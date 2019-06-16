import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Item from '../Itemdisplay/Item';
import Derivative from '../Derivative/Derivative';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Item}/>
      <Route path='/derivative/:id' component={Derivative}/>
    </Switch>
  </main>
)

export default Main