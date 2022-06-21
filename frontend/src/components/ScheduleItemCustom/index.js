
import React from 'react'
import Paper from "@material-ui/core/Paper";
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography'
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


    const parseInitialDate = (date) => {
        var currentdate = date;
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + " " ;
          
        return datetime;
    }
    const parseEndDate = (date) => {
        var currentdate = date;
        var datetime = currentdate.getHours() + ":"
            + currentdate.getMinutes() ;
           
        return datetime;
    }
    return (
        <Paper elevation={0} className={classes.scheduleContainer}>
            <ListItemText


                style={{ padding: 3 }}
                primary={
                    <div className={classes.schedulePrimary} >
                        <Typography
                            onClick={() => openDetailsModal(scheduled)}
                            component="span"
                            variant="subtitle2"
                            color="text.primary"
                            style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignContent: "center", margin: 0, padding: 0 }}
                        >
                            meeting: {scheduled.title}
                        </Typography>
                        <IconButton
                            size="5"
                            variant="outlined"
                            color="primary"
                            style={{ padding: 0, margin: 0 }}
                            onClick={() => openCancelModal(scheduled)}
                        >
                            <DeleteSweep style={{ color: "#888E93" }} />
                        </IconButton>

                    </div>
                }

                secondary={
                    <div className={classes.scheduleSecondary} onClick={() => openDetailsModal(scheduled)}>
                        <Typography

                            component="span"
                            variant="caption"
                            color="text.primary"
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
                            color="text.primary"
                        >
                            <LocationOnIcon style={{ fontSize: 13 }} />
                            {scheduled.locale}
                        </Typography>



                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", padding: 2 }}>
                            <Typography
                                // sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                                color="text.primary"
                            >
                                Responsável:  <strong>{scheduled?.anfitriao?.name}</strong>
                            </Typography>
                            <Chip label="Confirmado" size="small" style={{ backgroundColor: "#D4EADD", color: "#64A57B" }} />

                        </div>


                    </div>


                }
            />
        </Paper>
    )
}

export default ScheduleItemCustom;