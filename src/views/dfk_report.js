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
  Row,
  Col,
  Input,
  Collapse,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Spinner,
  CardSubtitle,
  CardFooter,
  InputGroupText,
  InputGroup,
} from "reactstrap";

function StandardHeader(props){
  return (
    <Col xs='8'>
      <Row>
      <Col xs='8'>
        <CardTitle tag='h2'>{props.TITLE}</CardTitle>
        <CardSubtitle>{props.SUBTITLE}</CardSubtitle>
      </Col>
      {
        props.showUSD === true ?
        <Col xs='4' tag='h4'>Profits: ${ ( Math.round(props.PROFITS * 100) / 100 ).toFixed(2) }</Col>
        :
        <Col xs='4' tag='h4'></Col>
      }
      </Row>
    </Col>
  );
}

// returns true if ok
function FilterDate(value, filterStart, filterEnd) {

  if (filterEnd === '' || filterEnd.length !== 10) {filterEnd = '3000-01-01'}
  if (filterStart === '' || filterStart.length !== 10 ) {filterStart = '1900-01-01'}

  var dateYear = parseInt([value[0],value[1],value[2],value[3]].join(''))
  var startDateYear = parseInt([filterStart[0],filterStart[1],filterStart[2],filterStart[3]].join(''))
  var endDateYear = parseInt([filterEnd[0],filterEnd[1],filterEnd[2],filterEnd[3]].join(''))
  var dateMonth = parseInt([value[5],value[6]].join(''))
  var startDateMonth = parseInt([filterStart[5],filterStart[6]].join(''))
  var endDateMonth = parseInt([filterEnd[5],filterEnd[6]].join(''))  
  var dateDay = parseInt([value[8],value[9]].join(''))
  var startDateDay = parseInt([filterStart[8],filterStart[9]].join(''))
  var endDateDay = parseInt([filterEnd[8],filterEnd[9]].join(''))

  var epoch = dateYear * 365 + dateMonth * 12 + dateDay
  var startEpoch = startDateYear * 365 + startDateMonth * 12 + startDateDay
  var endEpoch = endDateYear * 365 + endDateMonth * 12 + endDateDay

  if (epoch >= startEpoch && epoch <= endEpoch) return true

  return false
}

function QuestRewardRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.CONTRACT_NAME}</Col><Col>{props.VALUE}</Col><Col>{props.VALUE_USD}</Col></Row>);
}

function QuestRewardsPage(props){

  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Quest Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);
//{"BLOCK_TIMESTAMP":"2021-12-08 03:28:27.000","ETH_CONTRACT_ADDRESS":"0x24ea0d436d3c2602fbfefbe6a16bbc304c963d04"
//,"CONTRACT_NAME":"Serendale_Gaia Tears","FROM_ADDRESS":"0x0000000000000000000000000000000000000000"
//,"TO_ADDRESS":"0x7ad760d9402df0f78786ca0b323a911cb1b6ee41","L.EVENT_INPUTS:VALUE":4,"CALCULATED_VALUE":4
//,"TX_ID":"0x457ce826b25a8f45b6ab02dc87bb1bed52b0e3c0ffbbe8e98bdfd40c68db7031","AMOUNT_USD":0.7923936523}
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>CONTRACT_NAME</Col><Col>VALUE</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalAmountUSD = 0;
  props.data.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalAmountUSD += element.AMOUNT_USD;
    rows.push(
      <QuestRewardRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      CONTRACT_NAME={element.CONTRACT_NAME}
      VALUE={element.CALCULATED_VALUE}
      VALUE_USD={(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)}
      ></QuestRewardRows>
      )
    }
    });

  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>
    <Row xs='12'>
      <StandardHeader 
      TITLE="Quest Rewards"
      SUBTITLE="List of all tranasactions related to obtaining Quest Rewards."
      PROFITS={totalAmountUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(1) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <CardBody>
    <Collapse isOpen={toggle1}>
        {rowHeaders}
        {rows}
    </Collapse>
    </CardBody>
    </Card>
  );

  
}

function SwapsRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.FROM_TOKEN}</Col><Col>{props.FROM_AMOUNT}</Col><Col>{props.TO_TOKEN}</Col><Col>{props.TO_AMOUNT}</Col><Col>{props.VALUE_USD}</Col></Row>);
}

function SwapsPage(props){

  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Market Trade Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

  /*
  {"BLOCK_TIMESTAMP":"2021-12-19 06:24:38.000","POOL_NAME":"JEWEL-WONE LP","AMOUNT0IN":0,"AMOUNT1IN":100,"AMOUNT0OUT":2.023784523,"AMOUNT1OUT":0
  ,"TOKEN0_ADDRESS":"0x72cb10c6bfa5624dd07ef608027e366bd690048f","TOKEN0_NAME":"Jewels","TOKEN0_SYMBOL":"JEWEL"
  ,"TOKEN1_ADDRESS":"0xcf664087a5bb0237a0bad6742852ec6c8d69a27a","TOKEN1_NAME":"Wrapped ONE","TOKEN1_SYMBOL":"WONE","AMOUNT_USD":20.804260373}
  */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>FROM_TOKEN</Col><Col>FROM_AMOUNT</Col><Col>TO_TOKEN</Col><Col>TO_AMOUNT</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var id = 0;
  props.data.data.forEach(element => {
    ++id;
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    rows.push(
      <SwapsRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      FROM_TOKEN={ element.AMOUNT0IN > 0 ? element.TOKEN0_NAME : element.TOKEN1_NAME}
      TO_TOKEN={ element.AMOUNT0OUT > 0 ? element.TOKEN0_NAME : element.TOKEN1_NAME}
      FROM_AMOUNT={ element.AMOUNT0IN + element.AMOUNT1IN }
      TO_AMOUNT={ element.AMOUNT0OUT + element.AMOUNT1OUT }
      VALUE_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></SwapsRows>
      )
    }
    });

  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
  return (
    <Card>
    <CardHeader>
    <Row>
    <StandardHeader 
      TITLE="Market/DEX Trades"
      SUBTITLE="List of all tranasactions related to trading on the Market/DEX."
      PROFITS={-99}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(2) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <CardBody>
    <Collapse isOpen={toggle1}>
      {rowHeaders}
      {rows}
    </Collapse>
    </CardBody>
    </Card>
  );
}

function ItemRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.FROM_TOKEN}</Col><Col>{props.FROM_AMOUNT}</Col><Col>{props.TO_TOKEN}</Col><Col>{props.TO_AMOUNT}</Col><Col>{props.VALUE_USD}</Col></Row>);
}

function ItemsPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Items Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    //{"BLOCK_TIMESTAMP":"2021-12-22 23:20:42.000","TX_ID":"0x5b75eb4a6743e9cf86aaf9ab0930650941e98240f45bb39d6ebf7af0f861d564"
    //,"FROM_TOKEN":"Bloater","FROM_AMOUNT":1,"FROM_SYMBOL":"DFKBLOATER"
    //,"TO_TOKEN":"Gold","TO_AMOUNT":2.5,"TO_SYMBOL":"DFKGOLD","AMOUNT_USD":0},
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>FROM_TOKEN</Col><Col>FROM_AMOUNT</Col><Col>TO_TOKEN</Col><Col>TO_AMOUNT</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUSD = 0;
  props.data.data.forEach(element => {
    ++id;
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    totalUSD+=element.AMOUNT_USD
    rows.push(
      <ItemRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      FROM_TOKEN={ element.FROM_TOKEN }
      TO_TOKEN={ element.TO_TOKEN }
      FROM_AMOUNT={ element.FROM_AMOUNT }
      TO_AMOUNT={ element.TO_AMOUNT }
      VALUE_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></ItemRows>
      )
    }
    });

  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
  return (
    <Card>
    <CardHeader>    
    <Row>
      <StandardHeader 
      TITLE="Items"
      SUBTITLE="List of all tranasactions related to buying and from the gold shop."
      PROFITS={totalUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(3) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <CardBody>
    <Collapse isOpen={toggle1}>
      {rowHeaders}
      {rows}
    </Collapse>
    </CardBody>
    </Card>
  );
}

function BankRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.JEWEL_IN}</Col><Col>{props.XJEWEL_OUT}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function BankRows2(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.XJEWEL_IN}</Col><Col>{props.JEWEL_OUT}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function BankPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.dataDeposit === '' || props.dataWithdraw === '')
    return (<Card><CardBody>Loading Banking Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.dataDeposit === 'error' || props.dataWithdraw === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-20 08:04:37.000","TX_ID":"0xed27c496f5f8905695a677e3d3270e93035f97f1abb2dbbe696faab585051a86"
    ,"JEWEL_IN":0.04563048279,"XJEWEL_OUT":0.02788210816,"AMOUNT_USD":0.5612889832}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>JEWEL_IN</Col><Col>XJEWEL_OUT</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUSD = 0;
  props.dataDeposit.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUSD -= element.AMOUNT_USD;
    rows.push(
      <BankRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      JEWEL_IN={ element.JEWEL_IN }
      XJEWEL_OUT={ element.XJEWEL_OUT }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></BankRows>
      )
    }
    });

    /*
    [{"BLOCK_TIMESTAMP":"2021-12-22 22:45:47.000","TX_ID":"0x879855de258fa4a08522433e1cdabc59923f2ebbc6d092cea6b3e223daa6557c"
    ,"XJEWEL_IN":0.001639404922,"JEWEL_OUT":0.001,"AMOUNT_USD":0.01312701974}]
    */
  var rowHeaders2 = <Row><Col>BLOCK_TIMESTAMP</Col><Col>XJEWEL_IN</Col><Col>JEWEL_OUT</Col><Col>AMOUNT_USD</Col></Row>
  var rows2 = [];
  props.dataWithdraw.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUSD += element.AMOUNT_USD;
    rows2.push(
      <BankRows2 key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      XJEWEL_IN={ element.XJEWEL_IN }
      JEWEL_OUT={ element.JEWEL_OUT }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></BankRows2>
      )
    }
    });
    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    if (rows2.length === 0) rows2.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
  return (
    <Card>
    <CardHeader>
    <Row>
    <StandardHeader 
      TITLE="Banking"
      SUBTITLE="List of all tranasactions related to the bank."
      PROFITS={totalUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(4) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardHeader>Deposits</CardHeader>
    <Card>
    <CardBody>
      {rowHeaders}
      {rows}
      </CardBody>
    </Card>
    <CardHeader>Withdraws</CardHeader>
    <Card>
      <CardBody>
      {rowHeaders2}
      {rows2}
      </CardBody>
    </Card>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
    
  );
}

function SeedsRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.T0_NAME}</Col><Col>{props.AMOUNT_0}</Col><Col>{props.T1_NAME}</Col><Col>{props.AMOUNT_1}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function SeedsPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.dataAdd === '' || props.dataRemove === '')
    return (<Card><CardBody>Loading Seeds Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.dataAdd === 'error' || props.dataRemove === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-19 06:25:28.000","TX_ID":"0x7a742b32b17df0c94c7d1279f39597869358658bbadc8a15ea68190432929657"
    ,"AMOUNT_0":2.023784523,"AMOUNT_1":99.6958464,"LP_ADDRESS":"0xeb579ddcd49a7beb3f205c9ff6006bb6390f138f"
    ,"T0_ADDRESS":"0x72cb10c6bfa5624dd07ef608027e366bd690048f"
    ,"T1_ADDRESS":"0xcf664087a5bb0237a0bad6742852ec6c8d69a27a","T0_NAME":"Jewels","T1_NAME":"Wrapped ONE"}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>TOKEN_0_NAME</Col><Col>AMOUNT_0</Col><Col>TOKEN_1_NAME</Col><Col>AMOUNT_1</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUsd = 0;
  props.dataAdd.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUsd-=element.AMOUNT_USD
    rows.push(
      <SeedsRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      T0_NAME={ element.T0_NAME }
      AMOUNT_0={ element.AMOUNT_0 }
      T1_NAME={ element.T1_NAME }
      AMOUNT_1={ element.AMOUNT_1 }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></SeedsRows>
      )
    }
    });

    /*
    [{"BLOCK_TIMESTAMP":"2021-12-22 22:45:47.000","TX_ID":"0x879855de258fa4a08522433e1cdabc59923f2ebbc6d092cea6b3e223daa6557c"
    ,"XJEWEL_IN":0.001639404922,"JEWEL_OUT":0.001,"AMOUNT_USD":0.01312701974}]
    */
  var rowHeaders2 = <Row><Col>BLOCK_TIMESTAMP</Col><Col>TOKEN_0_NAME</Col><Col>AMOUNT_0</Col><Col>TOKEN_1_NAME</Col><Col>AMOUNT_1</Col><Col>AMOUNT_USD</Col></Row>
  var rows2 = [];
  props.dataRemove.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUsd+=element.AMOUNT_USD
    rows2.push(
      <SeedsRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      T0_NAME={ element.T0_NAME }
      AMOUNT_0={ element.AMOUNT_0 }
      T1_NAME={ element.T1_NAME }
      AMOUNT_1={ element.AMOUNT_1 }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></SeedsRows>
      )
    }
    });
    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    if (rows2.length === 0) rows2.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
  return (
    <Card>
    <CardHeader>
    <Row>
    <StandardHeader 
      TITLE="Seeds"
      SUBTITLE="List of all tranasactions related to the creating and splitting of seeds."
      PROFITS={totalUsd}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(10) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardHeader>Create Seed</CardHeader>
    <Card>
    <CardBody>
      {rowHeaders}
      {rows}
      </CardBody>
    </Card>
    <CardHeader>Split Seed</CardHeader>
    <Card>
      <CardBody>
      {rowHeaders2}
      {rows2}
      </CardBody>
    </Card>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
    
  );
}

