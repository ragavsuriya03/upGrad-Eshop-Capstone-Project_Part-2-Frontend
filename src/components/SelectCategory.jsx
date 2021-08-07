import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import http from "../service/http.service";
import productService from "../service/product.service";

const SelectCategory = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await productService.getAllCategories();
        setCategories(data.map((el) => ({ value: el, label: el })));
      } catch (ex) {
        console.log(ex);
      }
    }

    getCategories();
  }, []);

  return (
    <CreatableSelect
      styles={{
        // Fixes the overlapping problem of the component
        control: (provided) => ({...provided, backgroundColor: 'none'}),
        menu: (provided) => ({ ...provided, zIndex: 9999 }),
      }}
      value={value}
      onChange={onChange}
      options={categories}
      placeholder="Select or add category..."
    />
  );
};

export default SelectCategory;
