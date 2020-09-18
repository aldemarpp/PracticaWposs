import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider
} from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiTestTube,
  mdiAccountBox,
  mdiBookSearch,
  mdiFlask,
  mdiTools,
  mdiBriefcase,
  mdiMessageBulleted,
  mdiAccountGroup,
  mdiAccountKey,
  mdiAccountArrowLeft
} from "@mdi/js";
import { Link } from "react-router-dom";

export const MenuDerecha = ({ classes, textoUsuario, fotoUsuario }) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link} to="/auth/perfil">
        <Avatar src={fotoUsuario} />
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary={textoUsuario}
        />
      </ListItem>
      <Divider />
      <ListItem component={Link} button to="/auth/login">
        <Icon path={mdiAccountBox} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Login"
        />
      </ListItem>
      <Divider />
      <ListItem component={Link} button to="/transacciones">
        <Icon path={mdiBookSearch} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Transacciones"
        />
      </ListItem>
      <ListItem component={Link} button to="/usuarios">
        <Icon path={mdiAccountKey} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Usuarios"
        />
      </ListItem>
      <Divider />
      <ListItem component={Link} button to="Cerrar Sesión">
        <Icon path={mdiAccountArrowLeft} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Cerrar Sesión"
        />
      </ListItem>
    </List>
  </div>
);