function HarvestRow(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.LOCKED_JEWEL}</Col><Col>{props.UNLOCKED_JEWEL}</Col><Col>{props.LOCKED_JEWEL_USD}</Col><Col>{props.UNLOCKED_JEWEL_USD}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function HarvestPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Harvest Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-20 08:04:08.000","TX_ID":"0x79aef63a59db8cd36e9f468564c37b50abd22a52737c9be554729f5aa4aa117c"
    ,"UNLOCKED_JEWEL":0.07861227143,"LOCKED_JEWEL":0.05267022186,"UNLOCKED_JEWEL_USD":0.966989591
    ,"LOCKED_JEWEL_USD":0.647883026,"AMOUNT_USD":1.614872617}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>LOCKED_JEWEL</Col><Col>UNLOCKED_JEWEL</Col><Col>LOCKED_JEWEL_USD</Col><Col>UNLOCKED_JEWEL_USD</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUSD = 0;
  props.data.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUSD+=element.UNLOCKED_JEWEL_USD;
    rows.push(
      <HarvestRow key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      LOCKED_JEWEL={ element.LOCKED_JEWEL }
      UNLOCKED_JEWEL={ element.UNLOCKED_JEWEL }
      LOCKED_JEWEL_USD={ element.LOCKED_JEWEL_USD }
      UNLOCKED_JEWEL_USD={ (Math.round(element.UNLOCKED_JEWEL_USD * 100) / 100).toFixed(2) }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></HarvestRow>
      )
    }
    });

    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    
  return (
    <Card>
    <CardHeader>
    <Row>
    <StandardHeader 
      TITLE="Harvests"
      SUBTITLE="Tranasactions related to Harvesting. (Only Unlocked Jewel are considered in the profits)"
      PROFITS={totalUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(5) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardHeader>Deposits</CardHeader>
    <Card>
    <CardBody>
      {rowHeaders}
      {rows}
      </CardBody>
    </Card>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
  );
}


function HeroLevelRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.HERO_ID}</Col><Col>{props.RUNE_AMOUNT}</Col><Col>{props.JEWEL_AMOUNT}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function HeroLevelUpPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Level-Up Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    // MULTILINED
    /*
    {"BLOCK_TIMESTAMP":"2021-12-26 10:50:35.000","TX_ID":"0x779631b6728173ad801a3afb4a9a00f66def8cdb14a69bd2f439465e95dfd6d5"
    ,"HERO_ID":"0x0000000000000000000000000000000000000000000000000000000000008825"
    ,"RUNE_AMOUNT":null,"JEWEL_AMOUNT":null,"RUNE_PRICE_USD":null,"JEWEL_PRICE_USD":null,"AMOUNT_USD":null}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>HERO_ID</Col><Col>RUNE_AMOUNT</Col><Col>JEWEL_AMOUNT</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUSD = 0;
  props.data.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
  ++id;
  totalUSD -= element.AMOUNT_USD;
  rows.push(
    <HeroLevelRows key={id}
    BLOCK_TIMESTAMP={ element.BLOCK_TIMESTAMP }
    HERO_ID={ parseInt(element.HERO_ID,16) }
    RUNE_AMOUNT={ element.RUNE_AMOUNT }
    JEWEL_AMOUNT={ element.JEWEL_AMOUNT }
    AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
    ></HeroLevelRows>
    )
  }
  });
      
  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
  return (
    <Card>
    <CardHeader>
      <Row>
      <StandardHeader 
      TITLE="Hero Level-Ups"
      SUBTITLE="List of all tranasactions for Leveling heroes."
      PROFITS={ totalUSD }
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(6) }>Download</Button></Col>
      </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardBody>
      {rowHeaders}
      {rows}
    </CardBody>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
  );
}

function HeroSummonRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.CRYSTAL_ID}</Col><Col>{props.TEARS_AMOUNT}</Col><Col>{props.JEWEL_AMOUNT}</Col><Col>{props.HERO_ID}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function HeroSummonPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.dataCrystal === '' || props.dataHero === '')
    return (<Card><CardBody>Loading Summon Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.dataCrystal === 'error' || props.dataHero === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-08 06:55:34.000","CRYSTAL_ID":"0x000000000000000000000000000000000000000000000000000000000000c6fc"
    ,"TEARS_AMOUNT":80,"JEWEL_AMOUNT":66,"TX_ID":"0xebe9bbe07918be8e926b64e16bb06278514ac7b30fe80a7357c7295b6dd40861"
    ,"JEWEL_AMOUNT_USD":470.422191199,"TEAR_AMOUNT_USD":32.05944,"AMOUNT_USD":502.481631199}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>CRYSTAL_ID</Col><Col>TEARS_AMOUNT</Col><Col>JEWEL_AMOUNT</Col><Col>HERO_ID</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUSD = 0;
  var lookup = []

  props.dataHero.data.forEach(element => {
    lookup.push([element.CRYSTAL_ID, element.HERO_ID])
  });

  props.dataCrystal.data.forEach(element => {
    var heroMaybe = lookup.find( x => x[0] === element.CRYSTAL_ID)
    var hero_id = 'unsummoned';
    if (heroMaybe) { hero_id = heroMaybe[1] }
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUSD -= element.AMOUNT_USD;
    rows.push(
      <HeroSummonRows key={id}
      BLOCK_TIMESTAMP={ element.BLOCK_TIMESTAMP }
      CRYSTAL_ID={ parseInt(element.CRYSTAL_ID,16) }
      TEARS_AMOUNT={ element.TEARS_AMOUNT }
      JEWEL_AMOUNT={ element.JEWEL_AMOUNT }
      HERO_ID={ hero_id }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></HeroSummonRows>
      )
    }
    });
  

    //console.log(dataSearch);
    /*
    {"TX_ID":"0x22273d84b67218c7f28504588035d87b7593c4326f413bdda9a90d424bc01d21","HERO_ID":60215
    ,"CRYSTAL_ID":"0x000000000000000000000000000000000000000000000000000000000000c6fc","BLOCK_TIMESTAMP":"2021-12-08 06:56:08.000"
    */

    
  
    
    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    
    
  return (
    <Card>
    <CardHeader>
      <Row>
      <StandardHeader 
      TITLE="Summons"
      SUBTITLE="List of all tranasactions for summoning heroes."
      PROFITS={totalUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(7) }>Download</Button></Col>
      </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardHeader>Summon Crystal</CardHeader>
    <Card>
    <CardBody>
      {rowHeaders}
      {rows}
    </CardBody>
    </Card>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
  );
}


function HeroRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.TOKEN_ID}</Col><Col>{props.JEWELS_COST}</Col><Col>{props.VALUE_USD}</Col></Row>);
}

function HeroPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.dataBuy === '' || props.dataSold === '')
    return (<Card><CardBody>Loading Heros Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.dataBuy === 'error' || props.dataSold === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);
//[{"BLOCK_TIMESTAMP":"2021-12-22 23:03:21.000"
//,"TX_ID":"0x719556da488b79ae4cc3fc575bd1c9b81388dcdece3edd70892b2ecc3a99d4cc"
//,"JEWELS_PAID":41,"TOKEN_ID":77012}]
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>TOKEN_ID</Col><Col>JEWELS_COST</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var rowsSold = [];
  var id = 0;
  var totalUSD = 0
  props.dataBuy.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUSD -= element.AMOUNT_USD;
    rows.push(
      <HeroRows key={id}
      BLOCK_TIMESTAMP={ element.BLOCK_TIMESTAMP }
      TOKEN_ID={ element.TOKEN_ID }
      JEWELS_COST={ element.JEWELS_PAID }
      BOUGHT="BOUGHT"
      VALUE_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></HeroRows>
      )
    }
    });
//{"BLOCK_TIMESTAMP":"2021-12-09 15:42:12.000","AMOUNT":144.375,"BUYER":"0x25c4bb26f5651e125c46b8092a81c6167d24f02f"
//,"TX_ID":"0x4bcb39ac48cdbd95c3ea7d64773384c63f18564d4b53a13e233c59435424e761"
//,"TOKENID":"0x000000000000000000000000000000000000000000000000000000000000e86b"
//,"AMOUNT_USD":1058.460472665}
    props.dataSold.data.forEach(element => {
      if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
      {
      ++id;
      totalUSD += element.AMOUNT_USD;
      rowsSold.push(
        <HeroRows key={id}
        BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
        TOKEN_ID={ parseInt(element.TOKENID) }
        JEWELS_COST={ element.AMOUNT }
        BOUGHT="SOLD"
        VALUE_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
        ></HeroRows>
        )
      }
      });

      if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
      if (rowsSold.length === 0) rowsSold.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
  return (
    <Card>
    <CardHeader>
      <Row>
      <StandardHeader 
      TITLE="Heroes"
      SUBTITLE="List of all tranasactions for buying and selling heroes."
      PROFITS={totalUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(8) }>Download</Button></Col>
      </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardBody>
    <Card>
    <CardHeader>Hero Bought</CardHeader>
    <CardBody>
      {rowHeaders}
      {rows}
    </CardBody>
    </Card>
    <Card>
    <CardHeader>Hero Sold</CardHeader>
    <CardBody> 
      {rowHeaders}
      {rowsSold}
    </CardBody>
    </Card>
    </CardBody>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
  );
}

function HeroRentalIncomeRow(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.RENTER_ADDRESS}</Col><Col>{props.JEWEL_AMOUNT}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function HeroRentalIncomePage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Hero Rental Data...  <Spinner></Spinner></CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-09 15:21:58.000","JEWEL_AMOUNT":28.875,"USER_ADDRESS":"0x4808e6541f88ba5f75ba9654369613c9ae19d718"
    ,"RENTER_ADDRESS":"0x3913ab3d32368a4716d7e3378c0e0fc648e7689c","TX_ID":"0x7d3f4f15ca3bba740a62e80e981e9864bd93bf3e5cb0a0270659fc05fef38ea1"
    ,"AMOUNT_USD":211.692094533}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>RENTER_ADDRESS</Col><Col>JEWEL_AMOUNT</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  var totalUSD = 0;
  props.data.data.forEach(element => {
    if (true === FilterDate(element.BLOCK_TIMESTAMP, props.startDate, props.endDate))
    {
    ++id;
    totalUSD+=element.AMOUNT_USD;
    rows.push(
      <HeroRentalIncomeRow key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      RENTER_ADDRESS={ element.RENTER_ADDRESS }
      JEWEL_AMOUNT={ element.JEWEL_AMOUNT }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></HeroRentalIncomeRow>
      )
    }
    });

    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    
  return (
    <Card>
    <CardHeader>
    <Row>
    <StandardHeader 
      TITLE="Hero Rental"
      SUBTITLE="List of all tranasactions related to heroes rented from you to summon."
      PROFITS={totalUSD}
      showUSD={true}
      ></StandardHeader>
      <Col xs='1'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      <Col xs='1'><Button onClick={() => props.download(9) }>Download</Button></Col>
    </Row>
    </CardHeader>
    <Collapse isOpen={toggle1}>
    <CardHeader>Rental Income</CardHeader>
    <Card>
    <CardBody>
      {rowHeaders}
      {rows}
      </CardBody>
    </Card>
    </Collapse>
    <CardFooter></CardFooter>
    </Card>
  );
}

