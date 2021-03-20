import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { HomeRounded, AccountCircle, LocationOn } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    alignItems: 'center',
    display: 'flex',

    color: theme.palette.primary.contrastText,
  },
  logo: {
    marginRight: theme.spacing(1),
    height: 25,
    width: 25,
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
  filler: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position='absolute' className={classes.root}>
      <Toolbar>
        <IconButton>
          <HomeRounded />
        </IconButton>
        <div className={classes.filler} />
        <IconButton>
          <LocationOn />
        </IconButton>
        <div className={classes.filler} />
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
