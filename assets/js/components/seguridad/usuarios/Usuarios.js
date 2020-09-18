import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Typography, TextField, IconButton, InputAdornment } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiAccountEdit, mdiAccountLock, mdiEyeSettings, mdiCardSearch } from '@mdi/js';
import { TodoContext } from './TodoContext';
import DeleteDialog from './DeleteDialog';

const style = {
	table: {
		minWidth: 650,
		paddingTop: '40px'
	},
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
	error: {
		marginTop: 20,
		marginBottom: 20
	},
	tableHead: {
		color: '#ffffff',
		backgroundColor: '#E2001A'
	},
	tableCell: {
		color: '#ffffff'
	},
	search: {
		width: 400,
		marginBottom: 20
	},
	estado: {
		color: '#28B463'
	}
};

function Usuarios(props) {
	const context = useContext(TodoContext);
	console.log(context.todos);
	const onChangeIndex = props.onChangeIndex;
	let filtro = {};
	const [ termino, setTermino ] = useState('');
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ usuarioEliminar, setusuarioEliminar ] = useState(null);
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
			return (
				filtro.nombre.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.email.toLowerCase().includes(termino.toLowerCase()) ||
				!termino
			);
		};
	}

	function historyBack() {
		window.history.back();
	}

	const estado = [ { state: 'Activo' }, { state: 'Inactivo' } ];
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
				<TableContainer component={Paper} style={style.space}>
					<Table style={style.table} aria-label="customized table">
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Documento
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Nombre
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Email
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Estado
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Opciones
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{context.todos
								.filter(busqueda(termino))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => (
									<TableRow key={'todo ' + index}>
										<TableCell align="right">
											<Typography>{todo.documento}</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography>{todo.nombre + ' ' + todo.apellidos}</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography>{todo.email}</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography style={todo.estado === 'Activo' ? style.estado : null}>
												{todo.estado}
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Fragment>
												<IconButton>
													<Icon path={mdiAccountEdit} size={1} color="red" />
												</IconButton>
												<IconButton color="primary" component="span">
													<Icon path={mdiEyeSettings} size={1} color="red" />
												</IconButton>
												<IconButton
													color="primary"
													component="span"
													onClick={() => {
														setEliminarVisible(true);
														setusuarioEliminar(todo);
													}}
												>
													<Icon path={mdiAccountLock} size={1} color="gray" />
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
			{eliminarVisible && (
				<DeleteDialog todo={usuarioEliminar} open={eliminarVisible} setEliminarVisible={setEliminarVisible} />
			)}
		</Fragment>
	);
}

export default Usuarios;
