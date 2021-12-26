

import axios from "axios";
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  Button
} from "reactstrap";

function ExternalSite() {
return (
    <>
      <Card className="content" color="grey">
        <Button onClick={ () => window.location = 'https://dfkreport.antonyip.com'} >Goto: https://dfkreport.antonyip.com</Button>
        {/* <Button to='https://dfkreport.antonyip.com' >Goto: https://dfkreport.antonyip.com</Button> */}
      </Card>
    </>
  );
}

export default ExternalSite;