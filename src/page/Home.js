import React, { useState, useEffect } from "react";
import GameListing from "./GameListing";
import Navigation from "./Navigation";

export default function Home(props) {


  

  return <div>
    <Navigation />  
    <div style={{marginInline:'20px'}}>
      <GameListing name='Chess'/>
    </div>
  </div>
}