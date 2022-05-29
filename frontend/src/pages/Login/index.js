import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../assets/logo_main.png";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Link
} from '@material-ui/core';

import BeenhereOutlined from '@material-ui/icons/BeenhereOutlined';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { makeStyles } from "@material-ui/core/styles";

import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";



// const Copyright = () => {
// 	return (
// 		<Typography variant="body2" color="textSecondary" align="center">
// 			{"Copyleft "}
// 			<Link color="inherit" href="https://github.com/canove">
// 				Canove
// 			</Link>{" "}
// 			{new Date().getFullYear()}
// 			{"."}
// 		</Typography>
// 	);
// };

const useStyles = makeStyles((theme) => ({
root:{
backgroundColor:'white',
height:'100vh',
},
  paper: {
height:'85vh',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:'center',


  },
   avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }, 
  form: {
    height:'400px',
    width: "100%", // Fix IE 11 issue.
   display:'flex',
   flexDirection:"column",
   justifyContent:"flex-end",
   alignItems:'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login:{
    alignContent:'center',
    justifyContent:'center'
  }

}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className={classes.root}>
      <Grid container xs={12} className={classes.login}>
        <Grid item lg={6} xs={8}  className={classes.login}>
         
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}  >
                 <Avatar className={classes.avatar}>
                  <BeenhereOutlined />
                </Avatar> 
                <Typography component="h1" variant="h5">
                  {i18n.t("login.title")}
                </Typography>
                <form className={classes.form} noValidate onSubmit={handlSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={i18n.t("login.form.email")}
                    name="email"
                    value={user.email}
                    onChange={handleChangeInput}
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={i18n.t("login.form.password")}
                    id="password"
                    value={user.password}
                    onChange={handleChangeInput}
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((e) => !e)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {i18n.t("login.buttons.submit")}
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        component={RouterLink}
                        to="/reset/pass"
                      >
                        {i18n.t("login.buttons.reset")}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>{/* <Copyright /> */}</Box>
            </Container>
         
        </Grid>
        <Grid container lg={6} xs={0}  justifyContent='center' alignContent="center">
          
            <img src={Logo} height={512} width={512}/>
          
        </Grid>
        <Grid container justifyContent="center" alignContent="center" xs={12}>

<h3><strong>Desenvolvido pelo Grupo SGT</strong></h3>
      </Grid>
      </Grid>
      
      
    </div>

  );
};

export default Login;
