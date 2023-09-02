import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GradeIcon from "@mui/icons-material/Grade";
import PublicIcon from "@mui/icons-material/Public";
import apliqoLogo from "./../assets/ApliqoLogo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Children } from "react";
import { apliqoTangaroa, modes, navBar } from "../utils/utils";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  bgcolor: apliqoTangaroa,
}));

const PersistentDrawerLeft = ({ mode, setFilter, setMode, children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFilter = (text, e) => {
    e.preventDefault();
    switch (text) {
      case navBar.MAJOR_CLIENTS:
        setFilter((prevState) => ({
          major: !prevState.major,
          office: false,
          product: false,
        }));
        break;
      case navBar.GLOBAL_PRESENCE:
        setFilter((prevState) => ({
          major: false,
          office: !prevState.office,
          product: false,
        }));
        break;
      case navBar.PRODUCTS:
        setFilter((prevState) => ({
          major: false,
          office: false,
          product: !prevState.product,
        }));
        break;
      default:
        break;
    }
    handleDrawerClose();
  };

  const handleMode = (e) => {
    mode === modes.VIEW ? setMode(modes.MANAGE) : setMode(modes.VIEW);
    handleDrawerClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ bgcolor: "#202E39", height: "50px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={apliqoLogo}
            className="logo"
            alt="Apliqo logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            filter: "drop-shadow(4px 0px 100px black)",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[navBar.MAJOR_CLIENTS, navBar.GLOBAL_PRESENCE, navBar.PRODUCTS].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={(e) => handleFilter(text, e)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <GradeIcon />}
                    {index === 1 && <PublicIcon />}
                    {index === 2 && <ShoppingCartIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <ListItem
          key={navBar.MANAGEMENT}
          disablePadding
          onClick={(e) => handleMode(e)}
        >
          <ListItemButton>
            <ListItemIcon>{<GradeIcon />}</ListItemIcon>
            <ListItemText primary={navBar.MANAGEMENT} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      {/* <Main open={open}>{children}</Main> */}
    </Box>
  );
};

PersistentDrawerLeft.propTypes = {
  setMajorFilter: PropTypes.func,
};

export default PersistentDrawerLeft;
