import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';

export default function InputForm({ inputs, submitFxn }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      height: 56
    },
    input: {
      marginTop: 0,
      marginBottom: 0
    }
  }));
  

  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm()
  console.log('inputs', inputs)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form 
          className={classes.form} 
          noValidate onSubmit={
            (e) => {
              e.preventDefault()
              handleSubmit((data)=> submitFxn(data))();
              modalToggle();
            }
          }
        >
          <Grid container spacing={3}>
            {
              inputs.map((input)=> {
                if(input.type === 'text') {
                  input.validations === undefined ? input.validations = {} : null
                  return(
                    <Grid item sm={input.sm}>
                      <TextField
                        inputRef={register(input.validations)}
                        variant="outlined"
                        margin="normal"
                        required={input.validations.required === true ? true : false}
                        fullWidth
                        id={input.name}
                        label={input.name}
                        name={input.key}
                        autoFocus
                        className={classes.input}
                      />
                      {errors[input.name] && (
                        <p className='ajs-form-error'>{input.errorMessage}</p>
                      )}
                    </Grid>
                  )
                }
              })
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

