import React from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
      height: 20,
      width: '90%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 0
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
    }
    const fillerStyles2 = {
      height: '100%',
      width: '100%',
      borderRadius: 'inherit',
      textAlign: 'left'
    }
  
    const labelStyles = {
      padding: 5,
      width:'100%',
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div id="container" style={containerStyles}>
        <div id="filler" style={fillerStyles}>&nbsp;</div>
          <div id="filler-1" style={fillerStyles2}>
          <span id="label" style={labelStyles}>{`${completed}%`}</span>
          </div>
      </div>
    );
  };
  
  export default ProgressBar;