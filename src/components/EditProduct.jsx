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
import productService from "../service/product.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const EditProductForm = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState({});
  const [submitAction, setSubmitAction] = React.useState(false);

  useEffect(() => {

    if(!props.match.params.id) {
      props.history.push('/home');
    }

    async function getProductDetails() {
      try {
        const {data} = await productService.getProductDetails(props.match.params.id);
        setData(data);
      } catch(error) {
        console.log(error);
        props.history.push('/home');
      }
    }

    getProductDetails();
  }, [])

  useEffect(() => {
    async function modifyProduct() {
      if (!submitAction) {
        return;
      }

      try {
        const { data: response } = await productService.editProduct(props.match.params.id, data);
        toast.success(`Product ${data.name} modified successfully`);
        console.log(data);
      } catch (ex) {
        toast.error(ex.response.data);
      } finally {
        setSubmitAction(false);
        props.history.push('/products');
      }
    }

    modifyProduct();
  }, [submitAction]);

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitAction(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5">Modify Product</Typography>
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
                value={data.name || ""}
                onChange={(event) => setData({...data, name: event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                autoComplete="category"
                value={data.category || ""}
                onChange={(event) => setData({...data, category: event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="manufacturer"
                label="Manufacturer"
                name="manufacturer"
                autoComplete="manufacturer"
                value={data.manufacturer || ""}
                onChange={(event) => setData({...data, manufacturer: event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="available_items"
                label="Available Items"
                name="available_items"
                autoComplete="available_items"
                value={data.availableItems || 1}
                onChange={(event) => setData({...data, availableItems: event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                value={data.price || 0}
                onChange={(event) => setData({...data, price: event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="image_url"
                label="Image URL"
                name="image_url"
                autoComplete="image_url"
                value={data.imageURL || ""}
                onChange={(event) => setData({...data, imageURL: event.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Product Description"
                name="description"
                autoComplete="description"
                value={data.description || ""}
                onChange={(event) => setData({...data, description: event.target.value})}
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
            Modify Product
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditProductForm;
