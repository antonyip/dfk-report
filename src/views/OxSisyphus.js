/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from "axios";
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from 'classnames';

function TotalValueLocked() {

  const [error, setError] = useState();
  const [errorData, setErrorData] = useState();
  const [loading, setLoading] = useState();

  const [csv, setCSV] = useState({});
  var csvText = String();

    useEffect( () => {
      axios.get("https://api.flipsidecrypto.com/api/v2/queries/397d754a-5f73-4071-bcb5-ad5439dea98d/data/latest")
      .then( response => {
        setCSV(response.data);
      }).catch(error => {
        setError(true);
        setErrorData(error);
        console.log(error);
      }).finally(() => {
        setLoading(false);
      })
    } , []);
  
    if (error) return <div>{errorData}</div>;
    if (loading) return <div>Loading...</div>;

    for (let i = 0; i < csv.length; i++) {
      csvText = csvText.concat(csv[i].DATE.toString(),",", csv[i].ETH_VOLUME.toString(),",", csv[i].PROJECT_NAME.toString(),",", csv[i].USD_VOLUME.toString(),";")
    }
    
  /*
    {
      "DATE": "2021-09-27T00:00:00Z",
      "ETH_VOLUME": 0.36879999999999996,
      "PROJECT_NAME": "Rabbit_College_Club",
      "USD_VOLUME": 1144.5356953636842
    }
  */
    
    return (<>
      <div className="content">
        {csvText}
      </div>
    </>)
  }

  
function Curve_Free() {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <div className="content">
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <TotalValueLocked></TotalValueLocked>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default Curve_Free;
