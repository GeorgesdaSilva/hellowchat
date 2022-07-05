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

	const [openingHours, setOpeningHours] = useState({})




	const updateOpeningHours = async () => {
		const update = async () => {
			try {
				await api.put('/openingHours', {
					openingHours: openingHours
				});
				toast.success(i18n.t("settings.settings.openingHours.update"), {
					style: {
						backgroundColor: "#D4EADD",
						color: "#64A57B"
					}

				});

			} catch (err) {
				toastError(err);
			}
		};
		update();
	}
	useEffect(() => {

		const fetchOpeningHours = async () => {
			const update = async () => {
				try {
					const { data } = await api.get("/openinghours");


					setOpeningHours(data)
				} catch (err) {
					toastError(err);
				}
			};
			update();
		}

		const fetchSession = async () => {
			try {
				const { data } = await api.get("/settings");
				setSettings(data);
			} catch (err) {
				toastError(err);
			}
		};
		fetchSession();
		fetchOpeningHours();
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
								{openingHours?.days?.length ? openingHours?.days.map((day, i) => (
									<TableRow
										key={day.index}
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
										<TableCell align="center" className={classes.tableCell}>

											<Checkbox checked={day.open} onClick={() => {
												var newState = openingHours;
												newState.days[day.index].open = !day.open
												setOpeningHours({ ...newState })

											}} />

										</TableCell>
										<TableCell align="center" className={classes.tableCell}>


											<DatePicker
												className={classes.datePickerTime}
												locale="pt-br"
												showTimeSelect
												timeFormat="HH:mm"
												selected={new Date(day.start1)}

												onChange={(date) => {
													var newState = openingHours;
													newState.days[day.index].start1 = date
													setOpeningHours({ ...newState })
												}}
												showTimeSelectOnly
												timeIntervals={10}
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
												selected={new Date(day.end1)}
												onChange={(date) => {
													var newState = openingHours;
													newState.days[day.index].end1 = date
													setOpeningHours({ ...newState })
												}}
												showTimeSelectOnly
												timeIntervals={10}
												timeCaption="Time"
												dateFormat="hh:mm"
											/>
										</TableCell>

										<TableCell align="center" className={classes.tableCell}>	<DatePicker
											className={classes.datePickerTime}
											locale="pt-br"
											showTimeSelect
											timeFormat="HH:mm"
											selected={new Date(day.start2)}
											onChange={(date) => {
												var newState = openingHours;
												newState.days[day.index].start2 = date
												setOpeningHours({ ...newState })
											}}
											showTimeSelectOnly
											timeIntervals={10}
											timeCaption="Time"
											dateFormat="hh:mm"
										/></TableCell>

										<TableCell align="center" className={classes.tableCell}>	<DatePicker
											className={classes.datePickerTime}
											locale="pt-br"
											showTimeSelect
											timeFormat="HH:mm"
											selected={new Date(day.end2)}
											onChange={(date) => {
												var newState = openingHours;
												newState.days[day.index].end2 = date
												setOpeningHours({ ...newState })
											}}

											showTimeSelectOnly
											timeIntervals={10}
											timeCaption="Time"
											dateFormat="hh:mm"
										/></TableCell>

									</TableRow>
								)) : null}

							</TableBody>

						</Table>


						<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 0, marginTop: 50 }}>
							<Typography variant="subtitle1" >Mensagem de ausência</Typography>
							<TextField

								value={openingHours.message}
								onChange={(e) => {

									setOpeningHours({ ...openingHours, message: e.target.value })


								}}

								InputProps={{ disableUnderline: true, className: classes.inputDescription, }} placeholder={i18n.t("scheduleModal.labels.description")} fullWidth multiline style={{ width: "100%", height: 145, backgroundColor: "#F0F4F8" }} />
							<div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 13 }}>
								<Button style={{ width: 320, height: 44, borderRadius: 23, backgroundColor: "#FE517B", color: "#fff" }} onClick={() => updateOpeningHours()}>Salvar horário</Button>
							</div>

						</div>

					</TableContainer>
				</Grid>

			</Container>
		</div>
	);
};

export default Settings;
