import React, { useRef } from 'react';
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
import { useForm, Controller, errors, watch } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

export default function InputForm({ inputs, submitFxn, modalToggle, submitDisable }) {
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
      marginBottom: 0,
      width: '100%'
    },
    fullWidth: {
      width: '100%'
    }
  }));
  

  const classes = useStyles();
  const { register, handleSubmit, errors, control, watch } = useForm()
  const password = useRef({});
  password.current = watch("password", "")

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form 
          className={classes.form} 
          noValidate onSubmit={
            (e) => {
              e.preventDefault()
              handleSubmit((data)=> {
                console.log(data)
                submitFxn(data)
              })();
              // modalToggle();
            }
          }
        >
          <Grid container spacing={3}>
            {
              inputs.map((input)=> {
                if(input.type === 'text') {
                  input.validations === undefined ? input.validations = {} : null
                  return(
                    <Grid item sm={input.sm} xs={input.xs}>
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
                        multiline={!!input.multiline}
                        rows={4}
                        rowsMax={5}
                        defaultValue={input.startVal ? input.startVal : ''}
                      />
                      {errors[input.key] && <p className='ajs-form-error'>{input.errorMessage}</p>}
                    </Grid>
                  )
                }
                if(input.type === 'password') {
                  
                  input.validations === undefined ? input.validations = {} : null
                  input.key === 'repeat_password' ? input.validations.validate = (value) => value === watch('password', '') : undefined
                  return(
                    <Grid item sm={input.sm} xs={input.xs}>
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
                        multiline={!!input.multiline}
                        rows={4}
                        rowsMax={5}
                        defaultValue={input.startVal ? input.startVal : ''}
                        type = "password"
                      />
                      {errors[input.key] && (
                        <p className='ajs-form-error'>{errors[input.key].message}</p>
                      )}
                    </Grid>
                  )
                }
                if(input.type === 'repeat_password') {
                  input.validations === undefined ? input.validations = {} : null
                  return(
                    <Grid item sm={input.sm} xs={input.xs}>
                      <TextField
                        inputRef={register({validate: (value) => value === password.current || 'The passwords do not match'})}
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth
                        id={input.name}
                        label={input.name}
                        name={input.key}
                        autoFocus
                        className={classes.input}
                        multiline={!!input.multiline}
                        rows={4}
                        rowsMax={5}
                        defaultValue={input.startVal ? input.startVal : ''}
                        type = "password"
                      />
                      {errors[input.key] && (
                        <p className='ajs-form-error'>The passwords do not match</p>
                      )}
                    </Grid>
                  )
                }
                if(input.type === 'dropdown') {
                  input.validations === undefined ? input.validations = {} : null
                  const startVal = input.startVal ? input.startVal : ''
                  const [selectInput, setSelectInput] = React.useState(startVal)
                  const handleChange = (event) => {
                    setSelectInput(event.target.value);
                  };
                  console.log('startval', selectInput)
                  return(
                    <Grid item sm={input.sm} xs={input.xs}>
                      <div classname="ajs-select-wont-100">
                      <FormControl variant="outlined" className={classes.input}>
                        <InputLabel className={classes.fullWidth} id="demo-simple-select-outlined-label">{input.name}</InputLabel>
                        <Controller as={
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id={input.name}
                            value={selectInput}
                            onChange={handleChange}
                            label={input.name}
                            required={input.validations.required === true ? true : false}
                            margin="normal"
                            className={classes.fullWidth}
                            defaultValue={startVal}
                          >
                            {input.selectValues.map((value) => {
                              return <MenuItem name={input.key} value={value}>{value}</MenuItem>
                            })}
                          </Select>
                        }
                        control={control}
                        name={input.key}
                        className="ajs-select-wont-100"
                        rules={input.validations}
                      />
                      </FormControl>
                      {errors[input.key] && (
                        <p className='ajs-form-error'>{input.errorMessage}</p>
                      )}
                    </div>
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
            disabled={submitDisable}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}