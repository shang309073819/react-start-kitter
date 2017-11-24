import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

class Root extends Component {

	render() {
		return (
			<Router>
				{this.props.routes()}
			</Router>
		);
	}
}

export default Root;