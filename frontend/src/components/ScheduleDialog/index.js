import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Add from '@material-ui/icons/Add';
import DatePicker from "react-datepicker";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "react-datepicker/dist/react-datepicker.css";
const steps = ['Dados de Agendamento', 'Participantes'];
const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center"

    },
    stepperHeader: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    input: {

        backgroundColor: "#F0F4F8", height: 44, borderRadius: 10,
        fontSize: 15,
        padding: 5

    },
    inputDescription: {
        width: "100%",
        backgroundColor: "#F0F4F8", height: 119, borderRadius: 10,
        display: "flex",

        flexDirection: "column",

        padding: 5,
        fontSize: 15

    },
    button: {
        width: 320,
        height: 44,
        borderRadius: 23,
        backgroundColor: "#FE517B",
        color: "#fff"

    },
    container: {
        backgroundColor: "#fff", height: "90%", width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5
    },
    gridRow: {
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20
    },
    checkbox: {

        transform: "scale(0.7)"

    },
    gridButton: {
        display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row"
    },
    datePicker: {
        width: "100%", backgroundColor: "#F0F4F8", height: 44, borderRadius: 10,
        border: "none", textAlign: "center"
    }


}));

const ScheduleDialog = ({ handleClose, openStatus }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [startDate, setStartDate] = useState(
        new Date()
    );
    const [endDate, setEndDate] = useState(
        new Date()
    );
    const [users, setUsers] = React.useState([]);
    const [participantes, setParticipantes] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [typeEvent, setTypeEvent] = React.useState(1);
    const [recorrencia, setRecorrencia] = React.useState(1);
    const [level, setLevel] = React.useState(1);
    const [notificationType, setNotificationType] = React.useState([]);
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',

    ];
    const addNotification = (id) => {
        if (notificationType.includes(id)) {
            var removeTypeNotification = notificationType;
            const index = removeTypeNotification.indexOf(id);
            if (index > -1) {
                removeTypeNotification.splice(index, 1);
            }
            setNotificationType([...removeTypeNotification])
        } else {
            setNotificationType([...notificationType, id])
        }

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloset = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const handleChangeUsers = (event) => {
        const {
            target: { value },
        } = event;
        setUsers(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeParticipantes = (event) => {
        const {
            target: { value },
        } = event;
        setParticipantes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };
    return (
        <div>
            <Modal

                open={openStatus}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modal}
            >
                <Container maxWidth="sm" style={{ height: "90%", width: "100%" }}>
                    <Stepper activeStep={activeStep} className={classes.stepperHeader}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>

                                </Step>
                            );
                        })}
                    </Stepper>
                    {/* step dados de agendamento */}
                    {activeStep === 0 ?
                        <Grid container className={classes.container}>

                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={11} >
                                    <Typography variant="subtitle1" ><strong>Detalhes</strong></Typography>
                                    <TextField InputProps={{ disableUnderline: true, className: classes.input }} placeholder="Tópico" fullWidth />

                                </Grid>
                            </Grid>
                            <Grid container className={classes.gridRow}>
                                <Grid item xs={5} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: "center" }} >
                                    <Grid item xs={12} >

                                        <DatePicker

                                            className={classes.datePicker}
                                            selected={startDate}
                                            onChange={(date) => {

                                                setStartDate(date)
                                                setEndDate(date)
                                            }}
                                            locale="pt-BR"
                                            showTimeSelect
                                            timeFormat="HH:mm"

                                            timeIntervals={10}
                                            timeCaption="Horas"
                                            dateFormat="d MMMM yyyy h:mm aa"
                                            filterTime={filterPassedTime}
                                        />

                                    </Grid>
                                </Grid>
                                <Grid item xs={1} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Typography variant='subtitle2' style={{ textAlign: "center" }}>Até</Typography>
                                </Grid>

                                <Grid item xs={5} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                                    <Grid item xs={12} >
                                        <DatePicker
                                            className={classes.datePicker}
                                            selected={endDate}

                                            onChange={(date) => setEndDate(date)}
                                            locale="pt-BR"
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={10}
                                            timeCaption="Horas"
                                            dateFormat="d MMMM yyyy h:mm aa"
                                            filterTime={filterPassedTime}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.gridRow} style={{ justifyContent: "center", alignItems: "flex-start" }}>

                                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" ><strong>Tipo de evento</strong></Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={typeEvent === 1} className={classes.checkbox} onChange={() => setTypeEvent(1)} />} label={<Typography variant='caption'>local</Typography>} style={{ height: 20, }} />
                                        <FormControlLabel control={<Checkbox checked={typeEvent === 2} className={classes.checkbox} onChange={() => setTypeEvent(2)} />} label={<Typography variant='caption'>Online</Typography>} style={{ height: 20 }} />
                                    </FormGroup>

                                </Grid>

                                <Grid item xs={3} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" ><strong>Recorrência</strong></Typography>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox checked={recorrencia === 1} onChange={() => setRecorrencia(1)} className={classes.checkbox} />} label={<Typography variant='caption'>Apenas uma vez</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={recorrencia === 2} onChange={() => setRecorrencia(2)} className={classes.checkbox} />} label={<Typography variant='caption'>Semanal</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={recorrencia === 3} onChange={() => setRecorrencia(3)} className={classes.checkbox} />} label={<Typography variant='caption'>Mensal</Typography>} style={{ height: 20 }} />

                                    </FormGroup>

                                </Grid>
                                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" ><strong>Prioridade</strong></Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={level === 1} onChange={() => setLevel(1)} className={classes.checkbox} />} label={<Typography variant='caption'>Baixo</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={level === 2} onChange={() => setLevel(2)} className={classes.checkbox} />} label={<Typography variant='caption'>Médio</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={level === 3} onChange={() => setLevel(3)} className={classes.checkbox} />} label={<Typography variant='caption'>Alto</Typography>} style={{ height: 20 }} />
                                    </FormGroup>
                                </Grid>


                                <Grid item xs={12} className={classes.gridRow}>
                                    <Grid item xs={11} >

                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} placeholder="Adicionar local" fullWidth />

                                    </Grid>

                                </Grid>

                                <Grid item xs={12} className={classes.gridRow}>
                                    <Grid item xs={11} >
                                        <Typography variant="subtitle1" ><strong>Descrição</strong></Typography>
                                        <TextField InputProps={{ disableUnderline: true, className: classes.inputDescription, }} placeholder="Descrição do Agendamento exemplo Pauta 
