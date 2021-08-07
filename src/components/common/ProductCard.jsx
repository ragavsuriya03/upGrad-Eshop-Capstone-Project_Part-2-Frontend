import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import authService from "../../service/auth.service";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 20,
  },
  media: {
    height: 200,
  },
  content: {
    height: 150,
    overflowY: 'auto'
  }
});

export default function ProductCard({ data, onDelete, onEdit, onBuy }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={data.name}
          className={classes.media}
          src={data.imageURL}
          title={data.name}
        />
        <CardContent className={classes.content}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h6" component="h2">
              {data.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
             ₹ {data.price}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box display="flex" width='100%' justifyContent="space-between" alignItems='center'>
          <Button size="small" variant="contained" color="primary" onClick={onBuy}>
            Buy
          </Button>
          {authService.isAdmin() && <Box>
            <IconButton onClick={onEdit}>
              <Edit />
            </IconButton>
            <IconButton onClick={onDelete}>
              <Delete />
            </IconButton>
          </Box>}
        </Box>
      </CardActions>
    </Card>
  );
}
