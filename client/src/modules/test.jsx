if(input.type === 'dropdown') {
  input.validations === undefined ? input.validations = {} : null
  const [selectInput, setSelectInput] = React.useState('')
  const handleChange = (event) => {
    setSelectInput(event.target.value);
  };
  return(
    <Grid item sm={input.sm}>
      <div classname="ajs-select-wont-100">
      {/* <FormControl required className={classes.formControl}>
        <InputLabel variant="outlined" id="demo-simple-select-outlined-label">{input.name}</InputLabel>
        <Select
          
          
          onChange={handleChange}
          name={input.key}
          autoFocus
          required={input.validations.required === true ? true : false}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">
            <em>{input.name}</em>
          </MenuItem>
          {input.selectValues.map((value) => {
            return <MenuItem value={value}>{value}</MenuItem>
          })}
        </Select>
      </FormControl> */}
      <FormControl classname={classes.fullwidth} variant="outlined" className={classes.input}>
        <InputLabel className={classes.fullWidth} id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          inputRef={register(input.validations)}
          labelId="demo-simple-select-outlined-label"
          id={input.name}
          value={selectInput}
          name={input.key}
          onChange={handleChange}
          label={input.name}
          required={input.validations.required === true ? true : false}
          fullWidth
          margin="normal"
          className={classes.fullWidth}
        >
          <MenuItem className={classes.fullWidth} value="">
            <em>persuasion</em>
          </MenuItem>
          {input.selectValues.map((value) => {
            return <MenuItem value={value}>{value}</MenuItem>
          })}
        </Select>
      </FormControl>
      {errors[input.name] && (
        <p className='ajs-form-error'>{input.errorMessage}</p>
      )}
    </div>
    </Grid>
  )
}