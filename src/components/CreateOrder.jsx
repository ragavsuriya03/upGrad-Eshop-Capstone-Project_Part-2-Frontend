import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import { toast } from "react-toastify";
import { Box } from "@material-ui/core";
import ItemPreview from "./ItemPreview";
import ConfirmOrder from "./ConfirmOrder";
import productService from "../service/product.service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Items", "Select Address", "Confirm Order"];
}

function getStepContent(
  itemId,
  quantity,
  step,
  address,
  setAddress
) {
  switch (step) {
    case 0:
      return (
        <ItemPreview id={itemId} quantity={quantity}/>
      )
    case 1:
      return (
        <AddressForm
          address={address}
          onAddressChange={(value) => setAddress(value)}
        />
      );
    case 2:
      return <ConfirmOrder id={itemId} quantity={quantity} addressId={address.value}/>
  }
}

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [orderAction, setOrderAction] = useState(false);

  useEffect(() => {
    async function createOrder() {
      if (!orderAction) {
        return;
      }

      try {
        console.log(props)
        const { data: response } = await productService.createOrder(address.value, props.match.params.id, props.match.params.quantity);
        toast.success(`Order placed successfully`);
        props.history.push('/products')
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setOrderAction(false);
        props.history.push('/products');
      }
    }

    createOrder();
  }, [orderAction]);

  const steps = getSteps();

  const handleNext = () => {
    if(activeStep === steps.length - 1) {
      setOrderAction(true);
      return;
    }
  
    if(activeStep === 1) {
        if(!address) {
            toast.error('Please select address!');
            return;
        }
    }   
    
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Order placed successfully!
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(
                props.match.params.id,
                props.match.params.quantity,
                activeStep,
                address,
                setAddress
              )}
            </Typography>
            <Box display='flex' flexDirection='row' justifyContent='center'>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
