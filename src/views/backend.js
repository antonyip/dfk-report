

//import axios from "axios";
//import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  Button
} from "reactstrap";

function ExternalSite() {
return (
    <div className="content">
      <Card className="content" color="grey">
        <Button onClick={ () => window.location = 'https://dfkreport.antonyip.com'} >Goto: https://dfkreport.antonyip.com</Button>
        {/* <Button to='https://dfkreport.antonyip.com' >Goto: https://dfkreport.antonyip.com</Button> */}
      </Card>
    </div>
  );
}

export default ExternalSite;