
import React, { useContext } from "react"

import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import { AuthContext } from "../../context/Auth/AuthContext";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import toastError from "../../errors/toastError";


import api from "../../services/api";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Dialog from '@material-ui/core/Dialog/Dialog'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend, ArcElement
);

const useStyles = makeStyles(theme => ({
	container: {

		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	menu: {
		justifyContent: "center",
		alignContent: "center",
		paddingTop: theme.spacing(5),
		paddingLeft: theme.spacing(3),
		paddingBottom: theme.spacing(0),


	},
	menuButtons: {
		color: "#FE3E6D",
		borderRadius: "30px",
		margin: "5px",
		fontSize: "12px"

	},

	buttonDialog: {
		color: "#FFF",
		backgroundColor: "#FE3E6D",
		borderRadius: "30px",
		fontSize: "12px",
		margin: 20

	},
	menuButtonsActive: {
		color: "#FFF",
		backgroundColor: "#FE3E6D",
		borderRadius: "30px",
		margin: "5px",
		fontSize: "12px"

	},
	dialog: {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		flexDirection: "column",
		alignItems: "center",

	},
	dialogItems: {
		margin: 20,
		width: "80%",
		height: 60
	},


	customCardChart: { //

		overflow: "hidden",
		padding: 20,
		height: 300,
	},

}))
const Dashboard = () => {

	const classes = useStyles()

	const { user } = useContext(AuthContext);
	// const [tickets, setTickets] = useState([]);
	const [userId, setUserId] = useState(user.profile === "user" ? user.id : null);
	const [users, setUsers] = useState([]);
	const [dateIni, setDateIni] = useState(new Date().setDate(new Date().getDate() - 7));
	const [dateFin, setDateFin] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const [openTickets, setOpenTickets] = useState(0);
	const [pendingTickets, setPendingTickets] = useState(0);
	const [closedTickets, setClosedTickets] = useState(0);
	const [ticketsClosedByMoth, setTicketsClosedByMoth] = useState([]);

	const doughnutData = {
		labels: ['Finalizados', 'Em Atendimento', 'Aguardando'],
		datasets: [
			{
				label: '# of Votes',
				data: [closedTickets, openTickets, pendingTickets, 0],

				backgroundColor: [
					'#98E3C3',
					'#74C5F5',
					'#FBED90',
					'rgb(250, 250, 250)',

				],

			},
		],
	};


	const LineOptions = {
		maintainAspectRatio: false,

		scales: {
			x: {


				grid: {
					display: false,

				},
			},
			Y: {
				grid: {
					display: false,
				},

			},
		},
	};

	const doughnutOptions = {
		maintainAspectRatio: false,

	};



	const LineData = {
		labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		datasets: [
			{

				label: `Atendimentos Finalizados em ${new Date().getFullYear()}`,
				data: ticketsClosedByMoth,
				fill: true,
				borderColor: '#74C5F5',
				backgroundColor: "#74C5F5",



			},

		]

	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);

	};

	const buttonSearchByUserId = ({ dateInitial, dateFinal, userId }) => {
		handleClose();

		const delayDebounceFn = setTimeout(() => {
			const fetchTickets = async () => {
				try {
					const { data } = await api.get("/tickets/custom", {
						params: {
							dateInitial,
							dateFinal,
							userId,

						},
					})
					if (user.profile === "admin") {
						const result = await api.get("/users");
						setUsers(result.data.users);
					}


					setOpenTickets(data.open)
					setPendingTickets(data.pending)
					setClosedTickets(data.closed)
					setTicketsClosedByMoth(data.ticketsClosedByMoth)
					// setTickets(data)


				} catch (err) {


					toastError(err)
				}
			}

			fetchTickets()
		}, 500)
		return () => clearTimeout(delayDebounceFn)

	}
	function SimpleDialog(props) {
		const { onClose, open } = props;

		const handleClose = () => {
			onClose();
		};
		return (
			<Dialog onClose={handleClose} open={open} >
				<DialogTitle>Mais opções de filtro</DialogTitle>
				<Grid container xs={12} className={classes.dialog} >
					{user.profile === 'admin' ? <Select
						className={classes.dialogItems}
						value={userId}
                   
						onChange={
							(e) => setUserId(e.target.value)}
						style={{ width: '150px' }}

						name="searchUserId"
					>

						{users.map((e) => {
							if (e.profile === "user") {

								return <MenuItem value={e.id} key={e.id}>
									{e.name}
								</MenuItem>
							} else {
								return null;
							}
						})}

					</Select> : null


					}

					<TextField
						className={classes.dialogItems}
						id="date"
						label="Data Inicial"
						type="date"
						defaultValue={dateIni}
						// className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDateIni(e.target.value)}
					/>

					<TextField
						id="date"
						label="Data Final"
						type="date"
						defaultValue={dateFin}
						className={classes.dialogItems}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => setDateFin(e.target.value)}
					/>

					<Button variant="contained" color="primary" className={classes.buttonDialog} onClick={() => { buttonSearchByUserId({ dateInitial: dateIni, dateFinal: dateFin, userId: userId }); setActive(4); }} disableElevation>
						Filtrar
					</Button>


				</Grid>
			</Dialog>
		);
	}

	SimpleDialog.propTypes = {
		onClose: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired,

	};

	useEffect(() => {
		user.profile === "admin" ? buttonSearchByUserId({ dateInitial: dateIni, dateFinal: dateFin }) :
			buttonSearchByUserId({ dateInitial: dateIni, dateFinal: dateFin, userId: user.id });


	}, []);

	const handleDate = (i) => {
		var init = new Date();
		var final = new Date();
		switch (i) {
			case 0:

				init.setDate(init.getDate() - 7);

				setDateIni(init);
				setDateFin(final);


				break;
			case 1:

				init.setDate(init.getDate() - 14);

				setDateIni(init);
				setDateFin(final);


				break;
			case 2:

				init.setDate(init.getDate() - 30);

				setDateIni(init);
				setDateFin(final);


				break;
			case 3:

				setDateIni('');
				setDateFin('');


				break;

			default:

		}

		setActive(i)
		user.profile === "admin" ? buttonSearchByUserId({ dateInitial: dateIni, dateFinal: dateFin }) :
			buttonSearchByUserId({ dateInitial: dateIni, dateFinal: dateFin, userId: user.id });

	}


	return (
		<div>
			<Grid container className={classes.root} spacing={2}>

				<div className={classes.menu}>


					<Button variant="text" className={active === 0 ? classes.menuButtonsActive : classes.menuButtons} onClick={() => handleDate(0)}>7 Dias</Button>
					<Button variant="text" className={active === 1 ? classes.menuButtonsActive : classes.menuButtons} onClick={() => handleDate(1)}>14 Dias</Button>
					<Button variant="text" className={active === 2 ? classes.menuButtonsActive : classes.menuButtons} onClick={() => handleDate(2)}>1 Mês</Button>
					<Button variant="text" className={active === 3 ? classes.menuButtonsActive : classes.menuButtons} onClick={() => handleDate(3)}>Total</Button>

					<Button variant="text" onClick={handleClickOpen} className={active === 4 ? classes.menuButtonsActive : classes.menuButtons} >
						Filtrar por:
					</Button>
					<SimpleDialog

						open={open}
						onClose={handleClose}
					/>

				</div>

			</Grid>


			<Container maxWidth="lg" className={classes.container}>

				<Grid container spacing={3}>

					<Grid item lg={6} xs={12}>
						<Paper className={classes.customCardChart} elevation={0}>

							<Line options={LineOptions} data={LineData} />

						</Paper>
					</Grid>
					<Grid item lg={6} xs={12}>
						<Paper className={classes.customCardChart} elevation={0}>
							<Doughnut data={doughnutData} options={doughnutOptions} />
						</Paper>
					</Grid>


				</Grid>
			</Container>
		</div >
	)
}


export default Dashboard