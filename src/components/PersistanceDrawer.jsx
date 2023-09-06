import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GradeIcon from "@mui/icons-material/Grade";
import PublicIcon from "@mui/icons-material/Public";
import apliqoLogo from "./../assets/ApliqoLogo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MuiAppBar from "@mui/material/AppBar";
import {
  apliqoAliceBlue,
  apliqoDarkOrange,
  apliqoTangaroa,
  modes,
  navBar,
} from "../utils/utils";
import {
  Button,
  IconButton,
  Typography,
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Children } from "react";

const drawerWidth = 240;

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

const PersistentDrawerLeft = ({
  mode,
  filter,
  setFilter,
  setMode,
  handleOpenNew,
  handleZoom,
  children,
}) => {
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

  const handleClearFilter = (e) => {
    e?.preventDefault();
    setFilter({
      major: false,
      office: false,
      product: false,
    });
    handleDrawerClose();
  };

  const handleSwitch = () => {
    handleZoom();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            bgcolor: mode === modes.MANAGE ? apliqoDarkOrange : apliqoTangaroa,
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              className="drawerButton"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ ...(open && { display: "none" }), outline: "none" }}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={apliqoLogo}
              className="logo"
              alt="Apliqo logo"
              style={{ width: "100px", height: "auto" }}
            />
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={handleSwitch} />}
                label="Zoom Out"
              />
            </FormGroup>
          </Box>
          <Box display="flex" alignItems="center">
            {mode === modes.MANAGE && (
              <Button
                sx={{ color: apliqoAliceBlue, mr: 3 }}
                onClick={handleOpenNew}
                endIcon={<AddCircleOutlineIcon />}
              >
                New
              </Button>
            )}
            <Typography
              align="center"
              color={apliqoAliceBlue}
              id="modal-modal-cardSubtitle"
              sx={{
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FilterAltIcon sx={{ mr: 1 }} />
              {filter.major && navBar.MAJOR_CLIENTS}
              {filter.office && navBar.GLOBAL_PRESENCE}
              {filter.product && navBar.PRODUCTS}
            </Typography>
            {(filter.major || filter.office || filter.product) && (
              <HighlightOffIcon onClick={handleClearFilter} sx={{ ml: 1 }} />
            )}
          </Box>
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
          <IconButton className="drawerButton" onClick={handleDrawerClose}>
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
          key={navBar.RESET}
          disablePadding
          onClick={(e) => handleClearFilter(e)}
        >
          <ListItemButton>
            <ListItemIcon>{<RestartAltIcon />}</ListItemIcon>
            <ListItemText primary={navBar.RESET} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          key={navBar.MANAGEMENT}
          disablePadding
          onClick={(e) => handleMode(e)}
        >
          <ListItemButton>
            <ListItemIcon>{<ManageAccountsIcon />}</ListItemIcon>
            <ListItemText primary={navBar.MANAGEMENT} />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
};

PersistentDrawerLeft.propTypes = {
  setMajorFilter: PropTypes.func,
};

export default PersistentDrawerLeft;