function OverallPage(props)
{
  //const [toggle1,setToggle1] = useState(true);
  var total = props.QuestRewardsPage + 
  props.SwapsPage + 
  props.ItemsPage + 
  props.BankPage + 
  props.HarvestPage + 
  props.HeroPage + 
  props.HeroLevelUpPage + 
  props.HeroSummonPage

  return (
    <Card>
    <CardHeader>
      <CardTitle tag='h2'>Overall Account Status</CardTitle>
      {/* <CardSubtitle>A Summary of your account from 2021-DEC-08 to 2021-DEC-30</CardSubtitle> */}
    </CardHeader>
    <CardBody>
    <Row tag='h3'><Col xs='2'>Total Profits: </Col><Col xs='6'>${(Math.round(total * 100) / 100).toFixed(2)}</Col></Row>
    
    {/* <Row><Col xs='2'>QuestRewards: </Col><Col xs='6'>{props.QuestRewardsPage}</Col></Row>
    <Row><Col xs='2'>Swaps: </Col><Col xs='6'>{props.SwapsPage}</Col></Row>
    <Row><Col xs='2'>Items: </Col><Col xs='6'>{props.ItemsPage}</Col></Row>
    <Row><Col xs='2'>Bank: </Col><Col xs='6'>{props.BankPage}</Col></Row>
    <Row><Col xs='2'>Harvest: </Col><Col xs='6'>{props.HarvestPage}</Col></Row>
    <Row><Col xs='2'>Hero: </Col><Col xs='6'>{props.HeroPage}</Col></Row>
    <Row><Col xs='2'>HeroLevelUp: </Col><Col xs='6'>{props.HeroLevelUpPage}</Col></Row>
    <Row><Col xs='2'>HeroSummon: </Col><Col xs='6'>{props.HeroSummonPage}</Col></Row> */}
    
    </CardBody>
    <CardFooter></CardFooter>
    </Card>
  );
}


