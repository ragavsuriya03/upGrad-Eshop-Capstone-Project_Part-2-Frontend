import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import authService from "../service/auth.service";
import http from "./../service/http.service";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddAddress = (props) => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [submitAction, setSubmitAction] = React.useState(false);

  useEffect(() => {
    async function addAddress() {
      if (!submitAction) {
        return;
      }

      try {
        const { data } = await http.post(
          "http://localhost:8080/api/addresses",
          {
            name,
            city,
            state,
            street,
            contactNumber: number,
            landmark,
            zipCode,
          },
          {
            headers: {
              "x-auth-token": authService.getToken(),
            },
          }
        );
        toast.success(`Address ${name} added successfully`);
       // console.log(data);
        props.setRefresh(!props.refresh);
      } catch (ex) {
        toast.error(ex.message);
      } finally {
        setSubmitAction(false);
      }
    }

    addAddress();
  }, [submitAction]);

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitAction(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5">Add Address</Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="number"
                label="Contact Number"
                type="number"
                id="number"
                autoComplete="contact-number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="landmark"
                label="Landmark"
                name="landmark"
                autoComplete="landmark"
                value={landmark}
                onChange={(event) => setLandmark(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipcode"
                label="Zip Code"
                name="zipcode"
                autoComplete="zipcode"
                value={zipCode}
                onChange={(event) => setZipCode(+event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Save Address
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddAddress;
