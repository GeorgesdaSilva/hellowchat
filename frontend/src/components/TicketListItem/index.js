import React, { useState, useEffect, useRef, useContext, useCallback } from "react";

import { useHistory, useParams } from "react-router-dom";
import { parseISO, format, isSameDay } from "date-fns";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import ButtonWithSpinner from "../ButtonWithSpinner";
import MarkdownWrapper from "../MarkdownWrapper";
import { Tooltip } from "@material-ui/core";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";

const useStyles = makeStyles(theme => ({
	ticket: {
		position: "relative",
		borderRadius: 10

	},

	pendingTicket: {
		cursor: "unset",

	},

	noTicketsDiv: {
		display: "flex",
		height: "100px",
		margin: 40,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},

	noTicketsText: {
		textAlign: "center",
		color: "rgb(104, 121, 146)",
		fontSize: "14px",
		lineHeight: "1.4",
	},

	noTicketsTitle: {
		textAlign: "center",
		fontSize: "16px",
		fontWeight: "600",
		margin: "0px",
	},

	contactNameWrapper: {
		display: "flex",
		justifyContent: "space-between",

	},

	lastMessageTime: {
		justifySelf: "flex-end",
	},

	closedBadge: {
		alignSelf: "center",
		justifySelf: "flex-end",
		marginRight: 42,
		marginLeft: "auto",
	},

	contactLastMessage: {
		paddingRight: 20,
	},

	newMessagesCount: {
		alignSelf: "center",
		marginRight: 8,
		marginLeft: "auto",
	},

	badgeStyle: {
		color: "white",
		backgroundColor: green[500],
	},

	acceptButton: {
		marginLeft: 5
	},

	ticketQueueColor: {
		flex: "none",
		width: "8px",
		height: "100%",
		position: "absolute",
		top: "0%",
		left: "0%",
	},

	userTag: {
		position: "absolute",
		marginRight: 5,
		right: 5,
		bottom: 5,
		color: "#ffffff",
		border: "1px solid #CCC",
		padding: 1,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 10,
		fontSize: "0.9em",
		background: "#fe527a"
	},
	markdown: {
		display: "flex",
		flexDirection: "column",
		padding: 0,
		margin: 0

	},
	markdownLabel: {
		margin: 0,
		padding: 0
	},
	markdownTime: {
		margin: 0,
		padding: 0,
		// color: "#2AB912"
	},
	green: {
		color: "#2AB912"
	},
	yellow: {
		color: "#FBA72A"
	},
	red: {
		color: "#FB2A2A"
	}
}));

