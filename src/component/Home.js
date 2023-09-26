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

      <span  className="colorText">Namaste💝</span><br/>
        Try the most delicious<br/>
         food <span>of the weak</span> 
        </h1>
        <h2 style={{fontFamily: 'Patrick Hand'}}>Take a seat grab a treat</h2>
     
    </div>
         <img className="image" id="img1" src="https://i.kym-cdn.com/photos/images/original/002/298/038/6a9.gifv" alt=""/>
  </div>
  )
}

export default Home