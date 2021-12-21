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
// react plugin used to create charts
import {
  Line,
  Pie
} from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import classnames from 'classnames';

function ValueWrapper(value) {
  let textValue = value.toString();
  let bigText = textValue.split('.');
  let smallText = bigText[1];
  bigText = bigText[0];
  if (bigText === '0') return bigText + '.' + smallText.slice(0,3)
  if (bigText.length < 4) return bigText + ''
  if (bigText.length < 5) return bigText.slice(0,1) + 'K'
  if (bigText.length < 6) return bigText.slice(0,2) + 'K'
  if (bigText.length < 7) return bigText.slice(0,3) + 'K'

  if (bigText.length < 8) return bigText.slice(0,1) + ' M'
  if (bigText.length < 9) return bigText.slice(0,2) + ' M'
  if (bigText.length < 10) return bigText.slice(0,3) + ' M'

  if (bigText.length < 11) return bigText.slice(0,1) + ' B'
  if (bigText.length < 12) return bigText.slice(0,2) + ' B'
  if (bigText.length < 13) return bigText.slice(0,3) + ' B'

  if (bigText.length < 14) return bigText.slice(0,1) + ' T'
  if (bigText.length < 15) return bigText.slice(0,2) + ' T'
  if (bigText.length < 16) return bigText.slice(0,3) + ' T'

  return value;
}