const TicketListItem = ({ ticket }) => {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const { ticketId } = useParams();
	const isMounted = useRef(true);
	const { user } = useContext(AuthContext);
	const [timePending, setTimePending] = useState(0);


	const timeTicket = useCallback(() => {

		var timeTicketPendind;
		if (timePending <= 0) {


			var startDate = new Date();

			var endDate = new Date(ticket.durationDate);

			var diff = (endDate.getTime() - startDate.getTime()) / 1000;
			diff /= 60;
			timeTicketPendind = Math.abs(Math.round(diff));

			setTimePending(timeTicketPendind);
		} else {
			setInterval(() => {


				var startDate = new Date();

				var endDate = new Date(ticket.durationDate);

				var diff = (endDate.getTime() - startDate.getTime()) / 1000;
				diff /= 60;
				timeTicketPendind = Math.abs(Math.round(diff));

				setTimePending(timeTicketPendind);
			}, 60000)
		}


		// var hours = Math.floor(totalMinutes / 60);
		// var minutes = totalMinutes % 60;


	}, [timePending, ticket.durationDate]
	)


	useEffect(() => {
		timeTicket();
		return () => {
			isMounted.current = false;

		};
	}, [timeTicket]);



	const handleAcepptTicket = async id => {
		setLoading(true);
		try {
			await api.put(`/tickets/${id}`, {
				status: "open",
				userId: user?.id,
			});
		} catch (err) {
			setLoading(false);
			toastError(err);
		}
		if (isMounted.current) {
			setLoading(false);
		}
		history.push(`/tickets/${id}`);
	};

	const handleSelectTicket = id => {
		history.push(`/tickets/${id}`);
	};

	return (
		<React.Fragment key={ticket.id}>
			<ListItem
				dense
				button
				onClick={e => {
					if (ticket.status === "pending") return;
					handleSelectTicket(ticket.id);
				}}
				selected={ticketId && +ticketId === ticket.id}
				className={clsx(classes.ticket, {
					[classes.pendingTicket]: ticket.status === "pending",
				})}
			>
				<Tooltip
					arrow
					placement="right"

					title={ticket.queue?.name || "Sem fila"}
				>
					<span
						style={{ backgroundColor: ticket.queue?.color || "#7C7C7C", borderRadius: "10px 0px 0px 10px" }}
						className={classes.ticketQueueColor}
					></span>
				</Tooltip>
				<ListItemAvatar>
					<Avatar src={ticket?.contact?.profilePicUrl} />
				</ListItemAvatar>
				<ListItemText
					disableTypography
					primary={
						<span className={classes.contactNameWrapper}>
							<Typography
								noWrap
								component="span"
								variant="body2"
								color="textPrimary"
							>
								{ticket.contact.name}
							</Typography>
							{ticket.status === "closed" && (
								<Badge
									className={classes.closedBadge}
									badgeContent={ticket.userId?"closed":"Notifica????o"}
									color="primary"

								/>
							)}
							{ticket.lastMessage && (
								<Typography
									className={classes.lastMessageTime}
									component="span"
									variant="body2"
									color="textSecondary"
								>
									{isSameDay(parseISO(ticket.updatedAt), new Date()) ? (
										<>{format(parseISO(ticket.updatedAt), "HH:mm")}</>
									) : (
										<>{format(parseISO(ticket.updatedAt), "dd/MM/yyyy")}</>
									)}
								</Typography>
							)}
							{ticket.whatsappId && (
								<div className={classes.userTag} title={i18n.t("ticketsList.connectionTitle")} >{ticket.whatsapp?.name}</div>
							)}
						</span>
					}
					secondary={
						<span className={classes.contactNameWrapper}>
							<Typography
								className={classes.contactLastMessage}
								noWrap
								component="span"
								variant="body2"
								color="textSecondary"
							>
								{ticket.lastMessage ? (

									<div className={classes.markdown}>
										<MarkdownWrapper>{ticket.lastMessage}</MarkdownWrapper>
										<p className={classes.markdownLabel}> {

											ticket.status === "open" ? i18n.t("ticketsList.timeTicketOpen") : null || ticket.status === "pending" ? i18n.t("ticketsList.timeTicketPending") : null

										} <strong className={(classes.markdownTime, timePending <= 5 ? classes.green : timePending > 5 && timePending < 10 ? classes.yellow :  classes.red)}  >
												{ticket.status === "pending" || ticket.status === "open" ? `${timePending} min` : null}


											</strong>
											{ticket.status === "pending" && (
												<ButtonWithSpinner
													color="primary"
													variant="contained"
													className={classes.acceptButton}
													size="small"
													loading={loading}
													onClick={e => handleAcepptTicket(ticket.id)}
												>
													{i18n.t("ticketsList.buttons.accept")}
												</ButtonWithSpinner>
											)}
										</p>


									</div>

								) : (
									<div className={classes.markdown}>

										<p className={classes.markdownLabel}> {

											ticket.status === "open" ? i18n.t("ticketsList.timeTicketOpen") : null || ticket.status === "pending" ? i18n.t("ticketsList.timeTicketPending") : null

										} <strong className={(classes.markdownTime, timePending <= 5 ? classes.green : timePending > 5 && timePending < 10 ? classes.yellow : classes.red)} >
												{ticket.status === "pending" || ticket.status === "open" ? `${timePending} min` : null}


											</strong>
											{ticket.status === "pending" && (
												<ButtonWithSpinner
													color="primary"
													variant="contained"
													className={classes.acceptButton}
													size="small"
													loading={loading}
													onClick={e => handleAcepptTicket(ticket.id)}
												>
													{i18n.t("ticketsList.buttons.accept")}
												</ButtonWithSpinner>
											)}
										</p>

									</div>
								)}
							</Typography>

							<Badge
  overlap="rectangular"
								className={classes.newMessagesCount}
								badgeContent={ticket.unreadMessages}
								classes={{
									badge: classes.badgeStyle,
								}}
							/>
						</span>
					}
				/>

			</ListItem>
			<Divider variant="inset" component="li" />
		</React.Fragment>
	);
};

export default TicketListItem;
