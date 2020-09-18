import React, { useContext, useState, Fragment } from 'react';
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
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
//Mantenimientosimport { v4 as uuidv4 } from "uuid";

const style = {
	container: {
		paddingTop: '20px',
		maxWidth: '1500px'
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
	},
	grid: {
		marginBottom: 20,
		marginTop: 30,
		backgroundColor: '#fff',
		borderRadius: '5px'
	}
};

function NuevaTransaccion() {
	const context = useContext(TodoContext);
	let numero = '';
	const [ Codigo, setCodigo ] = useState((numero = Math.round(Math.random() * (99999 - 1) + 1)));
	const [ Cuenta, setCuenta ] = useState('4520206864');
	const [ Destino, setDestino ] = useState('');
	const [ Monto, setMonto ] = useState('');
	//const [ Saldo, setSaldo ] = useState('');
	const [ Mensaje, setMensaje ] = useState('');
	const [ Tipo, setTipo ] = useState('Retiro');
	const [ fecha, setFecha ] = useState(new Date());

	const onCreateSubmit = (event) => {
		event.preventDefault();
		if (Monto == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe Seleccionar el monto de la Transaccion' ]
			});
		} else if (Cuenta == '' || Monto == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar los campos de la Transaccion' ]
			});
		}
		context.createTodo(event, {
			cod_transaccion: Codigo,
			tipo_trans: Tipo,
			cuenta: Cuenta,
			cuenta_destino: Destino,
			monto: Monto,
			fecha: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			hora: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
		});
		setTipo('Retiro');
		setCuenta('');
		setDestino('');
		setMonto('');
		setMensaje('');
	};

	const agregarfechayhora = (date) => {
		setFecha(date);
	};

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2} style={style.grid}>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								type="text"
								value={Cuenta}
								onChange={(event) => {
									setCuenta(event.target.value);
								}}
								label="N° de Cuenta"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Fecha Entrada"
									format="dd/MM/yyyy"
									value={fecha}
									onChange={agregarfechayhora}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item md={4} xs={4}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardTimePicker
									margin="normal"
									id="time-picker"
									label="Hora Entrada"
									value={fecha}
									onChange={agregarfechayhora}
									KeyboardButtonProps={{
										'aria-label': 'change time'
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Seleccione opción</FormLabel>
								<RadioGroup
									name="Tipo"
									value={Tipo}
									onChange={(event) => {
										setTipo(event.target.value);
										setDestino('');
										setMonto('');
										setMensaje('');
									}}
								>
									<FormControlLabel
										value="Retiro"
										control={<Radio color="primary" />}
										label="Retiro"
										labelPlacement="start"
									/>
									<FormControlLabel
										value="Deposito"
										control={<Radio color="primary" />}
										label="Depósito"
										labelPlacement="start"
									/>
									<FormControlLabel
										value="Transferencia"
										control={<Radio color="primary" />}
										label="Transferencia"
										labelPlacement="start"
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>
					{Tipo == 'Retiro' ? (
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<TextField
									type="text"
									value={Monto}
									onChange={(event) => {
										setMonto(event.target.value);
									}}
									label="Monto a retirar"
									fullWidth={true}
								/>
							</Grid>
						</Grid>
					) : Tipo == 'Deposito' ? (
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<TextField
									type="text"
									value={Monto}
									onChange={(event) => {
										setMonto(event.target.value);
									}}
									label="Monto a depositar"
									fullWidth={true}
								/>
							</Grid>
						</Grid>
					) : (
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<TextField
									type="text"
									value={Monto}
									onChange={(event) => {
										setMonto(event.target.value);
									}}
									label="Monto a transferir"
									fullWidth={true}
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									type="text"
									value={Destino}
									onChange={(event) => {
										setDestino(event.target.value);
									}}
									label="Cuenta Destino"
									fullWidth={true}
								/>
							</Grid>
						</Grid>
					)}
					<Grid container spacing={2}>
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onCreateSubmit}
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
export default NuevaTransaccion;
