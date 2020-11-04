import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  groupPane: {
    width: "100%",
    height: 500
  }
}));

export default function GroupPane() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.groupPane}>

      </Paper>
    </div>
  )
}
