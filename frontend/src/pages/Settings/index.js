import React, { useState, useEffect } from "react";
import openSocket from "../../services/socket-io";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import api from "../../services/api";
import { i18n } from "../../translate/i18n.js";
import toastError from "../../errors/toastError";
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from "@material-ui/core";
import DatePicker, { registerLocale } from "react-datepicker";

import ptBR from "date-fns/locale/pt-BR";
registerLocale("pt-br", ptBR);
const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(5, 0, 0),
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		marginBottom: 12,

	},

	settingOption: {
		marginLeft: "auto",
	},
	margin: {
		margin: theme.spacing(1),
	},
	tableCell: {
		borderBottom: "none", fontSize: "12", color: "#888E93", fontWeight: "400", padding: 0, margin: 0

	},
	inputDescription: {
		width: "100%",
		backgroundColor: "#F0F4F8", height: 119, borderRadius: 10,
		display: "flex",

		flexDirection: "column",

		padding: 10,
		fontSize: 15

	},
	datePickerTime: {
		width: 50,
		height: 20,
		fontSize: 16, border: "none", backgroundColor: "transparent",
		color: "#888E93"
	}

}));

const Settings = () => {
	const classes = useStyles();

	const [settings, setSettings] = useState([]);

	const [openingHours, setOpeningHours] = useState({

		message: "",
		days: [
			{
				index: 0,
				label: "Domingo",
				open: true,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			},
			{
				index: 1,
				label: "Segunda",
				open: true,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			},
			{
				index: 2,
				label: "Terça",
				open: false,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			},
			{
				index: 3,
				label: "Quarta",
				open: false,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			},
			{
				index: 4,
				label: "Quinta",
				open: false,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			},
			{
				index: 5,
				label: "Sexta",
				open: false,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			},
			{
				index: 6,
				label: "Sábado",
				open: false,
				start1: new Date(),
				end1: new Date(),
				start2: new Date(),
				end2: new Date()
			}
		]

	})

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const { data } = await api.get("/settings");
				setSettings(data);
			} catch (err) {
				toastError(err);
			}
		};
		fetchSession();
	}, []);

	useEffect(() => {
		const socket = openSocket();

		socket.on("settings", data => {
			if (data.action === "update") {
				setSettings(prevState => {
					const aux = [...prevState];
					const settingIndex = aux.findIndex(s => s.key === data.setting.key);
					aux[settingIndex].value = data.setting.value;
					return aux;
				});
			}
		});

		return () => {
			socket.disconnect();
		};
	}, []);


	const handleDate = (date, index, period) => {

		var prevState = openingHours;

		switch (period) {
			case 'start1': prevState.days[index].start1 = date;
				break;
			case 'end1': prevState.days[index].end1 = date;
				break;
			case 'start2': prevState.days[index].start1 = date;
				break;
			case 'end2': prevState.days[index].end2 = date;
				break;
			default:
				break;

		}


		setOpeningHours(prevState)
		console.log(openingHours)


	}

	const handleChangeSetting = async e => {
		const selectedValue = e.target.value;
		const settingKey = e.target.name;

		try {
			await api.put(`/settings/${settingKey}`, {
				value: selectedValue,
			});
			toast.success(i18n.t("settings.success"), {
				style: {
					backgroundColor: "#D4EADD",
					color: "#64A57B"
				}

			});
		} catch (err) {
			toastError(err);
		}
	};

	const getSettingValue = key => {
		const { value } = settings.find(s => s.key === key);
		return value;
	};

	return (
		<div className={classes.root}>
			<Container className={classes.container}>
				<Typography variant="body2" gutterBottom>
					{i18n.t("settings.title")}
				</Typography>
				<Paper className={classes.paper} elevation={0}>
					<div style={{ width: "50%" }}>
						<Typography variant="body1">
							{i18n.t("settings.settings.userCreation.name")}
						</Typography>
						<Select
							margin="dense"
							variant="outlined"
							native
							id="userCreation-setting"
							name="userCreation"
							value={
								settings && settings.length > 0 && getSettingValue("userCreation")
							}
							className={classes.settingOption}
							onChange={handleChangeSetting}
						>
							<option value="enabled">
								{i18n.t("settings.settings.userCreation.options.enabled")}
							</option>
							<option value="disabled">
								{i18n.t("settings.settings.userCreation.options.disabled")}
							</option>
						</Select>
					</div>

					<TextField
						style={{ width: "50%" }}
						id="api-token-setting"
						readOnly
						label="Token Api"
						margin="dense"
						variant="outlined"
						fullWidth
						value={settings && settings.length > 0 && getSettingValue("userApiToken")}
					/>

				</Paper>

				<Grid item lg={12} xs={12}>
					<TableContainer component={Paper} elevation={0} style={{ padding: 13 }}>
						<Table  >
							<TableHead>
								<TableRow>
									<TableCell className={classes.tableCell} style={{ paddingLeft: 60, paddingBottom: 10, paddingTop: 10 }}>Horário de Funcionamento</TableCell>

								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCell}>Dias da semana</TableCell>
									<TableCell className={classes.tableCell} align="center">Aberto</TableCell>
									<TableCell className={classes.tableCell} align="center">Início</TableCell>
									<TableCell className={classes.tableCell} align="center">Final</TableCell>
									<TableCell className={classes.tableCell} align="center">Início</TableCell>
									<TableCell className={classes.tableCell} align="center">Final</TableCell>

								</TableRow>
							</TableHead>
							<TableBody >
								{openingHours.days.map((day, i) => (
									<TableRow
										key={i}
										style={i % 2 === 0 ? {} : { backgroundColor: "#F5F5F5" }}
									>
										<TableCell component="th" scope="row" style={{ borderBottom: "none", padding: 3 }}>

											<ListItem>
												<ListItemAvatar>
													<Avatar>

														{day.label.charAt(0)}
													</Avatar>
												</ListItemAvatar>
												<ListItemText className={classes.tableCell} primary={day.label} secondary="" />
											</ListItem>

										</TableCell>
										<TableCell align="center" className={classes.tableCell}><Checkbox defaultChecked={day.open} /></TableCell>
										<TableCell align="center" className={classes.tableCell}>


											<DatePicker
												className={classes.datePickerTime}
												locale="pt-br"
												showTimeSelect
												timeFormat="HH:mm"
												selected={openingHours.days[day.index].start1}
												
												onChange={(date) => handleDate(date, day.index, "start1")}
												showTimeSelectOnly
												timeIntervals={15}
												timeCaption="Time"
												dateFormat="hh:mm"
											/>



										</TableCell>
										<TableCell align="center" className={classes.tableCell}>
											<DatePicker
												className={classes.datePickerTime}
												locale="pt-br"
												showTimeSelect
												timeFormat="HH:mm"
												selected={day.end1}
												// onChange={(date) => setStartDate(date)}

												showTimeSelectOnly
												timeIntervals={15}
												timeCaption="Time"
												dateFormat="hh:mm"
											/>
										</TableCell>
										<TableCell align="center" className={classes.tableCell}>	<DatePicker
											className={classes.datePickerTime}
											locale="pt-br"
											showTimeSelect
											timeFormat="HH:mm"
											selected={day.start2}
											// onChange={(date) => setStartDate(date)}

											showTimeSelectOnly
											timeIntervals={15}
											timeCaption="Time"
											dateFormat="hh:mm"
										/></TableCell>
										<TableCell align="center" className={classes.tableCell}>	<DatePicker
											className={classes.datePickerTime}
											locale="pt-br"
											showTimeSelect
											timeFormat="HH:mm"
											selected={day.end2}
											// onChange={(date) => setStartDate(date)}

											showTimeSelectOnly
											timeIntervals={15}
											timeCaption="Time"
											dateFormat="hh:mm"
										/></TableCell>

									</TableRow>
								))}





							</TableBody>

						</Table>


						<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 0, marginTop: 50 }}>
							<Typography variant="subtitle1" >Mensagem de ausência</Typography>
							<TextField defaultValue={openingHours.message}

								onChange={(e) => {
									setOpeningHours({ ...openingHours, message: e.target.value })
									console.log(openingHours)

								}}

								InputProps={{ disableUnderline: true, className: classes.inputDescription, }} placeholder={i18n.t("scheduleModal.labels.description")} fullWidth multiline style={{ width: "100%", height: 145, backgroundColor: "#F0F4F8" }} />
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 13 }}>
								<Button style={{ width: 320, height: 44, borderRadius: 23, backgroundColor: "#FE517B", color: "#fff" }} >Salvar horário</Button>
							</div>

						</div>

					</TableContainer>
				</Grid>

			</Container>
		</div>
	);
};

export default Settings;
