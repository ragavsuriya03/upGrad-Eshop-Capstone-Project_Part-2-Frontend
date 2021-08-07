import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import productService from "../service/product.service";
import Dialog from "./common/Dialog";
import ProductCard from "./common/ProductCard";
import SortBy from "./common/SortBy";
import ToggleButtons from "./common/ToggleFilters";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [dialogType, setDialogType] = useState("");
  const [deleteAction, setDeleteAction] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    async function searchProducts() {
      const { data } = await productService.searchProducts(
        props.location.search
      );
      setProducts(data);
    }

    searchProducts();
  }, [props.location.search, deleteAction]);

  useEffect(() => {
    async function deleteProduct() {
      if (!deleteAction) {
        return;
      }

      try {
        const { data: response } = await productService.deleteProduct(
          selectedProduct._id
        );
        toast.success(`Product ${selectedProduct.name} deleted successfully`);
      } catch (ex) {
        toast.error(ex.response.data);
      } finally {
        setDeleteAction(false);
        setSelectedProduct({});
      }
    }

    deleteProduct();
  }, [deleteAction]);

  return (
    <>
      <Box display="flex" flexDirection="column" height="60vh">
        <Box width="20%" style={{marginLeft: '65px'}}>
            <SortBy />
          </Box>
        <Box
          m={2}
          flexWrap="wrap"
          display="flex"
          justifyContent="space-evenly"
          width="95%"
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              data={product}
              onDelete={() => {
                setSelectedProduct(product);
                setDialogType("delete");
              }}
              onEdit={() =>
                props.history.push(`/modify-product/${product._id}`)
              }
              onBuy={() =>
                props.history.push(`/product-details/${product._id}`)
              }
            />
          ))}
        </Box>
        {dialogType === "delete" && (
          <Dialog
            title="Confirm deletion of product!"
            content="Are you sure you want to delete the product?"
            onClose={() => setDialogType("")}
            onConfirm={() => {
              setDeleteAction(true);
              setDialogType("");
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ProductList;
