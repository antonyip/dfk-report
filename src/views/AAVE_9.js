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
  NavLink
} from "reactstrap";
import classnames from 'classnames';

function Compound_USD_Value() {

}

function AAVE_Charts() {
  const [ loading, setLoading ] = useState(true); 
  const [ error, setError ] = useState(false);
  const [ AAVEChartData, setAAVEChartData ] = useState();
  const [ AAVEChartData2, setAAVEChartData2 ] = useState();
  const [ errorData, setErrorData ] = useState(false);

  let tmpX = [];
  let tmpY = [];
  let tmpZ = [];
  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/8292ba94-5594-433f-ae54-6ff36ebd41e1/data/latest")
    .then( response => {
      response.data.map( x => {
        tmpX.push(x.DDATE.slice(0,10))
        tmpY.push(x.SSUM)
        tmpZ.push(x.CCOUNT)
      });
      setAAVEChartData({
        labels: tmpX,
        datasets: [
          {
          label: "Flashloan in USD",
          data: tmpY,
          fill: true,
          backgroundColor: "rgba(165, 52, 235,0.2)",
          borderColor: "rgba(165, 52, 235,1)"
          }
        ]
      });
      setAAVEChartData2({
        labels: tmpX,
        datasets: [
          {
          label: "Number of FlashLoans Daily",
          data: tmpZ,
          fill: true,
          backgroundColor: "rgba(165, 52, 235,0.2)",
          borderColor: "rgba(165, 52, 235,1)"
          }
        ]
      });
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading(false);
    })
  } , []);


  if (error) return <div className="content">{errorData}</div>;
  if (loading) return <div className="content">Loading...</div>;

  return (
    <>
    <Line data={AAVEChartData}></Line>
    <Line data={AAVEChartData2}></Line>
    </>
  )

}

function Compound_Charts() {
  const [ loading, setLoading ] = useState(true); 
  const [ error, setError ] = useState(false);
  const [ AAVEChartData, setAAVEChartData ] = useState();
  const [ AAVEChartData2, setAAVEChartData2 ] = useState();
  const [ errorData, setErrorData ] = useState(false);

  let tmpX = [];
  let tmpY = [];
  let tmpZ = [];
  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/810b375b-da6e-485b-9f0b-aec82d340b8f/data/latest")
    .then( response => {
      response.data.map( x => {
        tmpX.push(x.DDATE.slice(0,10))
        tmpY.push(x.SSUM)
        tmpZ.push(x.CCOUNT)
      });
      setAAVEChartData({
        labels: tmpX,
        datasets: [
          {
          label: "Flashloan in USD",
          data: tmpY,
          fill: true,
          backgroundColor: "rgba(52, 235, 52, 0.2)",
          borderColor: "rgba(52, 235, 52, 1)"
          }
        ]
      });
      setAAVEChartData2({
        labels: tmpX,
        datasets: [
          {
          label: "Number of FlashLoans Daily",
          data: tmpZ,
          fill: true,
          backgroundColor: "rgba(52, 235, 52, 0.2)",
          borderColor: "rgba(52, 235, 52, 1)"
          }
        ]
      });
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading(false);
    })
  } , []);


  if (error) return <div className="content">{errorData}</div>;
  if (loading) return <div className="content">Loading...</div>;

  return (
    <>
    <Line data={AAVEChartData}></Line>
    <Line data={AAVEChartData2}></Line>
    </>
  )

}

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

