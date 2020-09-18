import React, { useContext, useState } from 'react';
import {
	Container,
	Paper,
	Grid,
	Breadcrumbs,
	Link,
	Typography,
	TextField,
	IconButton,
	Divider,
	Button,
	InputAdornment
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
import { Save, Cancel } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const style = {
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 15,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
	},
	form: {
		width: '100%'
	},
	submit: {
		marginTop: 20,
		marginBottom: 20
	},
	space: {
		paddingTop: '20px'
	}
};

function NuevoUsuario() {
	const context = useContext(TodoContext);
	let domain = '@gmail.com';
	let numero = '';
	const [ addCuenta, setAddCuenta ] = useState((numero = Math.round(Math.random() * (9999999999 - 1) + 1)));
	const [ addDocumento, setAddDocumento ] = useState('');
	const [ addNombre, setAddNombre ] = useState('');
	const [ addApellidos, setAddApellidos ] = useState('');
	const [ addEmail, setAddEmail ] = useState('');
	const [ addPassword, setAddPassword ] = useState('');
	const [ addEstado, setAddEstado ] = useState('Activo');
	const [ addSaldo, setAddSaldo ] = useState('1000000');
	const [ error, seterror ] = useState({
		addDocumento: false,
		addNombre: false,
		addApellidos: false,
		addEmail: false,
		addPassword: false
	});
	const [ textoAyuda, settextoAyuda ] = useState({
		addDocumento: '',
		addNombre: '',
		addApellidos: '',
		addEmail: '',
		addPassword: ''
	});

	const onCreateSubmit = (event) => {
		event.preventDefault();
		if (addDocumento == '' || addNombre == '' || addApellidos == '' || addEmail == '' || addPassword == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar los campos del Usuario' ]
			});
		}
		context.createTodo(event, {
			documento: addDocumento,
			n_cuenta: addCuenta,
			nombre: addNombre,
			apellidos: addApellidos,
			email: addEmail + domain,
			password: addPassword,
			estado: addEstado,
			saldo: addSaldo
		});
		console.log({
			documento: addDocumento,
			n_cuenta: addCuenta,
			nombre: addNombre,
			apellidos: addApellidos,
			email: addEmail + domain,
			password: addPassword,
			estado: addEstado,
			saldo: addSaldo
		})
		setAddDocumento('');
		setAddNombre('');
		setAddApellidos('');
		setAddEmail('');
		setAddPassword('');
	};

	function historyBack() {
		window.history.back();
	}

	return (
		<Container>
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="number"
								value={addDocumento}
								onChange={(event) => {
									setAddDocumento(event.target.value);
								}}
								label="Ingrese su Documento"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addNombre}
								onChange={(event) => {
									setAddNombre(event.target.value);
								}}
								label="Ingrese su Nombre"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addApellidos}
								onChange={(event) => {
									setAddApellidos(event.target.value);
								}}
								label="Ingrese sus Apellidos"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								error={error.addEmail}
								type="text"
								value={addEmail}
								onChange={(event) => {
									setAddEmail(event.target.value);
									if (addEmail.length > 15 || !/^[A-Za-z\s]+$/.test(addEmail)) {
										error.addEmail = true;
										textoAyuda.addEmail = 'Utilice un correo válido';
										seterror(error);
										settextoAyuda(textoAyuda);
									} else {
										error.addEmail = false;
										textoAyuda.addEmail = '';
										seterror(error);
										settextoAyuda(textoAyuda);
									}
								}}
								helperText={textoAyuda.addEmail}
								fullWidth={true}
								label="Ingrese su Email"
								InputProps={{
									endAdornment: <InputAdornment position="end">@gmail.com</InputAdornment>
								}}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="password"
								value={addPassword}
								onChange={(event) => {
									setAddPassword(event.target.value);
								}}
								label="Ingrese su Contraseña"
								fullWidth={true}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2} style={style.grid}>
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onCreateSubmit}
								endIcon={<Save />}
							>
								Guardar
							</Button>
						</Grid>
						<Grid item xs={2} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="secondary"
								style={style.submit}
								onClick={historyBack}
								startIcon={<Cancel />}
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}
export default NuevoUsuario;
