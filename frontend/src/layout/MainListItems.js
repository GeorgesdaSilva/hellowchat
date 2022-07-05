import React, { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import {
  Divider,
  makeStyles,

} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import { Badge } from "@material-ui/core";

import { Grid1x2Fill, ArrowLeftRight, ChatSquareDotsFill, PersonPlusFill, ChatSquareQuoteFill, PeopleFill, Diagram3Fill, GearFill, CalendarWeek } from 'react-bootstrap-icons';

import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import { Can } from "../components/Can";

const useStyles = makeStyles((theme) => ({  //MakeStyles
  ListItemLink: { flexDirection: "column", justifyContent: "center", color: "#fff" },

  IconButton: {
    color: "#ffff", //
  },
  textButton: {
    margin: 0,
    padding: 3,
    fontSize: 12


  }

}));
function ListItemLink(props) {
  const { icon, primary, to, className } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} className={className} >
        {icon ? <ListItemIcon style={{ justifyContent: "center" }}>{icon}</ListItemIcon> : null}
        <p className={useStyles().textButton}>{primary}</p>

      </ListItem>
    </li>
  );
}

const MainListItems = (props) => {
  const { drawerClose } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);

  const classes = useStyles(); //UseStyles

  useEffect(() => {


    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);






  }, [whatsApps]);



  return (
    <div onClick={drawerClose}>
      <ListItemLink



        to="/"
        primary="Dashboard"

        className={classes.ListItemLink}
        icon={
          <Grid1x2Fill style={{ color: "#fff" }} size={20} className={classes.IconButton} //classes css
          />}
      />
      <ListItemLink



        to="/Scheduled"
        primary="Agendamento"

        className={classes.ListItemLink}
        icon={
          <CalendarWeek style={{ color: "#fff" }} size={20} className={classes.IconButton} //classes css
          />}
      />
      <ListItemLink


        className={classes.ListItemLink}
        to="/connections"
        primary={i18n.t("mainDrawer.listItems.connections")}
        icon={
          <Badge overlap="rectangular"  badgeContent={connectionWarning ? "!" : 0} color="error">
            <ArrowLeftRight style={{ color: "#fff" }} size={20} className={classes.IconButton} />
          </Badge>
        }
      />
      <ListItemLink


        className={classes.ListItemLink}
        to="/tickets"
        primary={i18n.t("mainDrawer.listItems.tickets")}
        icon={<ChatSquareDotsFill style={{ color: "#fff" }} size={20} className={classes.IconButton} />} //
      />

      <ListItemLink


        className={classes.ListItemLink}
        to="/contacts"
        primary={i18n.t("mainDrawer.listItems.contacts")}
        icon={<PersonPlusFill style={{ color: "#fff" }} size={20} className={classes.IconButton} />} //
      />
      <ListItemLink


        className={classes.ListItemLink}
        to="/quickAnswers"
        primary={i18n.t("mainDrawer.listItems.quickAnswers")}
        icon={<ChatSquareQuoteFill style={{ color: "#fff" }} size={20} className={classes.IconButton} />} //
      />
      <Can
        role={user.profile}

        perform="drawer-admin-items:view"
        yes={() => (
          <>
            <Divider style={{ background: "#21384d", height: 2 }} />
            <ListItemLink


              className={classes.ListItemLink}
              to="/users"
              primary={i18n.t("mainDrawer.listItems.users")}
              icon={<PeopleFill style={{ color: "#fff" }} size={20} className={classes.IconButton} />} //
            />
            <ListItemLink


              className={classes.ListItemLink}
              to="/queues"
              primary={i18n.t("mainDrawer.listItems.queues")}
              icon={<Diagram3Fill style={{ color: "#fff" }} size={20} className={classes.IconButton} />} //
            />
            <ListItemLink


              className={classes.ListItemLink}
              to="/settings"
              primary={i18n.t("mainDrawer.listItems.settings")}
              icon={<GearFill style={{ color: "#fff" }} size={20} className={classes.IconButton} />} //
            />
          </>
        )}
      />
    </div>
  );
};

export default MainListItems;