function Dfk_Report() {
  const [searchText, setSearchText] = useState('');
  const [firstTimeOnPage, setFirstTimeOnPage] = useState(true);

  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');

  const [questData, setQuestData] = useState('');
  const [searchActivatedQuest, setSearchActivatedQuest] = useState(0);
  
  const [swapData, setSwapData] = useState('');
  const [searchActivatedSwaps, setSearchActivatedSwaps] = useState(0);

  const [itemData, setItemData] = useState('');
  const [searchActivatedItems, setSearchActivatedItems] = useState(0);

  const [heroSoldData, setHeroSoldData] = useState('');
  const [searchActivatedHeroSold, setSearchActivatedHeroSold] = useState(0);

  const [heroBuyData, setHeroBuyData] = useState('');
  const [searchActivatedHeroBuy, setSearchActivatedHeroBuy] = useState(0);

  const [bankingTxData, setBankingTxData] = useState('');
  const [searchActivatedBankingTxData, setSearchActivatedBankingTxData] = useState(0);

  const [harvestData, setHarvestData] = useState('');
  const [searchActivatedHarvestData, setSearchActivatedHarvestData] = useState(0);

  const [heroRentalData, setHeroRentalData] = useState('');
  const [searchActivatedHeroRentalData, setSearchActivatedHeroRentalData] = useState(0);
  
  const [bankingTxData2, setBankingTxData2] = useState('');
  const [searchActivatedBankingTxData2, setSearchActivatedBankingTxData2] = useState(0);

  const [heroLevelData, setHeroLevelData] = useState('');
  const [searchActivatedHeroLevelData, setSearchActivatedHeroLevelData] = useState(0);

  const [heroSummonData, setHeroSummonData] = useState('');
  const [searchActivatedHeroSummonData, setSearchActivatedHeroSummonData] = useState(0);

  const [crystalSummonData, setCrystalSummonData] = useState('');
  const [searchActivatedCrystalSummonData, setSearchActivatedCrystalSummonData] = useState(0);

  const [seedsAddData, setSeedsAddData] = useState('');
  const [searchActivatedSeedsAddData, setSearchActivatedSeedsAddData] = useState(0);

  const [seedsRemoveData, setSeedsRemoveData] = useState('');
  const [searchActivatedSeedsRemoveData, setSearchActivatedSeedsRemoveData] = useState(0);

  const [checkIfAllSearchAreDone, setCheckIfAllSearchAreDone] = useState(false);

  const triggerSearchFinal = e => {
    setFirstTimeOnPage(false);
    setSearchActivatedQuest(1);
    setSearchActivatedSwaps(1);
    setSearchActivatedItems(1);
    setSearchActivatedHeroSold(1);
    setSearchActivatedHeroBuy(1);
    setSearchActivatedBankingTxData(1);
    setSearchActivatedBankingTxData2(1);
    setSearchActivatedHeroSummonData(1);
    setSearchActivatedHeroLevelData(1);
    setSearchActivatedCrystalSummonData(1);
    setSearchActivatedHarvestData(1);
    setSearchActivatedHeroRentalData(1);
    setSearchActivatedSeedsAddData(1);
    setSearchActivatedSeedsRemoveData(1);

    setQuestData('');
    setSwapData('');
    setItemData('');
    setHeroSoldData('');
    setHeroBuyData('');
    setBankingTxData('');
    setBankingTxData2('');
    setHeroSummonData('');
    setHeroLevelData('');
    setCrystalSummonData('');
    setHarvestData('');
    setHeroRentalData('');
    setSeedsAddData('');
    setSeedsRemoveData('');

    setValueQuestRewardsPage(0); // overall page total
    setCheckIfAllSearchAreDone(false);
  }

  const FuncCheckIfAllSearchAreDone = () =>
  {
    if (searchActivatedQuest !== 0) return false;
    if (searchActivatedSwaps !== 0) return false;
    if (searchActivatedItems !== 0) return false;
    if (searchActivatedHeroSold !== 0) return false;
    if (searchActivatedHeroBuy !== 0) return false;
    if (searchActivatedBankingTxData !== 0) return false;
    if (searchActivatedHarvestData !== 0) return false;
    if (searchActivatedBankingTxData2 !== 0) return false;
    if (searchActivatedHeroLevelData !== 0) return false;
    if (searchActivatedHeroSummonData !== 0) return false;
    if (searchActivatedCrystalSummonData !== 0) return false;
    if (searchActivatedHeroRentalData !== 0) return false;
    if (searchActivatedSeedsAddData !== 0) return false;
    if (searchActivatedSeedsRemoveData !== 0) return false;
    
    if (questData === 'error' ) return false;
    if (swapData === 'error' ) return false;
    if (itemData === 'error' ) return false;
    if (heroSoldData === 'error' ) return false;
    if (heroBuyData === 'error' ) return false;
    if (bankingTxData === 'error' ) return false;
    if (harvestData === 'error' ) return false;
    if (bankingTxData2 === 'error' ) return false;
    if (heroLevelData === 'error' ) return false;
    if (heroSummonData === 'error' ) return false;
    if (crystalSummonData === 'error' ) return false;
    if (heroRentalData === 'error' ) return false;
    if (seedsAddData === 'error' ) return false;
    if (seedsRemoveData === 'error' ) return false;

    setCheckIfAllSearchAreDone(true);
    return true;
  }
  
  const triggerSearchButton = e => {
    triggerSearchFinal();
  }

  const triggerSearch = e => {
    if (e.key === 'Enter')
    {
      triggerSearchFinal();
    }
  }

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/quest-rewards?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setQuestData('error');
      }
      else
      {
        setQuestData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedQuest(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedQuest]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/token-swaps?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setSwapData('error');
      }
      else
      {
        setSwapData(res);
        FuncCheckIfAllSearchAreDone();
      }
      
      setSearchActivatedSwaps(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedSwaps]);

  // item-txs
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/item-txs?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setItemData('error');
      }
      else
      {
        setItemData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedItems(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedItems]);

  // hero-buy
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/hero-buy?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setHeroBuyData('error');
      }
      else
      {
        setHeroBuyData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedHeroBuy(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHeroBuy]);

  // hero-sold
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/hero-sold?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setHeroSoldData('error');
      }
      else
      {
        setHeroSoldData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedHeroSold(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHeroSold]);

  // harvests
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/seeds-harvests?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setHarvestData('error');
      }
      else
      {
        setHarvestData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedHarvestData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHarvestData]);

  // bank-deposit
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/bank-deposit?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setBankingTxData('error');
      }
      else
      {
        setBankingTxData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedBankingTxData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedBankingTxData]);
  
  // bank-withdraw
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/bank-withdraw?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setBankingTxData2('error');
      }
      else
      {
        setBankingTxData2(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedBankingTxData2(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedBankingTxData2]);
  
  // crystal-summon
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/crystal-summon?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setCrystalSummonData('error');
      }
      else
      {
        setCrystalSummonData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedCrystalSummonData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedCrystalSummonData]);

  // hero-level
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/hero-level-up?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setHeroLevelData('error');
      }
      else
      {
        setHeroLevelData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedHeroLevelData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHeroLevelData]);

    // hero-summon
    useEffect( () => {
      axios.get("https://dfkreport.antonyip.com/hero-summon?q=" + searchText )
      .then( res => {
        if (res.data === 'Invalid User Address!')
        {
          setHeroSummonData('error');
        }
        else
        {
          setHeroSummonData(res);
          FuncCheckIfAllSearchAreDone();
        }
        setSearchActivatedHeroSummonData(0);
      })
      // eslint-disable-next-line
    }, [searchActivatedHeroSummonData]);

    // hero-rental-income
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/hero-rent-income?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setHeroRentalData('error');
      }
      else
      {
        setHeroRentalData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedHeroRentalData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHeroRentalData]);

  // setSeedsAddData
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/seeds-add-lp?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setSeedsAddData('error');
      }
      else
      {
        setSeedsAddData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedSeedsAddData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedSeedsAddData]);

  // setSeedsRemoveData
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/seeds-remove-lp?q=" + searchText )
    .then( res => {
      if (res.data === 'Invalid User Address!')
      {
        setSeedsRemoveData('error');
      }
      else
      {
        setSeedsRemoveData(res);
        FuncCheckIfAllSearchAreDone();
      }
      setSearchActivatedSeedsRemoveData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedSeedsRemoveData]);

  

    var [ questDataCSV, setquestDataCSV] = useState([]);
    var [ swapDataCSV, setswapDataCSV] = useState([]);
    var [ itemDataCSV, setitemDataCSV] = useState([]);
    var [ heroTxDataCSV, setheroTxDataCSV] = useState([]);
    var [ heroRentalDataCSV, setHeroRentalDataCSV ] = useState([]);
    var [ bankDataCSV, setbankDataCSV] = useState([]);
    var [ harvestDataCSV, setharvestDataCSV] = useState([]);
    var [ heroLevelDataCSV, setheroLevelDataCSV] = useState([]);
    var [ heroSummonDataCSV, setheroSummonDataCSV] = useState([]);
    var [ seedsDataCSV, setseedsDataCSV] = useState([]);
    
    // overall-page
    useEffect( () => {
      if (checkIfAllSearchAreDone === true 
        && questData !== '' 
        && swapData !== ''
        && itemData !== ''
        && heroSoldData !== ''
        && heroBuyData !== ''
        && bankingTxData !== ''
        && harvestData !== ''
        && bankingTxData2 !== ''
        && heroLevelData !== ''
        && heroSummonData !== ''
        && crystalSummonData !== ''
        && heroRentalData !== ''
        && seedsAddData !== ''
        && seedsRemoveData !== ''
        )
      {
        var totalAmountUSD = 0;
        // 1 - quest
        var localDataCSV = ['BLOCK_TIMESTAMP,CONTRACT_NAME,AMOUNT,AMOUNT_USD']
        questData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
            totalAmountUSD += element.AMOUNT_USD;
            let row = [element.BLOCK_TIMESTAMP,element.CONTRACT_NAME,element.CALCULATED_VALUE,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
            localDataCSV.push(row)
          }
        });
        setquestDataCSV(localDataCSV);
        // 2 - swaps
        localDataCSV = ['BLOCK_TIMESTAMP,FROM_TOKEN,FROM_AMOUNT,TO_TOKEN,TO_AMOUNT,VALUE_USD']
        swapData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          //totalAmountUSD += element.AMOUNT_USD;
          localDataCSV.push([element.BLOCK_TIMESTAMP
            ,element.AMOUNT0IN > 0 ? element.TOKEN0_NAME : element.TOKEN1_NAME
            ,element.AMOUNT0OUT > 0 ? element.TOKEN0_NAME : element.TOKEN1_NAME
            ,element.AMOUNT0IN + element.AMOUNT1IN
            ,element.AMOUNT0OUT + element.AMOUNT1OUT
            ,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)
          ].join(','))
          }
          });
        setswapDataCSV(localDataCSV)
        // 3 - item trades
        localDataCSV = ['BLOCK_TIMESTAMP,FROM_TOKEN,FROM_AMOUNT,TO_TOKEN,TO_AMOUNT,VALUE_USD']
        itemData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD += element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.FROM_TOKEN,element.FROM_AMOUNT,element.TO_TOKEN,element.TO_AMOUNT,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setitemDataCSV(localDataCSV);

        // 4- banking
        localDataCSV = ['BLOCK_TIMESTAMP,JEWEL_IN,XJEWEL_OUT,AMOUNT_USD']
        // deposits
        bankingTxData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD -= element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.JEWEL_IN,element.XJEWEL_OUT,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        localDataCSV.push('BLOCK_TIMESTAMP,XJEWEL_IN,JEWEL_OUT,AMOUNT_USD')
        // withdrawals
        bankingTxData2.data.forEach(element => {
          totalAmountUSD += element.AMOUNT_USD;
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          let row = [element.BLOCK_TIMESTAMP,element.XJEWEL_IN,element.JEWEL_OUT,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setbankDataCSV(localDataCSV);

        // 5 -harvests
        localDataCSV = ['BLOCK_TIMESTAMP,LOCKED_JEWEL,UNLOCKED_JEWEL,LOCKED_JEWEL_USD,UNLOCKED_JEWEL_USD,AMOUNT_USD']
        harvestData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD -= element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.LOCKED_JEWEL,element.UNLOCKED_JEWEL,element.LOCKED_JEWEL_USD,element.UNLOCKED_JEWEL_USD,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setharvestDataCSV(localDataCSV)
        
        // 6 -hero level data
        localDataCSV = ['BLOCK_TIMESTAMP,HERO_ID,RUNE_AMOUNT,JEWEL_AMOUNT,AMOUNT_USD']
        heroLevelData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD -= element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.HERO_ID,element.RUNE_AMOUNT,element.JEWEL_AMOUNT,(Math.round(-element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setheroLevelDataCSV(localDataCSV);

        // 7 - summons
        var crystalherolookup = []
        heroSummonData.data.forEach(element => {
          crystalherolookup.push([element.CRYSTAL_ID,element.HERO_ID])
        });

        localDataCSV = ['BLOCK_TIMESTAMP,CRYSTAL_ID,TEARS_AMOUNT,JEWEL_AMOUNT,HERO_ID,AMOUNT_USD'];
        crystalSummonData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD -= element.AMOUNT_USD;
          var found = crystalherolookup.find(x => x[0] === element.CRYSTAL_ID)
          var hero_id = 0;
          if (found) {hero_id = found[1]}
          let row = [element.BLOCK_TIMESTAMP,element.CRYSTAL_ID,element.TEARS_AMOUNT,element.JEWEL_AMOUNT,hero_id,(Math.round(-element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setheroSummonDataCSV(localDataCSV);

        // 8 - hero buy sell
        localDataCSV = ['BLOCK_TIMESTAMP,TOKEN_ID,JEWEL_COST,VALUE_USD']
        heroBuyData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD -= element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.TOKEN_ID,element.JEWELS_PAID,(Math.round(-element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        heroSoldData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD += element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.TOKENID,element.AMOUNT,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setheroTxDataCSV(localDataCSV);

        // 9 - hero rental income
        localDataCSV = ['BLOCK_TIMESTAMP,RENTER_ADDRESS,JEWEL_AMOUNT,AMOUNT_USD']
        heroRentalData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD += element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.RENTER_ADDRESS,element.JEWEL_AMOUNT,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setHeroRentalDataCSV(localDataCSV)

        // 10 - seeds data seedsDataCSV
        localDataCSV = ['BLOCK_TIMESTAMP,TOKEN_0_NAME,AMOUNT_0,TOKEN_1_NAME,AMOUNT_1,AMOUNT_USD']
        seedsAddData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD -= element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.T0_NAME,element.AMOUNT_0,element.T1_NAME,element.AMOUNT_1,(Math.round(-element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        localDataCSV.push('BLOCK_TIMESTAMP,TOKEN_0_NAME,AMOUNT_0,TOKEN_1_NAME,AMOUNT_1,AMOUNT_USD')
        seedsRemoveData.data.forEach(element => {
          if (true === FilterDate(element.BLOCK_TIMESTAMP, startDate, endDate))
          {
          totalAmountUSD += element.AMOUNT_USD;
          let row = [element.BLOCK_TIMESTAMP,element.T0_NAME,element.AMOUNT_0,element.T1_NAME,element.AMOUNT_1,(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)].join(',');
          localDataCSV.push(row)
          }
        });
        setseedsDataCSV(localDataCSV)
        
          
        setValueQuestRewardsPage(totalAmountUSD);
      }
    }, [checkIfAllSearchAreDone
      ,startDate
      ,endDate
      ,questData
      ,swapData
      ,itemData
      ,heroBuyData
      ,heroSoldData
      ,bankingTxData
      ,harvestData
      ,bankingTxData2
      ,heroLevelData
      ,heroSummonData
      ,crystalSummonData
      ,heroRentalData
      ,seedsAddData
      ,seedsRemoveData
    ]);
      
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }
   
  const exportToCsv = (e) => {
    console.log(e);
    if (e === 0)
    {
      downloadFile({
        data: [
          ...questDataCSV,
          ...swapDataCSV,
          ...itemDataCSV,
          ...heroTxDataCSV,
          ...bankDataCSV,
          ...seedsDataCSV,
          ...harvestDataCSV,
          ...heroLevelDataCSV,
          ...heroSummonDataCSV,
          ...heroRentalDataCSV
        ].join('\n'),
        fileName: 'CombinedCSV.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 1)
    {
      downloadFile({
        data: questDataCSV.join('\n'),
        fileName: 'questData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 2)
    {
      downloadFile({
        data: swapDataCSV.join('\n'),
        fileName: 'swapData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 3)
    {
      downloadFile({
        data: itemDataCSV.join('\n'),
        fileName: 'itemData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 4)
    {
      downloadFile({
        data: bankDataCSV.join('\n'),
        fileName: 'bankTxData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 5)
    {
      downloadFile({
        data: harvestDataCSV.join('\n'),
        fileName: 'harvestData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 6)
    {
      downloadFile({
        data: heroLevelDataCSV.join('\n'),
        fileName: 'heroLevelData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 7)
    {
      downloadFile({
        data: heroSummonDataCSV.join('\n'),
        fileName: 'heroSummonData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 8)
    {
      downloadFile({
        data: heroTxDataCSV.join('\n'),
        fileName: 'heroTxData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 9)
    {
      downloadFile({
        data: heroRentalDataCSV.join('\n'),
        fileName: 'heroRentalData.csv',
        fileType: 'text/csv',
      })
    }
    if (e === 10)
    {
      downloadFile({
        data: seedsDataCSV.join('\n'),
        fileName: 'seedsData.csv',
        fileType: 'text/csv',
      })
    }
  }

  const [valueQuestRewardsPage, setValueQuestRewardsPage] = useState(0);
  // const [valueSwapsPage, setValueSwapsPage] = useState(0);
  // const [valueItemsPage, setValueItemsPage] = useState(0);
  // const [valueBankPage, setValueBankPage] = useState(0);
  // const [valueHarvestPage, setValueHarvestPage] = useState(0);
  // const [valueHeroPage, setValueHeroPage] = useState(0);
  // const [valueHeroLevelUpPage, setValueHeroLevelUpPage] = useState(0);
  // const [valueHeroSummonPage, setValueHeroSummonPage] = useState(0);
   
  return (
      <div className="content">
        <CardHeader>
          <CardTitle tag='h2'>Enter your address and press enter to see a summary of your wallet...</CardTitle>
          <CardSubtitle>Querying will take about 5 minutes to generate your report...</CardSubtitle>
          <Row>
          <Col xs='6'>
          <InputGroup>
            <InputGroupText>
              Address
            </InputGroupText>
            <Input placeholder="0x..." value={searchText} onKeyDown={triggerSearch} onChange={ e => { setSearchText(e.target.value.toLowerCase()) }}></Input>
            </InputGroup>
          </Col>
          <Col xs='3'>
          <InputGroup>
            <InputGroupText>
              Start Date
            </InputGroupText>
            <Input placeholder="YYYY-MM-DD" value={startDate} onChange={ e => { setStartDate(e.target.value)} }></Input>
          </InputGroup>
          </Col>
          <Col xs='3'>
          <InputGroup>
            <InputGroupText>
              End Date
            </InputGroupText>
            <Input placeholder="YYYY-MM-DD" value={endDate} onChange={ e => { setEndDate(e.target.value)} }></Input>
          </InputGroup>
          </Col>
          </Row>
          <Button onClick={triggerSearchButton}>Search!</Button>
          <Button onClick={() => exportToCsv(0)} disabled={!checkIfAllSearchAreDone}>Download Generated Transcript</Button>
        </CardHeader>
        <OverallPage 
         QuestRewardsPage={valueQuestRewardsPage}
         SwapsPage={0}
         ItemsPage={0}
         BankPage={0} 
         HarvestPage={0}
         HeroPage={0} 
         HeroLevelUpPage={0} 
         HeroSummonPage={0}
         >
         </OverallPage>
        { firstTimeOnPage === true ? 
        <>
          <CardHeader tag='h4'>Enter your address on top...</CardHeader><Card><CardBody><Col>Awaiting input...</Col><Col>...or you can use my account to play with my site: 0x0ba43bae4613e03492e4c17af3b014b6c3202b9d</Col><Col>Tips are welcomed too...</Col></CardBody><CardFooter></CardFooter></Card>
        </>
        : 
        <>
        <QuestRewardsPage data={questData} download={exportToCsv} startDate={startDate} endDate={endDate} ></QuestRewardsPage>
        <SwapsPage data={swapData} download={exportToCsv} startDate={startDate} endDate={endDate}></SwapsPage>
        <ItemsPage data={itemData} download={exportToCsv} startDate={startDate} endDate={endDate}></ItemsPage>
        <BankPage dataDeposit={bankingTxData} dataWithdraw={bankingTxData2} download={exportToCsv} startDate={startDate} endDate={endDate}></BankPage>
        <SeedsPage dataAdd={seedsAddData} dataRemove={seedsRemoveData} download={exportToCsv} startDate={startDate} endDate={endDate}></SeedsPage>
        <HarvestPage data={harvestData} download={exportToCsv} startDate={startDate} endDate={endDate}></HarvestPage>
        <HeroPage dataBuy={heroBuyData} dataSold={heroSoldData} download={exportToCsv} startDate={startDate} endDate={endDate}></HeroPage>
        <HeroLevelUpPage data={heroLevelData} download={exportToCsv} startDate={startDate} endDate={endDate}></HeroLevelUpPage>
        <HeroSummonPage dataCrystal={crystalSummonData} dataHero={heroSummonData} download={exportToCsv} startDate={startDate} endDate={endDate}></HeroSummonPage>
        <HeroRentalIncomePage data={heroRentalData} download={exportToCsv} startDate={startDate} endDate={endDate}></HeroRentalIncomePage>
        </>
        }
      </div>
  );
}

export default Dfk_Report;
