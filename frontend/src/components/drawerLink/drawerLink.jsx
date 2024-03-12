import { Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./drawerLink.module.css";

const DrawerLink = ({ text, icon, href, open, handleNavigate }) => {
  return (
    <ListItem key={text} disablePadding className={styles.container}>
      <Tooltip
        title={text}
        placement="right"
        disableHoverListener={open ? true : false}
      >
        <ListItemButton
          onClick={() => handleNavigate(href)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

DrawerLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleNavigate: PropTypes.func.isRequired,
};

export default DrawerLink;
