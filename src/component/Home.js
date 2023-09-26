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

      <span  className="colorText">Annyeong Haseyo</span><br/>
        Try the most delicious<br/>
         food <span>of the weak</span> 
        </h1>
        <h2 style={{fontFamily: 'Patrick Hand'}}>Take a seat grab a treat</h2>
     
    </div>
         <img className="image" id="img1" src="https://images.pexels.com/photos/7492234/pexels-photo-7492234.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt=""/>
  </div>
  )
}

export default Home