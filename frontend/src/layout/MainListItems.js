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
  ListItemLink: { flexDirection: "column", justifyContent: "center", color: "#fff", opacity: 0.6 },
  ListItemLinkActive: { flexDirection: "column", justifyContent: "center", color: "#fff" },
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
  const { icon, primary, to, className, index, fn } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} className={className} onClick={() => fn(index)}>
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
  const [isActive, setIsActive] = useState(0);
  const classes = useStyles(); //UseStyles


  const listItemActive = (i) => {
    setIsActive(i)
  }


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
        index={0}
        fn={listItemActive}

        to="/"
        primary="Dashboard"

        className={isActive === 0 ? classes.ListItemLinkActive : classes.ListItemLink}
        icon={
          <Grid1x2Fill style={isActive === 0 ? { color: "#fff" } : null} size={20} className={classes.IconButton} //classes css
          />}
      />
      <ListItemLink
        index={1}
        fn={listItemActive}

        to="/Scheduled"
        primary="Agendamento"

        className={isActive === 1 ? classes.ListItemLinkActive : classes.ListItemLink}
        icon={
          <CalendarWeek style={isActive === 1 ? { color: "#fff" } : null} size={20} className={classes.IconButton} //classes css
          />}
      />
      <ListItemLink
        index={2}
        fn={listItemActive}
        className={isActive === 2 ? classes.ListItemLinkActive : classes.ListItemLink}
        to="/connections"
        primary={i18n.t("mainDrawer.listItems.connections")}
        icon={
          <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
            <ArrowLeftRight style={isActive === 2 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />
          </Badge>
        }
      />
      <ListItemLink
        index={3}
        fn={listItemActive}
        className={isActive === 3 ? classes.ListItemLinkActive : classes.ListItemLink}
        to="/tickets"
        primary={i18n.t("mainDrawer.listItems.tickets")}
        icon={<ChatSquareDotsFill style={isActive === 3 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />} //
      />

      <ListItemLink
        index={4}
        fn={listItemActive}
        className={isActive === 4 ? classes.ListItemLinkActive : classes.ListItemLink}
        to="/contacts"
        primary={i18n.t("mainDrawer.listItems.contacts")}
        icon={<PersonPlusFill style={isActive === 4 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />} //
      />
      <ListItemLink
        index={5}
        fn={listItemActive}
        className={isActive === 5 ? classes.ListItemLinkActive : classes.ListItemLink}
        to="/quickAnswers"
        primary={i18n.t("mainDrawer.listItems.quickAnswers")}
        icon={<ChatSquareQuoteFill style={isActive === 5 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />} //
      />
      <Can
        role={user.profile}

        perform="drawer-admin-items:view"
        yes={() => (
          <>
            <Divider style={{ background: "#21384d", height: 2 }} />
            <ListItemLink
              index={6}
              fn={listItemActive}
              className={isActive === 6 ? classes.ListItemLinkActive : classes.ListItemLink}
              to="/users"
              primary={i18n.t("mainDrawer.listItems.users")}
              icon={<PeopleFill style={isActive === 6 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />} //
            />
            <ListItemLink
              index={7}
              fn={listItemActive}
              className={isActive === 7 ? classes.ListItemLinkActive : classes.ListItemLink}
              to="/queues"
              primary={i18n.t("mainDrawer.listItems.queues")}
              icon={<Diagram3Fill style={isActive === 7 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />} //
            />
            <ListItemLink
              index={8}
              fn={listItemActive}
              className={isActive === 8 ? classes.ListItemLinkActive : classes.ListItemLink}
              to="/settings"
              primary={i18n.t("mainDrawer.listItems.settings")}
              icon={<GearFill style={isActive === 8 ? { color: "#fff" } : null} size={20} className={classes.IconButton} />} //
            />
          </>
        )}
      />
    </div>
  );
};

export default MainListItems;
