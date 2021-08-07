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
import SelectCategory from "./SelectCategory";

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

const AddProductForm = (props) => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [manufacturer, setManufacturer] = React.useState("");
  const [availableItems, setAvailableItems] = React.useState(1);
  const [price, setPrice] = React.useState(0);
  const [imageURL, setImageURL] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [submitAction, setSubmitAction] = React.useState(false);

  useEffect(() => {
    async function addProduct() {
      if (!submitAction) {
        return;
      }

      try {
        const { data } = await productService.saveProduct({
          name,
          category: category.value,
          manufacturer,
          availableItems: +availableItems,
          price: +price,
          imageURL,
          description,
        });
        toast.success(`Product ${data.name} added successfully`);
        //console.log(data);
      } catch (ex) {
        toast.error(ex.response.data);
      } finally {
        setSubmitAction(false);
      }
    }

    addProduct();
  }, [submitAction]);

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitAction(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5">Add Product</Typography>
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
              <SelectCategory
                value={category}
                onChange={(data) => setCategory(data)}
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
                value={manufacturer}
                onChange={(event) => setManufacturer(event.target.value)}
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
                value={availableItems}
                onChange={(event) => setAvailableItems(+event.target.value)}
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
                value={price}
                onChange={(event) => setPrice(+event.target.value)}
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
                value={imageURL}
                onChange={(event) => setImageURL(event.target.value)}
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
            Save Product
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddProductForm;
