import React, { useState } from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const style = {
	paper: {
		marginTop: 9,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: 5,
		backgroundColor: 'red'
	},
	form: {
		width: '100%',
		marginTop: 8
	},
	submit: {
		marginTop: 15,
		marginBottom: 20
	}
};

function Login() {
	const [ email, setemail ] = useState('');
	const [ password, setpassword ] = useState('');
	const history = useHistory();

	const onSubmit = (event) => {
		event.preventDefault();
		if (email == 'aldemar@gmail.com' && password == 'ApenarandaP1995') {
			let path = `/Transacciones`;
			history.push(path);
		}
	};
	return (
		<Container maxWidth="xs">
			<div style={style.paper}>
				<Avatar style={style.avatar}>
					<LockOutLineIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form style={style.form}>
					<TextField
						variant="outlined"
						fullWidth
						required
						label="E-mail"
						name="email"
						margin="normal"
						value={email}
						onChange={(event) => {
							setemail(event.target.value);
						}}
					/>
					<TextField
						variant="outlined"
						fullWidth
						label="Password"
						type="password"
						name="password"
						margin="normal"
						value={password}
						onChange={(event) => {
							setpassword(event.target.value);
						}}
					/>
					<Button
						type="submit"
						variant="contained"
						style={style.submit}
						fullWidth
						color="primary"
						onClick={onSubmit}
					>
						Iniciar Sesión
					</Button>
					<Grid container>
						<Grid item>
							<Link href="/usuarios" variant="body2">
								{'Registrarse'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default Login;
