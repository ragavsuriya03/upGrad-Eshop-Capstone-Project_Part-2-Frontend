import { Box } from "@material-ui/core";
import { Route, Switch } from "react-router";
import authService from "../service/auth.service";
import ToggleButtons from "./common/ToggleFilters";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
const Home = (props) => {

  if (!authService.isLoggedIn()) {
    props.history.push("/login");
    return;
  }

  return (
    <>
      <Box mt={2} display="flex" justifyContent="center">
        <ToggleButtons />
      </Box>
      <Switch>
        <Route path="/products" component={ProductList} />
        <Route path="/product-details/:id" component={ProductDetails} />
      </Switch>
    </>
  );
};

export default Home;
