import { Box, Typography } from "@material-ui/core";

const AddressDetails = ({ data }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h4" style={{ marginTop: "40px", marginBottom: "10px" }}>
        Address Details :
      </Typography>
      <div>{data.name}</div>
      <div>Contact Number: {data.contactNumber}</div>
      <div>
        {data.street}, {data.city}
      </div>
      <div>{data.state}</div>
      <div>{data.zipCode}</div>
      <div>{data.landmark}</div>
    </Box>
  );
};

export default AddressDetails;
