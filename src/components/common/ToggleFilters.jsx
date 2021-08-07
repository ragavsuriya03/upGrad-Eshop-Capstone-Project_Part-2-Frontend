import React, { useEffect } from "react";
import {  useHistory, useLocation } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import productService from "../../service/product.service";

export default function ToggleButtons() {
  const location = useLocation();
  const history = useHistory();
  const [view, setView] = React.useState("All");
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await productService.getAllCategories();
        setCategories(["All", ...data]);
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
      let searchParams = new URLSearchParams(location.search);
      searchParams.delete("category");
      if (nextView !== "All") {
        searchParams.set("category", nextView);
      }
      history.push({
        pathname: "/products",
        search: searchParams.toString(),
      });
    }
  };

  return (
    <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
      {categories.map((category) => (
        <ToggleButton key={category} value={category} aria-label={category}>
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
