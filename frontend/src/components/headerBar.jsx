import { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const drawerWidth = 240;

const logoutItems = ["Log in", "Sign up"];
const loginItems = ["Log out", "Message", "Profile"];

export default function HeaderBar({ authenticated, children }) {
  // const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = authenticated ? loginItems : logoutItems;

  // const handleDrawerToggle = () => {
  //   setMobileOpen((prevState) => !prevState);
  // };

  // const drawer = (
  //   <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
  //     <Typography variant="h6" sx={{ my: 2 }}>
  //       MUI
  //     </Typography>
  //     <Divider />
  //     <List>
  //       {navItems.map((item) => (
  //         <ListItem key={item} disablePadding>
  //           <ListItemButton sx={{ textAlign: "center" }}>
  //             <ListItemText primary={item} sx={{ backgroundColor: "red" }} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <Box sx={{ display: "flex", backgroundColor: "var(--header-bg)" }}>
      {/* <CssBaseline /> */}
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: "var(--header-bg)" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "var(--text-color)",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
            }}
          >
            NTU Outsider
          </Typography>
          <Box gap={4} sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "var(--text-color)",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  fontFamily: "var(--header-text)",
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav> */}

      <Box component="main" sx={{ p: 3 }}>
        {/* <Toolbar />
        <Typography>
          I am Chaoting!
        </Typography>
        <Typography>
          I am Chaoting!
        </Typography> */}
        {children}
      </Box>
    </Box>
  );
}

HeaderBar.propTypes = {
  authenticated: PropTypes.bool,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // window: PropTypes.func,
};
