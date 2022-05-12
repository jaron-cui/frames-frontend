import React, { useState, useEffect } from "react";
import GameListing from "./GameListing";

export default props => {


  

  return <div>
    <div style={{marginInline:'20px'}}>
      <GameListing name='chess' service={props.service}/>
    </div>
  </div>
}