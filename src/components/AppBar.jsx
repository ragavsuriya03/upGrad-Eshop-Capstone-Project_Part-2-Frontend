import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, InputBase } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import authService from "../service/auth.service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
  link: {
    color: "white",
    margin: "20px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "25%",
    marginRight: "25%",
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [filter, setFilter] = React.useState("");

  useEffect(() => {

    if(!authService.isLoggedIn()) {
      return;
    }
    
    let searchParams = new URLSearchParams(location.search);
    searchParams.delete("name");
    if (filter) {
      searchParams.set("name", filter);
    }
    history.push({
      pathname: "/products",
      search: searchParams.toString(),
    });
  }, [filter]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <ShoppingCartIcon />
          <Typography variant="h6" className={classes.title}>
            upGrad E-Shop
          </Typography>
          {authService.isLoggedIn() && <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>}
          {!authService.isLoggedIn() && (
            <>
              <NavLink className={classes.link} to="/login">
                Login
              </NavLink>
              <NavLink className={classes.link} to="/signup">
                Sign Up
              </NavLink>
            </>
          )}
          {authService.isLoggedIn() && (
            <>
              <NavLink className={classes.link} to="/products">
                Home
              </NavLink>
            </>
          )}
          {authService.isLoggedIn() && (authService.isAdmin()===true) && (
            <>
              <NavLink className={classes.link} to="/add-product">
                Add Product
              </NavLink>
            </>
          )}

          {authService.isLoggedIn() && (
            <Button
              variant="contained"
              color="secondary"
              onClick={authService.doLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