function TotalValueLocked() {

  const [chart_TVL_Daily, setChart_TVL_Daily] = useState();
  const [chart_TVL_Total, setChart_TVL_Total] = useState();
  const [chart_Fee_Daily, setChart_Fee_Daily] = useState();
  const [chart_Fee_Total, setChart_Fee_Total] = useState();
  const [error, setError] = useState();
  const [errorData, setErrorData] = useState();
  const [loading, setLoading] = useState();
  const firstChartOptions = {
    title: { display: true, text: 'My Chart' },
    zoom: {
      enabled: true,
      mode: 'x',
    },
    pan: {
      enabled: true,
      mode: 'x',
    },
  }
  
    const mainChartClick = dataset => {
      if (!dataset.length) return;
      const datasetIndex = dataset[0].datasetIndex;
      //console.log("di",firstChart.datasets[datasetIndex].label);
    }
  
    const getElementAtEvent = element => {
  
    };
    
    let labels = []
    let stETH = []
    let ETH = []
    let stETH_Fee = []
    let ETH_Fee = []

    let stETH_sum = []
    let ETH_sum = []
    let stETH_Fee_sum = []
    let ETH_Fee_sum = []

    let fee_sum_eth = 0;
    let fee_sum_steth = 0;
    let tvl_eth = 0;
    let tvl_steth = 0;
    useEffect( () => {
      
      
      axios.get("https://api.flipsidecrypto.com/api/v2/queries/f30322ef-52b4-4fd6-a3e4-041b51bb6ff7/data/latest")
      .then( response => {
        //setData(response.data);
        response.data.map( x => {
          labels.push(x.DDATE.slice(0,10))

          ETH.push(x.NET_ETH_PROVIDED)
          stETH.push(x.NET_STETH_PROVIDED)

          tvl_eth += x.NET_ETH_PROVIDED;
          tvl_steth += x.NET_STETH_PROVIDED;

          ETH_sum.push(tvl_eth);
          stETH_sum.push(tvl_steth);

          ETH_Fee.push(x.ETH_FEES)
          stETH_Fee.push(x.STETH_FEES)

          fee_sum_eth += x.ETH_FEES;
          fee_sum_steth += x.STETH_FEES;

          ETH_Fee_sum.push(fee_sum_eth)
          stETH_Fee_sum.push(fee_sum_steth)
          
          
        })
  
        const c1 = {
          labels: labels,
          datasets: [
          {
              label: "ETH Net Deposits",
              data: ETH,
              fill: true,
              backgroundColor: "rgba(40, 40, 40, 0.2)",
              borderColor: "rgba(40, 40, 40, 1)"
          },
          {
            label: "stETH Net Deposits",
            data: stETH,
            fill: true,
            backgroundColor: "rgba(200, 160, 0, 0.2)",
            borderColor: "rgba(200, 160, 0, 1)"
        }
        ]
        };

        const c2 = {
          labels: labels,
          datasets: [
          {
              label: "ETH Net Deposits - Total",
              data: ETH_sum,
              fill: true,
              backgroundColor: "rgba(30, 30, 30, 0.2)",
              borderColor: "rgba(30, 30, 30, 1)"
          },
          {
            label: "stETH Net Deposits - Total",
            data: stETH_sum,
            fill: true,
            backgroundColor: "rgba(150, 140, 20, 0.2)",
            borderColor: "rgba(150, 140, 20, 1)"
        }
        ]
        };

        const c3 = {
          labels: labels,
          datasets: [
          {
              label: "ETH Fees Collected - Daily",
              data: ETH_Fee,
              fill: true,
              backgroundColor: "rgba(30, 30, 30, 0.2)",
              borderColor: "rgba(30, 30, 30, 1)"
          },
          {
            label: "stETH Fees Collected - Daily",
            data: stETH_Fee,
            fill: true,
            backgroundColor: "rgba(150, 140, 20, 0.2)",
            borderColor: "rgba(150, 140, 20, 1)"
        }
        ]
        };

        const c4 = {
          labels: labels,
          datasets: [
          {
              label: "ETH Fees Collected - Total",
              data: ETH_Fee_sum,
              fill: true,
              backgroundColor: "rgba(30, 30, 30, 0.2)",
              borderColor: "rgba(30, 30, 30, 1)"
          },
          {
            label: "stETH Fees Collected - Total",
            data: stETH_Fee_sum,
            fill: true,
            backgroundColor: "rgba(150, 140, 20, 0.2)",
            borderColor: "rgba(150, 140, 20, 1)"
        }
        ]
        };
  
        setChart_TVL_Daily(c1);
        setChart_TVL_Total(c2);
        setChart_Fee_Daily(c3);
        setChart_Fee_Total(c4);
  
      }).catch(error => {
        setError(true);
        setErrorData(error);
      }).finally(() => {
        setLoading(false);
      })
    } , []);
  
    if (error) return <div>{errorData}</div>;
    if (loading) return <div>Loading...</div>;
  
    return (<>
    <Row>
        <Col md="6">
     <Line data={chart_TVL_Daily} options={firstChartOptions}
        //getDatasetAtEvent={mainChartClick}
        getElementAtEvent={getElementAtEvent}
        //getElementsAtEvent={getElementsAtEvent}
      >
     </Line>
     </Col>
     <Col md="6">
     <Line data={chart_TVL_Total} options={firstChartOptions}
        //getDatasetAtEvent={mainChartClick}
        getElementAtEvent={getElementAtEvent}
        //getElementsAtEvent={getElementsAtEvent}
      >
     </Line>
     </Col>
     </Row>
     <Row>
        <Col md="6">
     <Line data={chart_Fee_Daily} options={firstChartOptions}
        //getDatasetAtEvent={mainChartClick}
        getElementAtEvent={getElementAtEvent}
        //getElementsAtEvent={getElementsAtEvent}
      >
     </Line>
     </Col>
     <Col md="6">
     <Line data={chart_Fee_Total} options={firstChartOptions}
        //getDatasetAtEvent={mainChartClick}
        getElementAtEvent={getElementAtEvent}
        //getElementsAtEvent={getElementsAtEvent}
      >
     </Line>
     </Col>
     </Row>
     {/* <div align="center"><Button onClick={resetChart}>Reset Chart</Button></div> */}
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
      {/* <Nav tabs>
      <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Metric Dashboard
          </NavLink>
        </NavItem>
      </Nav> */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <h2>Curve Free Square</h2>
            <p>In this dashboard, we take a look at how much curve has earned from the stETH-ETH Pool for the last year</p>
            <TotalValueLocked></TotalValueLocked>
            <p>The stETH-ETH pool has been around since 05 Jan 2021. It has been an interesting journey for this curve pool.</p>
            <h2>Analysis</h2>
            <p> We noticed a spike in fees gained around April 2021, Seems like it could have been from this tweet. <a href="https://twitter.com/LidoFinance/status/1382627873429807105">Link</a> </p>
            <p> In all other cases, they seem to be earning about 0-1 ETH per day with occational spike to 3-5 ETH </p>
            <h2>Conclusion</h2>
            <p>Curve has earned a total of about 215 ETH and 215 stETH from the last 9 months. That's about 1.5M in today's dollars!</p>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default Curve_Free;
