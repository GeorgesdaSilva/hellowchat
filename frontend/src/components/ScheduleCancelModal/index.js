import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Clear from '@material-ui/icons/Clear';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import IconButton from '@material-ui/core/IconButton/IconButton';
import { i18n } from "../../translate/i18n";
const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column"
    },
    content: {
        width: "400px", height: "215px",
        backgroundColor: "#fff", borderRadius: 5,
        display: "flex", justifyContent: "space-around", alignContent: "center", flexDirection: "column"

    },
    buttonNotify: {
        width: 133, height: 44, backgroundColor: "#FE517B", color: "#fff", borderRadius: 23, margin: 3, textTransform: "none"

    },
    buttonNotNotify: {
        width: 133, height: 44, backgroundColor: "#fff", color: "#FE517B", borderRadius: 23, border: "1px solid #FE517B", margin: 3, textTransform: "none"
    },
    row: {
        width: "100%", display: "flex", justifyContent: "flex-end", alignContent: "center"
    }, bodyText: {
        display: "flex", flexDirection: "column", marginLeft: 20, marginRight: 20
    }, IconButton: {
        color: "#888E93"
    }, groupButtons: {
        display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row", marginBottom: 25, marginTop: 10
    }


}));


const ScheduleCancelModal = ({ handleClose, openStatus, id }) => {
    const classes = useStyles();


    const handleCloseModal = () => {
        handleClose();
    }
    const remove = () => {

        alert(id)
    }
    return (
        <>
            <Modal

                open={openStatus}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modal}
            >
                <div className={classes.content}>

                    <div className={classes.row}>
                        <IconButton onClick={() => handleCloseModal()}> <Clear className={classes.IconButton} /></IconButton>
                    </div>
                    <div className={classes.bodyText}>
                        <Typography variant="h6" align='center'>
                            {i18n.t("scheduleCancelModal.title")}
                        </Typography>
                        <Typography variant="subtitle1" align='center'>
                            {i18n.t("scheduleCancelModal.subtitle")}

                        </Typography>
                    </div>
                    <div className={classes.groupButtons}>
                        <Button className={classes.buttonNotify} onClick={() => remove()}>  {i18n.t("scheduleCancelModal.groupButtons.yesNotify")} </Button>
                        <Button className={classes.buttonNotNotify} onClick={() => remove()}>{i18n.t("scheduleCancelModal.groupButtons.notNotify")}</Button>
                    </div>



                </div>

            </Modal>
        </>
    );
}
export default ScheduleCancelModal;