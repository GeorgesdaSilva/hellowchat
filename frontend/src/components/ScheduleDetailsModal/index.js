import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import { makeStyles } from "@material-ui/core/styles";
import ScheduleModal from "../ScheduleModal/index";

import Chip from '@material-ui/core/Chip';
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
        height: "100%", width: "100%"
    }, chip: {
        margin: 2
    }



}));


const ScheduledDetailsModal = ({ handleClose, openStatus, value,callback }) => {
    const classes = useStyles();
    const [scheduleModal, setScheduleModal] = useState(false);
    
    const handleCloseModal = () => {
        handleClose();
    }
    const handleOpenScheduleModal = () => {

        handleClose();

        setScheduleModal(true)
    }
    const handleClosedScheduleModal = () => {
        setScheduleModal(false)

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

                            <Typography variant="subtitle1" ><strong>Título:</strong>  Apresentação de sistema</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Anfitrião:</strong>  Luan Rodrigues</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Data:</strong>  17/06/2022 12:10 - 17/06/2022 12:40</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" style={{ marginRight: 10 }} ><strong>Recorrência:</strong>  Apenas uma vez</Typography><Typography variant="subtitle1" ><strong>Prioridade:</strong>  Alta</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Local:</strong>  online - Google Meet</Typography>
                        </div>
                        <div className={classes.row}>

                            <Typography variant="subtitle1" ><strong>Descrição:</strong>  Lorem ipsum dolor sit amet. At temp
                                ore soluta At animi nostrum nam dolorum dicta.
                                Non ducimus provident et facere fugiat est iure
                                dolorem. Ut sequi mollitia a explicabo natus e </Typography>
                        </div>
                        <div >

                            <Typography variant="subtitle1" ><strong>Participantes:</strong> </Typography>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9,].map(() => {
                                    return <Chip className={classes.chip} label="teste" />
                                })

                                }

                            </div>

                        </div>
                        <div >

                            <Typography variant="subtitle1" ><strong>Notificação:</strong> whatsapp - Email</Typography>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {[1, 2, 3, 4, 5, 6].map(() => {
                                    return <Chip className={classes.chip} label="17/06/2022 13:50" />
                                })
                                }
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>

                            <Button onClick={() => handleOpenScheduleModal()} className={classes.button}>Editar agendamento</Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <ScheduleModal openStatus={scheduleModal} handleClose={handleClosedScheduleModal} value={value} callback={callback}/>
        </div>
    );
}
export default ScheduledDetailsModal;