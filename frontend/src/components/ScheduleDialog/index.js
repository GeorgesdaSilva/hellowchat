import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
const steps = ['Dados de Agendamento', 'Participantes'];

const useStyles = makeStyles(theme => ({

    modal: {
        display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center"

    },

    body: {

        backgroundColor: "#fff",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        display: "flex",
        flexDirection: "column",


    },
    stepperHeader: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    input: {

        backgroundColor: "#F0F4F8", height: 44, borderRadius: 10,



    },
    inputDescription: {

        backgroundColor: "#F0F4F8", height: 119, borderRadius: 10,



    },
    button:{
        width:320,
        height:44,
        borderRadius:23,
        backgroundColor:"#FE517B",
        color:"#fff"

    }

}));

const ScheduleDialog = ({ handleClose, openStatus }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
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

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (

                        // <React.Fragment>
                        <Grid style={{ backgroundColor: "#fff", height: "90%", width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                            <Grid item xs={12} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                <Grid item xs={11} >
                                    <Typography variant="subtitle1" >Detalhes</Typography>
                                    <TextField InputProps={{ disableUnderline: true, className: classes.input }} fullWidth />

                                </Grid>

                                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            </Grid>


                            <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                <Grid item xs={5} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                                    <Grid item xs={6} >
                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} fullWidth />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} fullWidth />
                                    </Grid>


                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant='subtitle2' style={{ textAlign: "center" }}>Até</Typography>
                                </Grid>

                                <Grid item xs={5} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                                    <Grid item xs={6} >
                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} fullWidth />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} fullWidth />
                                    </Grid>


                                </Grid>


                            </Grid>
                            <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" >Tipo de evento</Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" style={{ height: 25 }} />
                                        <FormControlLabel control={<Checkbox />} label="Disabled" style={{ height: 25 }} />
                                        <FormControlLabel control={<Checkbox />} label="Disabled" style={{ height: 25 }} />
                                    </FormGroup>





                                </Grid>

                                <Grid item xs={3} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" >Recorrência</Typography>
                                    <FormGroup >
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" style={{ height: 25 }} />
                                        <FormControlLabel control={<Checkbox />} label="Disabled" style={{ height: 25 }} />
                                        <FormControlLabel control={<Checkbox />} label="Disabled" style={{ height: 25 }} />
                                    </FormGroup>



                                </Grid>
                                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", }} >
                                    <Typography variant="subtitle1" >Prioridade</Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" style={{ height: 25 }} />
                                        <FormControlLabel control={<Checkbox />} label="Disabled" style={{ height: 25 }} />
                                        <FormControlLabel control={<Checkbox />} label="Disabled" style={{ height: 25 }} />
                                    </FormGroup>



                                </Grid>


                                <Grid item xs={12} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 20 }}>
                                    <Grid item xs={11} >

                                        <TextField InputProps={{ disableUnderline: true, className: classes.input }} fullWidth />

                                    </Grid>

                                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                </Grid>



                                <Grid item xs={12} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 20 }}>
                                    <Grid item xs={11} >
                                        <Typography variant="subtitle1" >Descrição</Typography>
                                        <TextField InputProps={{ disableUnderline: true, className: classes.inputDescription }} fullWidth />

                                    </Grid>

                                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                </Grid>

                                <Grid item xs={12} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 20 }}>
                                    <Grid item xs={11} style={{display:"flex",justifyContent:"center",alignContent:"center",flexDirection:"row"}}>
                                        <Button className={classes.button}>
                                        Ir para participantes <ArrowRightAltIcon style={{paddingLeft:5,fontSize:35}}/></Button>

                                    </Grid>

                                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                </Grid>

                            </Grid>





                            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box> */}
                        </Grid>


                        // </React.Fragment>
                    )}
                </Container>
            </Modal>
        </div>
    );
}

export default ScheduleDialog;