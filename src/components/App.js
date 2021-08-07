import "./../App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { Route, Redirect, Switch } from "react-router-dom";
import AppBar from "./AppBar";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/ProtectedRoute";
import AddProductForm from "./AddProduct";
import EditProductForm from "./EditProduct";
import CreateOrder from "./CreateOrder";

function App() {

  return (
    <>
      <ToastContainer />
      <AppBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute adminOnly={true} path="/add-product" component={AddProductForm}  />
        <ProtectedRoute adminOnly={true} path="/modify-product/:id" component={EditProductForm}  />
        <ProtectedRoute adminOnly={false} path="/order/:id/:quantity" component={CreateOrder}  />
        <ProtectedRoute adminOnly={false} path="/" component={Home} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
}

export default App;