de reunião, Descrição de consulta"  fullWidth multiline />

                                    </Grid>

                                </Grid>

                                <Grid item xs={12} className={classes.gridRow} style={{ marginBottom: 30 }}>
                                    <Grid item xs={11} style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row" }}>
                                        <Button className={classes.button} onClick={() => handleNext()}>
                                            Ir para participantes <ArrowRightAltIcon style={{ paddingLeft: 5, fontSize: 35 }} /></Button>

                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid> :
                        // step participantes
                        <Grid className={classes.container}>

                            <Grid item xs={12} className={classes.gridRow} style={{ marginTop: 0 }}>
                                <Grid item xs={11} style={{ marginTop: 20 }} >
                                    <Typography variant="subtitle1" ><strong>Anfitrião</strong></Typography>
                                    <FormControl style={{ height: 44, width: "100%" }} className={classes.input}>

                                        <Select
                                            style={{ height: "100%" }}
                                            fullWidth
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={users}
                                            onChange={handleChangeUsers}
                                            disableUnderline
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}

                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}

                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>


                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={11} >
                                    <Typography variant="subtitle1" ><strong>Participantes</strong></Typography>
                                    <FormControl style={{ height: 44, width: "100%" }} className={classes.input}>

                                        <Select
                                            style={{ height: "100%" }}
                                            fullWidth
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={participantes}
                                            onChange={handleChangeParticipantes}

                                            disableUnderline
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}

                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}

                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={10} >
                                    <Typography variant="subtitle1" ><strong>Participantes externos</strong></Typography>
                                    <FormControl style={{ height: 44, width: "100%" }} className={classes.input}>

                                        <Select
                                            style={{ height: "100%" }}
                                            fullWidth
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={users}
                                            onChange={handleChangeUsers}

                                            disableUnderline
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}

                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}

                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                        <DialogTitle>Fill the form</DialogTitle>

                                        <DialogActions>
                                            <Button onClick={handleCloset}>Cancel</Button>
                                            <Button onClick={handleCloset}>Ok</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                                <Grid item xs={1} className={classes.gridRow}>
                                    <Button onClick={() => handleClickOpen()}>
                                        <Add style={{ paddingLeft: 5, fontSize: 35, color: "#FE517B" }} /></Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={11}>
                                    <Grid item xs={12} style={{ display: "flex", flexDirection: "column", marginBottom: 5 }} >
                                        <Typography variant="subtitle1" ><strong>Notificação</strong></Typography>
                                        <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                                            <FormControlLabel control={<Checkbox style={{
                                                transform: "scale(0.7)",
                                            }} checked={notificationType.includes(1)} onChange={() => addNotification(1)} />} label={<Typography variant='caption'>Whatsapp</Typography>} style={{ height: 25 }} />
                                            <FormControlLabel control={<Checkbox style={{
                                                transform: "scale(0.7)",
                                            }} checked={notificationType.includes(2)} onChange={() => addNotification(2)} />} label={<Typography variant='caption'>Email</Typography>} style={{ height: 25 }} />

                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <Grid item xs={4} style={{ marginRight: 5 }}>
                                            <DatePicker
                                                className={classes.datePicker}
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                locale="pt-BR"
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={10}
                                                timeCaption="Horas"
                                                dateFormat="d MMMM yyyy h:mm aa"
                                                filterTime={filterPassedTime}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button >
                                                <AddAlertIcon style={{ paddingLeft: 5, fontSize: 35, color: "#FE517B" }} /></Button>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <FormControl style={{ height: 44, width: "100%" }} className={classes.input}>

                                                <Select
                                                    style={{ height: "100%" }}
                                                    fullWidth
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={participantes}
                                                    onChange={handleChangeParticipantes}

                                                    disableUnderline
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} />
                                                            ))}
                                                        </Box>
                                                    )}

                                                >
                                                    {names.map((name) => (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}

                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={12} className={classes.gridRow} style={{ marginTop: 113 }}>
                                <Grid item xs={11} style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row" }}>
                                    <Button className={classes.button} onClick={() => handleBack()}>
                                        Salvar Agendamento</Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Container>
            </Modal>
        </div>
    );
}
export default ScheduleDialog;