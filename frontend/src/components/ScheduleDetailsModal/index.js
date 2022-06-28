import React, { useContext, useState } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from "@material-ui/core/styles";
import ScheduleModal from "../ScheduleModal/index";

import Chip from '@material-ui/core/Chip';
import { AuthContext } from '../../context/Auth/AuthContext';
const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center"

    },
    container: {
        width: 400, height: 650, padding: 10,
        backgroundColor: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto", borderRadius: 5
    },
    row: {
        width: "100%",
        display: "flex", flexDirection: "row"

    },
    button: {
        width: 320,
        height: 44,
        borderRadius: 23,
        backgroundColor: "#FE517B",
        color: "#fff", margin: 20
    }, body: {
        height: "100%", width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }, chip: {
        margin: 2
    }



}));


const ScheduledDetailsModal = ({ handleClose, openStatus, value, callback }) => {
    const classes = useStyles();
    const [scheduleModal, setScheduleModal] = useState(false);
    const [scheduled, setScheduled] = useState({})
    const { user } = useContext(AuthContext)
    const handleCloseModal = () => {
        handleClose();
    }
    const handleOpenScheduleModal = () => {
        setScheduled(value)
        handleClose();

        setScheduleModal(true)
    }
    const handleClosedScheduleModal = () => {
        setScheduleModal(false)

    }

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
            + currentdate.getMinutes();

        return datetime;
    }


    return (
        <div>
            <Modal

                open={openStatus}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modal}
            >
                <div className={classes.container}>
                    <div className={classes.body}>
                        <Typography variant="h5" align='center' gutterBottom ><strong>Detalhamento</strong> </Typography>

                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Título:</strong>  {value?.title}</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Anfitrião:</strong> {value?.anfitriao?.name}</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Criador do evento:</strong>  {value?.user?.name || "Alex raul"}</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Data:</strong>    {

                                parseInitialDate(new Date(value.startDate))
                            }
                                -
                                {parseEndDate(new Date(value.endDate))}</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" style={{ marginRight: 10 }} ><strong>Recorrência:</strong>  {value?.recorrency === 1 ? "Apenas uma vez" : value.recorrency === 2 ? "Semanalmente" : "Mensalmente"}</Typography><Typography variant="subtitle1" ><strong>Prioridade:</strong>  {value.level === 1 ? "Baixa" : value.level === 2 ? "Média" : "Alta"}</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Local:</strong>  {value?.typeEvent === 1 ? "Local" : "Online"} - {value?.locale}</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Descrição:</strong>  {value?.description} </Typography>
                        </div>
                        <div >

                            <Typography variant="subtitle1" ><strong>Participantes:</strong> </Typography>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {value?.externals ? value.externals.map((e) => {
                                    return <Chip className={classes.chip} label={e.name} key={e.id} />
                                }) : null


                                }

                                {value?.attendants ? value?.attendants.map((e) => {
                                    return <Chip className={classes.chip} label={e.name} key={e.id} />
                                }) : null


                                }

                            </div>

                        </div>
                        <div >

                            <Typography variant="subtitle1" ><strong>Notificação:</strong> {value?.notificationType?.includes(1) ? " Whatsapp " : ""}{value?.notificationType?.includes(2) ? " Email " : ""} </Typography>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {value?.datesNotify ? value.datesNotify.map((e, i) => {
                                    return <Chip className={classes.chip} label={parseInitialDate(new Date(e))} key={i} />
                                }) : null
                                }
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            {value?.user?.id === user?.id || value?.anfitriao?.id ===user.id ? <Button onClick={() => handleOpenScheduleModal()} className={classes.button}>Editar agendamento</Button> : null}

                        </div>
                    </div>
                </div>
            </Modal>
            <ScheduleModal openStatus={scheduleModal} handleClose={handleClosedScheduleModal} scheduled={scheduled} callback={callback} />
        </div>
    );
}
export default ScheduledDetailsModal;