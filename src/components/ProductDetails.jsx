import { Box, Button, Chip, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import productService from "../service/product.service";

const ProductDetails = (props) => {
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!props.match.params.id) {
      props.history.push("/products");
    }

    async function getProductDetails() {
      try {
        const { data } = await productService.getProductDetails(
          props.match.params.id
        );
        setData(data);
      } catch (error) {
        //console.log(error);
        props.history.push("/home");
      }
    }

    getProductDetails();
  }, []);

  return (
    <Box display="flex" mt={10}>
      <Box height="90%" marginLeft={20}>
        <img src={data.imageURL} alt={data.name} height="350px" width="400px" />
      </Box>
      <Box mt={5} ml={10} width='40%'>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" style={{ marginRight: "20px" }}>
            {data.name}
          </Typography>
          <Chip
            color={data.availableItems > 0 ? "primary" : "secondary"}
            label={
              data.availableItems > 0
                ? `Available Quantity : ${data.availableItems}`
                : "Out of stock"
            }
          />
        </Box>
        <Typography
          variant="h6"
          style={{ marginTop: "10px", fontSize: "16px" }}
        >
          Category: <b>{data.category}</b>
        </Typography>
        <Typography
          variant="h6"
          style={{ marginTop: "20px", fontSize: "16px", fontStyle: "italic" }}
        >
          {data.description || "No description available"}
        </Typography>
        <Typography
          variant="h5"
          style={{ marginTop: "20px", fontSize: "24px", color: "red" }}
        >
          ₹ {data.price}
        </Typography>
        <Box width="50%" mt={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="quantity"
            label="Enter Quantity"
            type="number"
            id="quantity"
            autoComplete="quantity"
            value={quantity}
            onChange={(event) => setQuantity(+event.target.value)}
          />
        </Box>
        <Button variant='contained' disabled={data.availableItems === 0} color='primary' style={{marginTop: '20px'}} onClick={() => props.history.push(`/order/${data._id}/${quantity}`)}>Place Order</Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
