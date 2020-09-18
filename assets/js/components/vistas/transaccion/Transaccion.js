import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Grid, Link, Typography, IconButton, TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Icon from '@mdi/react';
import { mdiFileDocumentEdit, mdiEyeCheck, mdiFileCancel, mdiCardSearch } from '@mdi/js';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { TodoContext } from './TodoContext';

const style = {
	table: {
		minWidth: 650,
		paddingTop: '40px'
	},
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
	},
	homeIcon: {
		width: 20,
		height: 20,
		marginRight: '4px'
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
	divider: {
		marginBottom: 20
	},
	search: {
		width: 400,
		marginBottom: 20
	},
	tableHead: {
		color: '#ffffff',
		backgroundColor: '#E2001A'
	},
	tableCell: {
		color: '#ffffff'
	},
	estado: {
		color: '#28B463'
	},
	grid: {
		marginBottom: 20,
		marginTop: 30,
		backgroundColor: '#fff',
		borderRadius: '5px'
	}
};

function Transaccion(props) {
	const onChangeIndex = props.onChangeIndex;
	const context = useContext(TodoContext);
	console.log(context.todos);
	let Tipo = '';
	let Fecha;
	let filtro = {};
	let Nombre = '';
	const [ termino, setTermino ] = useState('');
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ transaccionEliminar, setTransaccionEliminar ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function busqueda(termino) {
		return function(filtro) {
			filtro.cod_transaccion.toString().includes(termino.toLowerCase()) ||
				filtro.tipo_trans.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.cuenta.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.cuenta_destino.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.monto.toString().includes(termino.toLowerCase()) ||
				filtro.fecha.toString().includes(termino.toLowerCase()) ||
				!termino;
		};
	}

	function historyBack() {
		window.history.back();
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

	return (
		<Fragment>
			<TextField
				fullWidth
				placeholder="Buscar..."
				onChange={(event) => {
					setTermino(event.target.value);
				}}
				value={termino}
				style={style.search}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Icon path={mdiCardSearch} size={1.5} color="red" />
						</InputAdornment>
					)
				}}
			/>
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<TableContainer component={Paper}>
					<Table style={style.table} aria-label="customized table">
						{/*HEAD*/}
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Transacción
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Tipo
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Usuario
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Cuenta #1
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Cuenta #2
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Fecha - Hora
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Monto
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Opciones
								</TableCell>
							</TableRow>
						</TableHead>
						{/*BODY*/}
						<TableBody>
							{context.todos
								.filter(busqueda(termino))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => (
									<TableRow key={'todo ' + index}>
										{/*NOMBRE*/}
										<TableCell align="left">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.cod_transaccion}
											</Typography>
										</TableCell>
										{/*OBSERVACIÓN*/}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{context.tipo.map((res) => {
													if (res.cod_tipo == todo.tipo_trans) {
														Tipo = res.cod_tipo + '-' + res.nombre;
													}
												})}
												{Tipo}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.documento + ' // ' + todo.nombre}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.cuenta}</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.cuenta_destino}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.fecha + ' // ' + todo.hora}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.monto}</Typography>
										</TableCell>
										<TableCell align="center">
											<Fragment>
												<IconButton>
													<Icon path={mdiFileDocumentEdit} size={1} color="red" />
												</IconButton>
												<IconButton>
													<Icon path={mdiEyeCheck} size={1} color="red" />
												</IconButton>
												<IconButton
													onClick={() => {
														setEliminarVisible(true);
														setTransaccionEliminar(todo);
													}}
												>
													<Icon path={mdiFileCancel} size={1} color="gray" />
												</IconButton>
											</Fragment>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={context.todos.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
		</Fragment>
	);
}

export default Transaccion;
