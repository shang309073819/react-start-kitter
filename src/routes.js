import React from 'react'
import {Route} from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
const routes = () => {
	return (
		<div>
			<Route exact path="/" component={Home}/>
			<Route path="/edit/:id" component={Edit}/>
		</div>
	)
};

export default routes;
