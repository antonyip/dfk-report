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
  Input
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

function mergeSortedArray(a,b){
  var tempArray = [];
  var currentPos = {
      a: 0,
      b: 0
  }
  while(currentPos.a < a.length || currentPos.b < b.length) {
      if(typeof a[currentPos.a] === 'undefined') {
          tempArray.push(b[currentPos.b++]);
      } else if(typeof b[currentPos.b] === 'undefined') {
        tempArray.push(a[currentPos.a++]);
      } else if(parseInt(a[currentPos.a].BLOCK_ID) < parseInt(b[currentPos.b].BLOCK_ID)){
          tempArray.push(b[currentPos.b++]);
      } else {
          tempArray.push(a[currentPos.a++]);
      }
  }
  return tempArray;
}

function AnalysisPage(props) {

  const { userAddress, borrowData, liquidationData, repaymentData} = props;

  

  if (borrowData == undefined || liquidationData == undefined || repaymentData == undefined) return (<div> Loading..</div>);
  let listOfBorrows = []
  let listOfLiqudations = []
  let listOfRepayments = []
  let combinedList = []

  borrowData.map( x => {
    if (x.BORROWER_ADDRESS.valueOf() === userAddress.valueOf())
    {
      x.TX_TYPE = "Borrow";
      listOfBorrows.push(x)
    }
  })

  liquidationData.map( x => {
    if (x.BORROWER.valueOf() === userAddress.valueOf())
    {
      x.TX_TYPE = "Liqudate";
      listOfLiqudations.push(x)
    }
  })

  repaymentData.map( x => {
    if (x.BORROWER.valueOf() === userAddress.valueOf())
    {
      x.TX_TYPE = "Repay";
      listOfRepayments.push(x)
    }
  })

  combinedList = mergeSortedArray(mergeSortedArray(listOfBorrows,listOfLiqudations),listOfRepayments)

  let combinedListReverse = []
  combinedList.forEach(element => {
    combinedListReverse.push(element);
  });
  combinedListReverse.reverse();
  let gBlockID = []
  let USDValues = []
  let sumValue = 0;
  combinedListReverse.map( x => {
    //if (x.SYMBOL.valueOf() ==="WETH")
    {
      gBlockID.push(x.BLOCK_ID);
      if (x.TX_TYPE.valueOf() === "Borrow".valueOf())
      {
        sumValue += x.BORROWED_USD;
      }
      else
      {
        sumValue -= x.BORROWED_USD;
      }
      USDValues.push(sumValue);
    }
  })

  const chartOptions = {
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

  const chartData = {
    labels: gBlockID,
    datasets: [
      {
          label: "Borrowed Value in USD",
          data: USDValues,
          fill: true,
          backgroundColor: "rgba(0, 100, 200, 0.2)",
          borderColor: "rgba(20, 100, 200, 1)"
      }
    ]
  }

  return (
    <>
    <br></br>
    <h3>Analysis of {userAddress}</h3>
    <Line data={chartData} options={chartOptions}></Line>
    <h2>Raw Transactions</h2>
    <Row id="titles">
            <Col md="1">Block</Col>
            <Col md="1">Type</Col>
            <Col md="2">USD</Col>
            <Col md="1">Token</Col>
            <Col md="7">Transaction ID</Col>
    </Row>
    { combinedList.map( x => {
          return (
          <Row id={x.TX_ID}>
            <Col md="1">{x.BLOCK_ID}</Col>
            <Col md="1">{x.TX_TYPE}</Col>
            <Col md="2">{ValueWrapper(x.BORROWED_USD)} USD</Col>
            <Col md="1">{x.SYMBOL}</Col>
            <Col md="7"><a target="_blank" href={"https://etherscan.io/tx/" + x.TX_ID}>{x.TX_ID}</a></Col>
          </Row>
          );
        }) }
    </>
  )
}

function AAVE_10() {

  const [activeTab, setActiveTab] = useState('1');
  const [searchText, setSearchText] = useState("0x5338035c008ea8c4b850052bc8dad6a33dc2206c");
  const [borrowData, setBorrowData] = useState();
  const [repaymentData, setRepaymentData] = useState();
  const [liquidationData, setLiquidationData] = useState();
  const [loading1, setLoading1] = useState();
  const [loading2, setLoading2] = useState();
  const [loading3, setLoading3] = useState();
  const [error, setError] = useState();
  const [errorData, setErrorData] = useState();

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const triggerSearch = e => {
    if (e.key === 'Enter')
    {
      console.log("Search Triggered");
    }
  }

  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/6d0ed568-04c0-4c52-ba82-54cf4e62504d/data/latest")
    .then( response => {
      setBorrowData(response.data);
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading1(false);
    })
  } , []);
  
  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/acccb50a-4616-4cea-a22a-d10018e71914/data/latest")
    .then( response => {
      setRepaymentData(response.data);
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading2(false);
    })
  } , []);

  useEffect( () => {
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/cf39a4c6-5dd6-45e8-ad27-a19bc935095e/data/latest")
    .then( response => {
      setLiquidationData(response.data);
    }).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading3(false);
    })
  } , []);

  if (loading1 || loading2 || loading3 ) return (<div className="content">Loading...</div>)
  if ( error ) return (<div className="content">{errorData}</div>)

  return (
    <>
      <div className="content">
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <h1>Loans - Analysis</h1>
            <p>e.g 0x9a048a7bf38306c055c05606a6010c78cfc7c1e8 or 0x5338035c008ea8c4b850052bc8dad6a33dc2206c </p>
            <Input placeholder="Search" value={searchText} onKeyDown={triggerSearch} onChange={ e => { setSearchText(e.target.value) }}></Input>
            <AnalysisPage
            userAddress={searchText} 
            borrowData={borrowData}
            liquidationData={liquidationData}
            repaymentData={repaymentData}
            ></AnalysisPage>
          </TabPane>
        </TabContent>

      </div>
    </>
  );
}

export default AAVE_10;
