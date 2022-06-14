import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import Link from "@material-ui/core/Link";

import Avatar from "@material-ui/core/Avatar";

import Paper from "@material-ui/core/Paper";
import Edit from '@material-ui/icons/Edit';

import AddAlarm from '@material-ui/icons/AddAlarm';

import { i18n } from "../../translate/i18n";
import List from '@material-ui/core/List';


import ContactModal from "../ContactModal";
import ContactDrawerSkeleton from "../ContactDrawerSkeleton";
import ScheduleModal from "../ScheduleModal/index";
import ScheduleCancelModal from "../ScheduleCancelModal/index";
import ScheduledDetailsModal from "../ScheduleDetailsModal";
import { Grid } from "@material-ui/core";

import ScheduleItemCustom from "../ScheduleItemCustom";

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,

	},
	drawerPaper: {
		width: drawerWidth,
		display: "flex",
		borderTop: "1px solid rgba(0, 0, 0, 0.12)",
		borderRight: "1px solid rgba(0, 0, 0, 0.12)",
		borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		padding: 0,


	},
	header: {
		display: "flex",
		borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		backgroundColor: "#eee",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		minHeight: "73px",
		justifyContent: "flex-start",

	},
	content: {
		display: "flex",
		backgroundColor: "#eee",
		flexDirection: "column",
		padding: 0,
		height: "100%",
		overflowY: "scroll",
		...theme.scrollbarStyles,

	},

	contactAvatar: {
		margin: 15,
		width: 65,
		height: 65,
	},

	contactHeader: {
		display: "flex",
		padding: 8,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		"& > *": {
			margin: 4,
		},
	},

	contactDetails: {
		marginTop: 8,
		padding: 8,
		display: "flex",
		flexDirection: "column",
	},
	contactExtraInfo: {
		marginTop: 4,
		padding: 6,
	},
	contact: {
		justifyContent: "center", alignContent: "center", flexDirection: "column", display: "flex",
		padding: 2
	},


}));

const ContactDrawer = ({ open, handleDrawerClose, contact, loading }) => {
	const classes = useStyles();

	const [modalOpen, setModalOpen] = useState(false);
	const [scheduleModal, setScheduleModal] = useState(false);

	const [scheduleCancelModal, setScheduleCancelModal] = useState(false);
	const [scheduleDetailsModal, setScheduleDetailsModal] = useState(false);
	const [scheduledId, setScheduledId] = useState();

	const handleOpenScheduleModal = () => {
		
		setScheduleModal(true)
	}
	const handleClosedScheduleModal = () => {
		setScheduleModal(false)
	}
	const handleOpenScheduleCancelModal = (id) => {

		setScheduledId(id)
		setScheduleCancelModal(true)
	}
	const handleClosedScheduleCancelModal = () => {

		setScheduleCancelModal(false)
	}
	const handleOpenScheduleDetailsModal = (id) => {
		setScheduledId(id)
		setScheduleDetailsModal(true)
	}
	const handleClosedScheduleDetailsModal = () => {
		setScheduleDetailsModal(false)
	}
	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="right"
			open={open}
			PaperProps={{ style: { position: "absolute" } }}
			BackdropProps={{ style: { position: "absolute" } }}
			ModalProps={{
				container: document.getElementById("drawer-container"),
				style: { position: "absolute" },
			}}
			classes={{
				paper: classes.drawerPaper,
			}}
		>

			{loading ? (
				<ContactDrawerSkeleton classes={classes} />
			) : (
				<div className={classes.content}>
					<Paper square variant="outlined" className={classes.contactHeader} elevation={0}>

						<Grid container justifyContent="center" alignContent="center">
							<Grid item xs={12} style={{ display: "flex", flexDirection: "row" }}>	<IconButton onClick={handleDrawerClose}>
								<CloseIcon />
							</IconButton>
								<Typography style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column" }}>
									{i18n.t("contactDrawer.header")}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Avatar
									alt={contact.name}
									src={contact.profilePicUrl}
									className={classes.contactAvatar}
								></Avatar>
							</Grid>
							<Grid item xs={6} className={classes.contact} >
								<Typography>{contact.name}</Typography>
							</Grid>
							<Grid item xs={12} className={classes.contact} >
								<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
									<Typography variant="subtitle1">Sobre</Typography>
									<IconButton
										size="10"
										variant="outlined"
										color="primary"

										onClick={() => setModalOpen(true)}
									>
										<Edit />
									</IconButton>
								</Grid>

								<Typography variant="subtitle2" style={{ color: "#888E93" }}>Telefone: <Link href={`tel:${contact.number}`}>{contact.number}</Link></Typography>
								<Typography variant="subtitle2" style={{ color: "#888E93" }}>Email: {contact.email}</Typography>
								{contact?.extraInfo?.map(info => (

									<Typography variant="subtitle2" style={{ color: "#888E93" }} >
										{info.name}: {info.value}
									</Typography>

								))}

							</Grid>
							<Grid item xs={12} className={classes.contact} >
								<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
									<Typography variant="subtitle1" >Agendamentos</Typography>
									<IconButton
										size="10"
										variant="outlined"
										color="primary"

										onClick={() => handleOpenScheduleModal()}
									>
										<AddAlarm />
									</IconButton>
								</Grid>


								<List >


									{contact?.extraInfo?.map((info, i) => (
										<ScheduleItemCustom openCancelModal={handleOpenScheduleCancelModal} openDetailsModal={handleOpenScheduleDetailsModal} id={i} />
									))}


								</List>



							</Grid>

						</Grid>


					</Paper>

					<ContactModal
						open={modalOpen}
						onClose={() => setModalOpen(false)}
						contactId={contact.id}
					></ContactModal>

				</div>
			)}
			<ScheduleModal openStatus={scheduleModal} handleClose={handleClosedScheduleModal} />
			<ScheduleCancelModal openStatus={scheduleCancelModal} handleClose={handleClosedScheduleCancelModal} id={scheduledId} />

			<ScheduledDetailsModal openStatus={scheduleDetailsModal} handleClose={handleClosedScheduleDetailsModal} id={scheduledId}  />
		</Drawer>

	);
};

export default ContactDrawer;
