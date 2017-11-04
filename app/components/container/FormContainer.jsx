import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const FormContainer = (props) => {
  return (
    <MuiThemeProvider>
	    <div id="outer">
		  	<center id="inner">
		  		{props.children}
		  	</center>
	  	</div>
  	</MuiThemeProvider>
  )
}
export default FormContainer;
