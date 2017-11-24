import React from 'react'
import {render} from 'react-dom';
import routes from './routes';
import Root from './Root';
import './styles/app.scss';
import {AppContainer} from 'react-hot-loader';
import 'babel-polyfill';

const renderApp = appRoutes => {
	render(
		<AppContainer>
			<Root routes={appRoutes}/>
		</AppContainer>,
		document.getElementById('react')
	);
};

renderApp(routes);

if (module.hot) {
	module.hot.accept('./routes', () => {
		const newRoutes = require('./routes').default;
		renderApp(newRoutes);
	});
}
