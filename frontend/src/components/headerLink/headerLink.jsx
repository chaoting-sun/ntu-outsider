import { ListItem, ListItemButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./headerLink.module.css";

const HeaderLink = ({ text, icon, handleAction }) => {
  return (
    <ListItem key={text} className={styles.container}>
      <Tooltip title={text}>
        <ListItemButton
          onClick={handleAction}
          className={styles.button}
        >
          {icon}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default HeaderLink;
