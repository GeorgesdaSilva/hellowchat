
import React, { useContext } from 'react'
import Paper from "@material-ui/core/Paper";
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography'
import { AuthContext } from '../../context/Auth/AuthContext';
const useStyles = makeStyles(theme => ({

    scheduleContainer: {
        backgroundColor: "#F0F4F8", borderLeft: "5px solid #D4EADD"
    },
    schedulePrimary: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", padding: 2
    }, scheduleSecondary: {
        display: "flex", flexDirection: "column", justifyContent: "flex-start"
    }
}))
const ScheduleItemCustom = ({ openDetailsModal, openCancelModal, scheduled }) => {
    const classes = useStyles();

    const { user } = useContext(AuthContext)
    const parseInitialDate = (date) => {
        var currentdate = date;
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + `${currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()} `;

        return datetime;
    }
    const parseEndDate = (date) => {
        var currentdate = date;
        var datetime = currentdate.getHours() + ":"
        + `${currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()} `;

        return datetime;
    }
    return (

        <Paper elevation={0} className={classes.scheduleContainer} style={
            scheduled.status === "open" ? { borderLeft: "5px solid #0D99FF" } : { borderLeft: "5px solid #D4EADD" }
        }>
            <ListItemText


                style={{ padding: 3 }}
                primary={
                    <div className={classes.schedulePrimary} >
                        <Typography
                            onClick={() => openDetailsModal(scheduled)}
                            component="span"
                            variant="subtitle2"

                            style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignContent: "center", margin: 0, padding: 0 }}
                        >
                            meeting: {scheduled.title}
                        </Typography>
                        {scheduled?.user?.id === user?.id || scheduled?.anfitriao?.id === user.id ?
                            <IconButton
                                size="medium"
                                variant="outlined"
                                color="primary"
                                style={{ padding: 0, margin: 0 }}
                                onClick={() => openCancelModal(scheduled)}
                            >
                                <DeleteSweep style={{ color: "#888E93" }} />
                            </IconButton> : null}

                    </div>
                }

                secondary={
                    <div className={classes.scheduleSecondary} onClick={() => openDetailsModal(scheduled)}>
                        <Typography

                            component="span"
                            variant="caption"

                        >
                            {

                                parseInitialDate(new Date(scheduled.startDate))
                            }
                            -
                            {parseEndDate(new Date(scheduled.endDate))}
                        </Typography>
                        <Typography

                            component="span"
                            variant="caption"

                        >
                            <LocationOnIcon style={{ fontSize: 13 }} />
                            {scheduled.locale}
                        </Typography>



                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", padding: 2 }}>
                            <Typography
                                // sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"

                            >
                                Responsável:  <strong>{scheduled?.anfitriao?.name}</strong>
                            </Typography>
                            <Chip label={scheduled.status === "open" ? "Pendente" : "Concluído"} size="small" style={scheduled.status === "open" ? { backgroundColor: "#0D99FF", color: "#fff" } : { backgroundColor: "#D4EADD", color: "#64A57B" }} />

                        </div>


                    </div>


                }
            />
        </Paper>
    )
}

export default ScheduleItemCustom;