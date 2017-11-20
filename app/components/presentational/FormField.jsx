import React from 'react'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { red600, lightBlue800, grey50, cyan600 } from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: red600,
    borderColor: red600,
  },
  underlineStyle: {
    borderColor: cyan600,
  },
  underlineFocusStyle: {
    borderColor: grey50,
  },
  floatingLabelStyle: {
    color: cyan600
  },
  floatingLabelFocusStyle: {
    color: grey50
  }
}

export const TextInputField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    className="control-input"
    {...input}
    {...custom}
    errorStyle={styles.errorStyle}
    hintStyle={styles.floatingLabelFocusStyle}
    underlineStyle={styles.underlineStyle}
    underlineFocusStyle={styles.underlineFocusStyle}
    floatingLabelStyle={styles.floatingLabelStyle}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
  />
)

export const RadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    valueSelected={input.value}
    className="styles-radio-group"
    onChange={(event, value) => input.onChange(value)}/>
)

export const RadioInput = ({ value, label }) => (
  <RadioButton 
    value={value} 
    label={label}
    labelStyle={{color:grey50}}
  />
)
