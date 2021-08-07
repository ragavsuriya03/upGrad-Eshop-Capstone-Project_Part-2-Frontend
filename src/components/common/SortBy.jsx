import { useHistory, useLocation } from "react-router";
import Select from "react-select";

const SortBy = (props) => {
  const history = useHistory();
  const location = useLocation();

  const sortOptions = [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Price: High to Low",
      value: "price",
    },
    {
      label: "Price: Low to High",
      value: "price1",
    },
    {
      label: "Newest",
      value: "createdAt",
    },
  ];

  return (
    <>
      <label>Sort By:</label>
      <Select
        onChange={(data) => {
          let searchParams = new URLSearchParams(location.search);
          searchParams.delete("sortBy");
          searchParams.delete("direction");
          if (data.value !== "default") {
            searchParams.set("sortBy", data.value === 'price1' ? 'price' : data.value);
            searchParams.set("direction", data.value === 'price1' ? 'asc' : 'desc')
          }

          history.push({
            pathname: "/products",
            search: searchParams.toString(),
          });
        }}
        options={sortOptions}
        label="Sort By:"
      />
    </>
  );
};

export default SortBy;
