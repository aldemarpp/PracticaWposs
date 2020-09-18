import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import AppNavBar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';
import Login from './components/seguridad/Login';
import TabTransaccion from './components/vistas/transaccion/TabTransaccion';
import TabUsuario from './components/seguridad/usuarios/TabUsuario';

function App(props) {
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<AppNavBar />
				<Grid container>
					<Switch>
						<Route path="/auth/login" exact component={Login} />
						<Route path="/usuarios" exact component={TabUsuario} />
						<Route path="/transacciones" exact component={TabTransaccion} />
					</Switch>
				</Grid>
			</MuiThemeProvider>
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