function AAVE_Transactions() {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [page, setPage] = useState(1);

  const [aave_data, aave_setData] = useState([]);
  const [aave_pageData, aave_setPageData] = useState([]);
  const [aave_page, aave_setPage] = useState(1);

  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/a33d2381-961a-43fa-b865-be8baf07ab26/data/latest")
    .then( response => {
      aave_setData(response.data);
      aave_setPageData((response.data).slice(0,20));
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading(false);
    })

  } , []);


  const prevClicked_aave = () => {
    let currentPage = aave_page;
    if (aave_page > 0) {
      aave_setPage(aave_page - 1);   
      currentPage = aave_page-1;
    }
    aave_setPageData(aave_data.slice((currentPage)*20,(currentPage+1)*20))
  }

  const nextClicked_aave = () => {
    let currentPage = aave_page;
    if (aave_page > 0) {
      aave_setPage(aave_page + 1);
      currentPage = aave_page+1;
    }
    aave_setPageData(aave_data.slice((currentPage)*20,(currentPage+1)*20))
  }

  if (error) return <div className="content">{errorData}</div>;
  if (loading) return <div className="content">Loading...</div>;

  return (
    <>
    <h1>AAVE Flash Loans</h1>
          <Row>
            <Col md="1">Block_ID</Col>
            <Col md="1">Symbol</Col>
            <Col md="2">Borrowed_Value_USD</Col>
            <Col md="2">Repaid_Value_USD</Col>
            <Col md="6">Transaction_ID</Col>
          </Row>
          { aave_pageData.map( x => {
          return (
          <Row>
          <Col md="1">{x.BLOCK_ID}</Col>
          <Col md="1">{x.SYMBOL}</Col>
          <Col md="2">{ValueWrapper(x.FLASHLOAN_AMOUNT_USD)}</Col>
          <Col md="2">{ValueWrapper(x.FLASHLOAN_AMOUNT_USD+x.PREMIUM_AMOUNT_USD)}</Col>
          <Col md="6"><a target="_blank" href={"https://etherscan.io/tx/" + x.TX_ID}>{x.TX_ID}</a></Col>
          </Row>
          );
        }) }
          <Row>
            <Col md="5"></Col>
            <Col md="1"><Button onClick={prevClicked_aave}>Prev</Button></Col>
            <Col md="1"><Button onClick={nextClicked_aave}>Next</Button></Col>
            <Col md="5"></Col>
        </Row>
    </>
  )
}

function Compound_Transactions() {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [page, setPage] = useState(1);

  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/9ff6ad23-4643-4960-89c1-14e7ac718fb3/data/latest")
    .then( response => {
      setData(response.data);
      setPageData((response.data).slice(0,20));
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading(false);
    })

  } , []);

  const prevClicked = () => {
    let currentPage = page;
    if (page > 0) {
      setPage(page - 1);   
      currentPage = page-1;
    }
    setPageData(data.slice((currentPage)*20,(currentPage+1)*20))
  }

  const nextClicked = () => {
    let currentPage = page;
    if (page > 0) {
      setPage(page + 1);
      currentPage = page + 1;
    }
    setPageData(data.slice((currentPage)*20,(currentPage+1)*20))
  }

  if (error) return <div className="content">{errorData}</div>;
  if (loading) return <div className="content">Loading...</div>;

  return (
    <>
    <h1>Compound Flash Loans</h1>
        <Row>
          <Col md="1">Block_ID</Col>
          <Col md="1">Symbol</Col>
          <Col md="2">Borrowed_Value_USD</Col>
          <Col md="2">Repaid_Value_USD</Col>
          <Col md="6">Transaction_ID</Col>
        </Row>
        { pageData.map( x => {
          return (
          <Row>
          <Col md="1">{x.Block_ID}</Col>
          <Col md="1">{x.Borrowed_Asset}</Col>
          <Col md="2">{ValueWrapper(x.Borrowed_Amount_USD)}</Col>
          <Col md="2">{ValueWrapper(x.Repaid_Amount_USD)}</Col>
          <Col md="6"><a target="_blank" href={"https://etherscan.io/tx/" + x.Transaction_ID}>{x.Transaction_ID}</a></Col>
          </Row>
          );
        }) }
        <Row>
          <Col md="5"></Col>
          <Col md="1"><Button onClick={prevClicked}>Prev</Button></Col>
          <Col md="1"><Button onClick={nextClicked}>Next</Button></Col>
          <Col md="5"></Col>
        </Row>
    </>
  )

}

function AAVE_9() {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <div className="content">
      <Nav tabs>
      <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Comparisons
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Compound Flash Loans
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            AAVE Flash Loans
          </NavLink>
        </NavItem>

      </Nav>
        <TabContent activeTab={activeTab}>
        <TabPane tabId='2'>
        <Compound_Transactions></Compound_Transactions>
        </TabPane>
        <TabPane tabId='3'>
        <AAVE_Transactions />
        </TabPane>
        <TabPane tabId='1'>
          <h1>Flash Loans - Comparison</h1>
          <Row>
            <Col md="6">
             <Row><Col md="12"><div align="center">Compound</div></Col></Row>
             <Row><Compound_Charts/></Row>
            </Col>
            <Col md="6">
             <Row><Col md="12"><div align="center">AAVE</div></Col></Row>
             <Row><AAVE_Charts/></Row>
            </Col>
          </Row>
        </TabPane>
        </TabContent>

      </div>
    </>
  );
}

export default AAVE_9;
