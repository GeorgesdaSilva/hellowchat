import React, { useEffect } from 'react';
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
import ArrowBack from '@material-ui/icons/ArrowBack';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Add from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import DatePicker from "react-datepicker";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import "react-datepicker/dist/react-datepicker.css";
import ContactModal from '../ContactModal';
import api from "../../services/api";
import toastError from "../../errors/toastError";
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { i18n } from "../../translate/i18n";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
const steps = ['Dados de Agendamento', 'Participantes'];

const filter = createFilterOptions({
    trim: true,
});

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
        padding: 10

    },
    inputDescription: {
        width: "100%",
        backgroundColor: "#F0F4F8", height: 119, borderRadius: 10,
        display: "flex",

        flexDirection: "column",

        padding: 10,
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
        backgroundColor: "#fff", height: "90%", width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
        overflowY: "auto"
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
    },
    buttonBack: {
        color: "#FE517B",
        marginRight: 5
    }


}));


const ScheduleModal = ({ handleClose, openStatus }) => {
    var err = {
        response: {
            data: {
                message: ""
            }
        }

    }
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [startDate, setStartDate] = React.useState(
        new Date()
    );
    const [endDate, setEndDate] = React.useState(
        new Date()
    );
    const [users, setUsers] = React.useState([]);
    const [anfitriao, setAnfitriao] = React.useState([]);
    const [atendentes, setAtendentes] = React.useState([]);
    const [participantes, setParticipantes] = React.useState([]);

    const [topico, setTopico] = React.useState('');
    const [locale, setLocale] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [typeEvent, setTypeEvent] = React.useState(1);
    const [recorrencia, setRecorrencia] = React.useState(1);
    const [level, setLevel] = React.useState(1);
    const [notificationType, setNotificationType] = React.useState([1]);
    const [notifyDate, setNotifyDate] = React.useState(startDate);
    const [datesNotify, setDatesNotify] = React.useState([]);
    const [openContactModal, setOpenContactModal] = React.useState(false)
    const [options, setOptions] = React.useState([]);
    const [searchParam, setSearchParam] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [searchModal, setSearchModal] = React.useState(false);

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const handleOpenContactModal = () => {
        setOpenContactModal(true);

    }
    const handleOpenSearchModal = () => {
        setSearchModal(true);
    }
    const handleCloseSearchModal = () => {
        setSearchModal(false);
    }
    const handleCloseContactModal = () => {
        setOpenContactModal(false);
    }




    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (!topico) {
            err.response.data.message = "Insira o título";
            toastError(err);

        } else if (!locale) {
            err.response.data.message = "Insira o local da reunião";
            toastError(err);


        } else if (!description) {
            err.response.data.message = "Insira a descrição";
            toastError(err);



        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }


    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const saveSchedule = () => {
        let newSkipped = skipped;

        if (anfitriao.length <= 0) {
            err.response.data.message = "Insira um anfitrião da reunião";
            toastError(err);

        } else if (participantes.length <= 0) {
            err.response.data.message = "Insira algum usuário na reunião";
            toastError(err);


        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }


        var schedule = {


            'startdate': startDate,
            'endDate': endDate,
            'externos': users,
            'anfitriao': anfitriao,
            'participantes': participantes,
            'topico': topico,
            'locale': locale,
            'description': description,
            'typeEvent': typeEvent,
            'recorrencia': recorrencia,
            'nivel': level,
            'notificationType': notificationType,
            'datesNotify': datesNotify,
        }

        console.log(schedule)
    };



    const createAddContactOption = (filterOptions, params) => {
        const filtered = filter(filterOptions, params);

        if (params.inputValue !== "" && !loading && searchParam.length >= 3) {
            filtered.push({
                name: `${params.inputValue}`,
            });
        }

        return filtered;
    };

    const renderOption = option => {
        if (option.number) {
            return `${option.name} - ${option.number}`;
        }
    };

    const renderOptionLabel = option => {
        if (option.number) {
            return `${option.name} - ${option.number}`;
        } else {
            return `${option.name}`;
        }
    };

    const handleChangeUsers = (e, newValue) => {


        if (newValue?.number) {
            setUsers([...users, newValue.number])

        } else {
            return;
        }
        handleCloseSearchModal()
    };


    const handleChangeParticipantes = (event) => {
        const {
            target: { value },
        } = event;
        setParticipantes(

            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeAnfitriao = (event) => {
        const {
            target: { value },
        } = event;

        anfitriao.length > 0 ? setAnfitriao([]) : setAnfitriao(
            value
        );

    }


    const removeDateNotify = (value) => {
        var array = datesNotify;
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }

        setDatesNotify(
            [...array]
        );
    };
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
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const fetchContacts = async () => {
                try {
                    const { data } = await api.get("contacts", {
                        params: { searchParam },
                    });
                    setOptions(data.contacts);

                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    toastError(err);
                }
            };
            const fetchUsers = async () => {
                try {
                    const { data } = await api.get("/users/", {

                    });

                    setAtendentes(data.users);
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    toastError(err);
                }
            };

            fetchUsers();
            fetchContacts();
        }, 500);
        return () => clearTimeout(delayDebounceFn);

    }, [searchParam])
    const handleCloseModal = () => {
        setActiveStep(0);
        setSkipped(new Set());
        setStartDate(
            new Date()
        );
        setEndDate(
            new Date()
        );
        setUsers([]);
        setAnfitriao([]);
        setParticipantes([]);
        setTopico('');
        setLocale('');
        setDescription('');
        setTypeEvent(1);
        setRecorrencia(1);
        setLevel(1);
        setNotificationType([1]);
        setNotifyDate(startDate);
        setDatesNotify([]);
        setOpenContactModal(false)
        setOptions([]);
        setSearchParam('')
        handleClose()
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

                            <Grid item xs={12} className={classes.gridRow}  >
                                <Grid item xs={11} >
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.title")}</strong></Typography>
                                    <TextField InputProps={{ disableUnderline: true, className: classes.input }} defaultValue={topico} onChange={(e) => setTopico(e.target.value)} placeholder={i18n.t("scheduleModal.labels.topic")} fullWidth />

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
                                            locale="pt-br"
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
                                            locale="pt-br"
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
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.typeEvent")}</strong></Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={typeEvent === 1} className={classes.checkbox} onChange={() => setTypeEvent(1)} />} label={<Typography variant='caption'>local</Typography>} style={{ height: 20, }} />
                                        <FormControlLabel control={<Checkbox checked={typeEvent === 2} className={classes.checkbox} onChange={() => setTypeEvent(2)} />} label={<Typography variant='caption'>Online</Typography>} style={{ height: 20 }} />
                                    </FormGroup>

                                </Grid>

                                <Grid item xs={3} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.recurrence")}</strong></Typography>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox checked={recorrencia === 1} onChange={() => setRecorrencia(1)} className={classes.checkbox} />} label={<Typography variant='caption'>Apenas uma vez</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={recorrencia === 2} onChange={() => setRecorrencia(2)} className={classes.checkbox} />} label={<Typography variant='caption'>Semanal</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={recorrencia === 3} onChange={() => setRecorrencia(3)} className={classes.checkbox} />} label={<Typography variant='caption'>Mensal</Typography>} style={{ height: 20 }} />

                                    </FormGroup>

                                </Grid>
                                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.priority")}</strong></Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={level === 1} onChange={() => setLevel(1)} className={classes.checkbox} />} label={<Typography variant='caption'>Baixo</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={level === 2} onChange={() => setLevel(2)} className={classes.checkbox} />} label={<Typography variant='caption'>Médio</Typography>} style={{ height: 20 }} />
                                        <FormControlLabel control={<Checkbox checked={level === 3} onChange={() => setLevel(3)} className={classes.checkbox} />} label={<Typography variant='caption'>Alto</Typography>} style={{ height: 20 }} />
                                    </FormGroup>
                                </Grid>


                                <Grid item xs={12} className={classes.gridRow}>
                                    <Grid item xs={11} >

                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} defaultValue={locale} onChange={(e) => setLocale(e.target.value)} placeholder={i18n.t("scheduleModal.labels.locale")} fullWidth />

                                    </Grid>

                                </Grid>

                                <Grid item xs={12} className={classes.gridRow}>
                                    <Grid item xs={11} >
                                        <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.description")}</strong></Typography>
                                        <TextField InputProps={{ disableUnderline: true, className: classes.inputDescription, }} defaultValue={description} onChange={(e) => setDescription(e.target.value)} placeholder={i18n.t("scheduleModal.labels.description")} fullWidth multiline />

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
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.host")}</strong></Typography>
                                    <FormControl style={{ height: 44, width: "100%" }} className={classes.input}>

                                        <Select
                                            style={{ height: "100%" }}
                                            fullWidth
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={anfitriao}
                                            onChange={handleChangeAnfitriao}
                                            disableUnderline
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value.id} label={value.name} />
                                                    ))}
                                                </Box>
                                            )}

                                        >
                                            {atendentes.map((value) => (
                                                <MenuItem
                                                    key={value.id}
                                                    value={value}

                                                >
                                                    {value.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>


                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={11} >
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.attendants")}</strong></Typography>
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
                                                        <Chip key={value.id} label={value.name} />
                                                    ))}
                                                </Box>
                                            )}

                                        >
                                            {atendentes.map((value) => (
                                                <MenuItem
                                                    key={value.id}
                                                    value={value}

                                                >
                                                    {value.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={9} >
                                    <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.externals")}</strong></Typography>
                                    <FormControl style={{ height: 44, width: "100%" }} className={classes.input}>

                                        <Select
                                            style={{ height: "100%" }}
                                            fullWidth
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={users}


                                            disableUnderline
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}

                                        >
                                            {users.map((number, i) => (
                                                <MenuItem
                                                    key={number}
                                                    value={number}

                                                >
                                                    {number}
                                                </MenuItem>
                                            ))}
                                        </Select>


                                    </FormControl>
                                    <Dialog open={searchModal} onClose={handleCloseSearchModal}>
                                        <DialogContent dividers>

                                            <Autocomplete
                                                options={options}
                                                loading={loading}
                                                style={{ width: 300 }}
                                                clearOnBlur
                                                autoHighlight
                                                freeSolo
                                                clearOnEscape
                                                getOptionLabel={renderOptionLabel}
                                                renderOption={renderOption}
                                                filterOptions={createAddContactOption}
                                                onChange={(e, newValue) => handleChangeUsers(e, newValue)}
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        label={i18n.t("newTicketModal.fieldLabel")}
                                                        variant="outlined"
                                                        autoFocus
                                                        onChange={e => setSearchParam(e.target.value)}

                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {loading ? (
                                                                        <CircularProgress color="inherit" size={20} />
                                                                    ) : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </DialogContent>
                                    </Dialog>

                                    <ContactModal onClose={handleCloseContactModal} open={openContactModal}   ></ContactModal>
                                </Grid>
                                <Grid item xs={1} className={classes.gridRow}>
                                    <Button onClick={() => handleOpenSearchModal()}>
                                        <Search style={{ paddingLeft: 5, fontSize: 35, color: "#FE517B" }} /></Button>
                                </Grid>
                                <Grid item xs={1} className={classes.gridRow}>
                                    <Button onClick={() => handleOpenContactModal()}>
                                        <Add style={{ paddingLeft: 5, fontSize: 35, color: "#FE517B" }} /></Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} className={classes.gridRow}>
                                <Grid item xs={11}>
                                    <Grid item xs={12} style={{ display: "flex", flexDirection: "column", marginBottom: 5 }} >
                                        <Typography variant="subtitle1" ><strong>{i18n.t("scheduleModal.subtitles.notification")}</strong></Typography>
                                        <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                                            <FormControlLabel control={<Checkbox style={{
                                                transform: "scale(0.7)",
                                            }} checked={notificationType.includes(1)} onChange={() => addNotification(1)} />} label={<Typography variant='caption'>Whatsapp</Typography>} style={{ height: 25 }} />
                                            <FormControlLabel control={<Checkbox style={{
                                                transform: "scale(0.7)",
                                            }} checked={notificationType.includes(2)} onChange={() => addNotification(2)} />} label={<Typography variant='caption'>Email</Typography>} style={{ height: 25 }} />

                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }} >
                                        <Grid item xs={4} style={{ marginRight: 5 }}>
                                            <DatePicker
                                                className={classes.datePicker}
                                                selected={notifyDate}
                                                onChange={(date) => setNotifyDate(date)}
                                                locale="pt-br"
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={10}
                                                timeCaption="Horas"
                                                dateFormat="d MMMM yyyy h:mm aa"
                                                filterTime={filterPassedTime}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button onClick={() => {

                                                setDatesNotify([...datesNotify, notifyDate])

                                            }}>
                                                <AddAlertIcon style={{ paddingLeft: 5, fontSize: 35, color: "#FE517B" }} /></Button>
                                        </Grid>
                                        <Grid item xs={6} >

                                            <List style={{
                                                backgroundColor: "#F0F4F8", minHeight: 44, borderRadius: 10,
                                                fontSize: 15,
                                                padding: 5,

                                            }}>

                                                {datesNotify.map((value, i) => (
                                                    <ListItem
                                                        key={i}
                                                        disableGutters
                                                        style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: "center", height: "100%", padding: 0, margin: 0 }}
                                                    >

                                                        <Typography variant="caption">{` ${new Date(value).toLocaleString('pt-br')}`}</Typography>
                                                        <IconButton aria-label="comment" style={{ color: "grey", height: "100%" }} onClick={() => removeDateNotify(value)}>
                                                            <DeleteForeverIcon />
                                                        </IconButton></ListItem>
                                                ))}
                                            </List>

                                        </Grid>

                                    </Grid>


                                </Grid>
                            </Grid>

                            <Grid item xs={12} className={classes.gridRow} style={{ marginTop: 113, marginBottom: 20 }}>
                                <Grid item xs={11} style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row" }}>
                                    <Button className={classes.buttonBack} onClick={() => handleBack()}>
                                        <ArrowBack /></Button>

                                    <Button className={classes.button} onClick={() => saveSchedule()}>
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
export default ScheduleModal;