import React from 'react';
import {
  Container,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Card,
  CardMedia,
  CardContent,
  Fab,
} from '@material-ui/core';
import {
  HomeRounded,
  AccountCircle,
  LocationOn,
  Close,
  Favorite,
  AddCircle,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'between',
  },
  icon: {
    flexGrow: 1,
  },
});

class MainScreen extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Container maxWidth='md'>
          <AppBar position='absolute'>
            <Toolbar className={classes.container}>
              <IconButton className={classes.icon}>
                <HomeRounded />
              </IconButton>
              <IconButton className={classes.icon}>
                <LocationOn />
              </IconButton>
              <IconButton className={classes.icon}>
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Container>
        <Container maxWidth='md'>
          <Card>
            <CardMedia
              component='img'
              src='https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg'
            />
            <CardContent>
              <Typography>Name</Typography>
              <Typography>Price</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth='md'>
          <Fab>
            <Close />
          </Fab>
          <Fab>
            <Favorite />
          </Fab>
        </Container>

        <Container maxWidth='sm'>
          <IconButton>
            <AddCircle />
            Decide with a friend
          </IconButton>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(MainScreen);