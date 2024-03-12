import { ListItem, ListItemButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./headerLink.module.css";

const HeaderLink = ({ text, icon, href, handleNavigate }) => {
  return (
    <ListItem key={text} className={styles.container}>
      <Tooltip title={text}>
        <ListItemButton
          onClick={() => handleNavigate(href)}
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
  href: PropTypes.string.isRequired,
  handleNavigate: PropTypes.func.isRequired,
};

export default HeaderLink;
