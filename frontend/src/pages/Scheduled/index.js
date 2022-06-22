import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid/Grid'
import AddAlarm from '@material-ui/icons/AddAlarm';
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import ScheduleModal from "../../components/ScheduleModal"
import ScheduleCancelModal from "../../components/ScheduleCancelModal/index"
import ScheduledDetailsModal from "../../components/ScheduleDetailsModal";

import ScheduleItemCustom from "../../components/ScheduleItemCustom";
import InputAdornment from '@material-ui/core/InputAdornment';
import './css/calendarStyle.css';
import Search from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    container: {
        width: "100%", height: "100%",
        padding: 20
    },
    calendar: {

        width: "100%",
        height: "100%",

    },
    input: {

        backgroundColor: "#F0F4F8", height: 44, borderRadius: 10,
        fontSize: 15,


    },

    scheduleEmpty: {
        display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 150
    },
    scheduleItemContainer: {
        borderRadius: 5, height: "90%", padding: 20, backgroundColor: "#fff",
    },
    scheduleHeader: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", marginTop: 20
    }, titleSchedule: {
        display: "flex", flexDirection: "column", justifyContent: "center"
    },
    list: {
        height: "82%", overflowY: "auto"
    }


}))
const Scheduled = () => {
    const classes = useStyles();
    const [date, onChange] = useState(new Date());

    const [scheduleModal, setScheduleModal] = useState(false);

    const [scheduleCancelModal, setScheduleCancelModal] = useState(false);
    const [scheduleDetailsModal, setScheduleDetailsModal] = useState(false);
    const [search, setSearch] = useState("");
    const [scheduled, setScheduled] = useState({});
    const [scheduleds, setScheduleds] = useState([]);
    const handleOpenScheduleModal = () => {

        setScheduleModal(true)
    }
    const handleClosedScheduleModal = () => {
        setScheduleModal(false)
    }
    const handleOpenScheduleCancelModal = (scheduled) => {
        setScheduled(scheduled)
        setScheduleCancelModal(true)
    }
    const handleClosedScheduleCancelModal = () => {
        setScheduleCancelModal(false)
    }
    const handleOpenScheduleDetailsModal = (scheduled) => {
        setScheduled(scheduled)
        setScheduleDetailsModal(true)
    }
    const handleClosedScheduleDetailsModal = () => {
        setScheduleDetailsModal(false)
    }

    const loadScheduleds = async () => {

        try {
            const result = await api.post("scheduleds/search", {
                date: date,

            });

            setScheduleds(result.data)

        } catch (err) {

            toastError(err);
        }
    }


    const searchBydate = (e) => {

        onChange(e)

    }


    useEffect(() => {
        const loadInitial = async () => {

            try {
                const result = await api.post("scheduleds/search", {
                    date: date,
                    searchParams:search

                });

                setScheduleds(result.data)

            } catch (err) {

                toastError(err);
            }
        }
        loadInitial()


    }, [date,search])
    return (


        <Grid container justifyContent='space-around' className={classes.container}>
            <Grid item lg={7} md={7} xs={12} style={{ borderRadius: 5, height: 400, }}>

                <Calendar onChange={(e) => { searchBydate(e) }} value={date} className={classes.calendar} />

            </Grid>
            <Grid item lg={4} md={4} xs={12} className={classes.scheduleItemContainer}>

                <TextField value={search} onChange={(e) => setSearch(e.target.value)} fullWidth InputProps={{ disableUnderline: true, className: classes.input, startAdornment: <InputAdornment position="start"><IconButton><Search /></IconButton></InputAdornment>, endAdornment: <InputAdornment position="start"><IconButton onClick={() => setSearch('')}><CloseIcon /></IconButton></InputAdornment>, }} placeholder="Insira algo..." />
                <div className={classes.scheduleHeader}>
                    <Typography variant="h6" className={classes.titleSchedule}>Agendamentos</Typography><IconButton
                        size="10"
                        variant="outlined"
                        color="primary"

                        onClick={() => handleOpenScheduleModal()}

                    >
                        <AddAlarm />
                    </IconButton>
                </div>
                {scheduleds.length > 0 ? <List className={classes.list}>
                    {scheduleds.map((scheduled) => {
                        return <ScheduleItemCustom openCancelModal={handleOpenScheduleCancelModal} openDetailsModal={handleOpenScheduleDetailsModal} scheduled={scheduled} key={scheduled.id} />
                    })}



                </List> : <Typography variant="subtitle1" align='center' className={classes.scheduleEmpty}>Não há agendamentos para hoje.</Typography>

                }



            </Grid>
            <ScheduleCancelModal openStatus={scheduleCancelModal} handleClose={handleClosedScheduleCancelModal} value={scheduled} callback={loadScheduleds} />
            <ScheduleModal openStatus={scheduleModal} handleClose={handleClosedScheduleModal} callback={loadScheduleds} />
            <ScheduledDetailsModal openStatus={scheduleDetailsModal} handleClose={handleClosedScheduleDetailsModal} value={scheduled} callback={loadScheduleds} />
        </Grid>
    )
}


export default Scheduled;
