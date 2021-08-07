import { Box, Button, Divider, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import authService from "../service/auth.service";
import httpService from "../service/http.service";
import AddressDetails from "./AddressDetails";
import ItemPreview from "./ItemPreview";

const ConfirmOrder = ({ id, quantity, addressId }) => {
  //console.log(addressId);
  const [address, setAddress] = useState({});
  useEffect(() => {
    async function getAddressDetails() {
      const { data } = await httpService.get(
        "http://localhost:8080/api/addresses",
        {
          headers: {
            "x-auth-token": authService.getToken(),
          },
        }
      );
      setAddress(data.find((el) => el._id === addressId));
    }

    getAddressDetails();
  }, []);
  return (
    <>
      <Paper>
        <Box height="60vh" display="flex" justifyContent="space-evenly">
          <Box width="60%">
            <ItemPreview id={id} quantity={quantity} imageDisplay={false} />
          </Box>
          <Divider orientation="vertical" />
          <Box width="35%">
            <AddressDetails data={address} />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ConfirmOrder;
