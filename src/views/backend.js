

//import axios from "axios";
//import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Button
} from "reactstrap";

function ExternalSite() {
return (
    <div className="content">
      <CardHeader><Button onClick={ () => window.location = 'https://dfkreport.antonyip.com'} >Goto: https://dfkreport.antonyip.com</Button></CardHeader>
      <Card className="content" color="grey">
        <iframe src="https://dfkreport.antonyip.com" title="Webpage Backend" height="900" > </iframe>
      </Card>
    </div>
  );
}

export default ExternalSite;