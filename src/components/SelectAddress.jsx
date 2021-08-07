import { useEffect, useState } from "react";
import Select from "react-select";
import authService from "../service/auth.service";
import http from "../service/http.service";

const SelectAddress = ({ value, onChange, refresh }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    async function getAddresss() {
      try {
        const { data } = await http.get(
          "http://localhost:8080/api/addresses",
          {
            headers: {
              "x-auth-token": authService.getToken(),
            },
          }
        );
        setAddresses(data.map((el) => ({ value: el._id, label: el.name + "-->" + el.street + ", " + el.city })));
      } catch (error) {
        console.log(error);
      }
    }

    getAddresss();
  }, [refresh]);

  return (
    <>
      <label>Select Address</label>
      <Select
        value={value}
        onChange={onChange}
        options={addresses}
        label="Select Address"
      />
    </>
  );
};

export default SelectAddress;
