import React from 'react'


import { useState } from 'react';


const Home = () => {
    // const classes = useStyles();
//   const [checked, setChecked] = useState(false);
  return (
    <div className="container" id="home">
      
     
    <div className="container1" >
    <h1 className="title">
    {/* <h1  className="appname1">HUNGR<span style={{color:"green"}}>AZy</span></h1> */}

      <span  className="colorText" style={{fontFamily:"Dancing Script, cursive" ,lineHeight:"2"}}>Namaste💝</span><br/>
      <span style={{fontFamily:" Montserrat, sans-serif",fontWeight:"4"}}>Try the most delicious<br/>
         foodof the weak.</span> 
        </h1>
        <h2 style={{fontFamily: 'Dancing Script, cursive' ,color:"white",fontWeight:"2"}}>Take a seat grab a treat</h2>
     
    </div>
         <img className="image" id="img1" src="https://pbs.twimg.com/media/FBiX-_jXIAAHh5C?format=jpg&name=large" alt=""/>
  </div>
  )
}

export default Home