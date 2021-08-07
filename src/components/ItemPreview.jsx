import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import productService from "../service/product.service";

const ItemPreview = ({id, quantity, imageDisplay=true}) => {

    const history= useHistory();
    const [data, setData] = useState({});

    useEffect(() => {
        if (!id) {
          history.push("/products");
        }
    
        async function getProductDetails() {
          try {
            const { data } = await productService.getProductDetails(id);
            setData(data);
          } catch (error) {
            //console.log(error);
            history.push("/products");
          }
        }
    
        getProductDetails();
      }, []);

      return (
        <Box display="flex" mt={5} justifyContent='center'>
          {imageDisplay && <Box height="90%">
            <img src={data.imageURL} alt={data.name} height="400px" />
          </Box>}
          <Box marginLeft={2}>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" style={{ marginRight: "20px" }}>
                {data.name}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              style={{ marginTop: "10px", fontSize: "16px" }}
            >
              Quantity: <b>{quantity}</b>
            </Typography>
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
              style={{ marginTop: "20px", fontSize: "24px", color: 'red' }}
            >
              Total Price : ₹ {+data.price * +quantity}
            </Typography>
          </Box>
        </Box>
      );
    
}
 
export default ItemPreview;