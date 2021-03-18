import React from 'react';

// import statements Material-UI
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const styles = (theme) => ({
  heading: {
    color: '#FF0000',
  },
  card: {
    height: 100,
  },
});

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth='sm'>
        <Typography className={classes.heading} variant='h3'>
          Profile
        </Typography>
        <Card className={classes.card}></Card>
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
