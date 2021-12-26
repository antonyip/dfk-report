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
} from "reactstrap";


function QuestRewardRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.CONTRACT_NAME}</Col><Col>{props.VALUE}</Col><Col>{props.VALUE_USD}</Col></Row>);
}

function QuestRewardsPage(props){

  const [toggle1, setToggle1] = useState(false);

  if (props.data === '')
    return (<Card><CardBody>Loading Quest Data...</CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);
//{"BLOCK_TIMESTAMP":"2021-12-08 03:28:27.000","ETH_CONTRACT_ADDRESS":"0x24ea0d436d3c2602fbfefbe6a16bbc304c963d04"
//,"CONTRACT_NAME":"Serendale_Gaia Tears","FROM_ADDRESS":"0x0000000000000000000000000000000000000000"
//,"TO_ADDRESS":"0x7ad760d9402df0f78786ca0b323a911cb1b6ee41","L.EVENT_INPUTS:VALUE":4,"CALCULATED_VALUE":4
//,"TX_ID":"0x457ce826b25a8f45b6ab02dc87bb1bed52b0e3c0ffbbe8e98bdfd40c68db7031","AMOUNT_USD":0.7923936523}
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>CONTRACT_NAME</Col><Col>VALUE</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var id = 0;
  props.data.data.forEach(element => {
    ++id;
    rows.push(
      <QuestRewardRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      CONTRACT_NAME={element.CONTRACT_NAME}
      VALUE={element.CALCULATED_VALUE}
      VALUE_USD={(Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)}
      ></QuestRewardRows>
      )
    });

  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>
    <Row>
      <Col xs='10'>Quest Rewards - List of all tranasactions related to obtaining Quest Rewards.</Col>
      <Col xs='2'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
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
    return (<Card><CardBody>Loading Market Trade Data...</CardBody></Card>);

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
    });

  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>
    <Row>
      <Col xs='10'>Market Trades - List of all tranasactions related to buying and selling tokens.</Col>
      <Col xs='2'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
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
    return (<Card><CardBody>Loading Items Data...</CardBody></Card>);

  if (props.data === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    //{"BLOCK_TIMESTAMP":"2021-12-22 23:20:42.000","TX_ID":"0x5b75eb4a6743e9cf86aaf9ab0930650941e98240f45bb39d6ebf7af0f861d564"
    //,"FROM_TOKEN":"Bloater","FROM_AMOUNT":1,"FROM_SYMBOL":"DFKBLOATER"
    //,"TO_TOKEN":"Gold","TO_AMOUNT":2.5,"TO_SYMBOL":"DFKGOLD","AMOUNT_USD":0},
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>FROM_TOKEN</Col><Col>FROM_AMOUNT</Col><Col>TO_TOKEN</Col><Col>TO_AMOUNT</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var id = 0;
  props.data.data.forEach(element => {
    ++id;
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
    });

  if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>    
    <Row>
      <Col xs='10'>Items - List of all tranasactions related to buying and from the gold shop.</Col>
      <Col xs='2'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
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
    return (<Card><CardBody>Loading Banking Data...</CardBody></Card>);

  if (props.dataDeposit === 'error' || props.dataWithdraw === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-20 08:04:37.000","TX_ID":"0xed27c496f5f8905695a677e3d3270e93035f97f1abb2dbbe696faab585051a86"
    ,"JEWEL_IN":0.04563048279,"XJEWEL_OUT":0.02788210816,"AMOUNT_USD":0.5612889832}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>JEWEL_IN</Col><Col>XJEWEL_OUT</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var id = 0;
  props.dataDeposit.data.forEach(element => {
    ++id;
    rows.push(
      <BankRows key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      JEWEL_IN={ element.JEWEL_IN }
      XJEWEL_OUT={ element.XJEWEL_OUT }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></BankRows>
      )
    });

    /*
    [{"BLOCK_TIMESTAMP":"2021-12-22 22:45:47.000","TX_ID":"0x879855de258fa4a08522433e1cdabc59923f2ebbc6d092cea6b3e223daa6557c"
    ,"XJEWEL_IN":0.001639404922,"JEWEL_OUT":0.001,"AMOUNT_USD":0.01312701974}]
    */
  var rowHeaders2 = <Row><Col>BLOCK_TIMESTAMP</Col><Col>XJEWEL_IN</Col><Col>JEWEL_OUT</Col><Col>AMOUNT_USD</Col></Row>
  var rows2 = [];
  props.dataWithdraw.data.forEach(element => {
    ++id;
    rows2.push(
      <BankRows2 key={id}
      BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
      XJEWEL_IN={ element.XJEWEL_IN }
      JEWEL_OUT={ element.JEWEL_OUT }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></BankRows2>
      )
    });
    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    if (rows2.length === 0) rows2.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>
    <Row>
      <Col xs='10'>Banking - List of all tranasactions related to the bank.</Col>
      <Col xs='2'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
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
    </Card>
  );
}

function CrystalRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.CRYSTAL_ID}</Col><Col>{props.TEARS_AMOUNT}</Col><Col>{props.JEWEL_AMOUNT}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function HeroSummonRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.CRYSTAL_ID}</Col><Col>{props.HERO_ID}</Col><Col>{props.AMOUNT_USD}</Col></Row>);
}

function HeroSummonPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.dataCrystal === '' || props.dataHero === '')
    return (<Card><CardBody>Loading Summon Data...</CardBody></Card>);

  if (props.dataCrystal === 'error' || props.dataHero === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);

    /*
    {"BLOCK_TIMESTAMP":"2021-12-08 06:55:34.000","CRYSTAL_ID":"0x000000000000000000000000000000000000000000000000000000000000c6fc"
    ,"TEARS_AMOUNT":80,"JEWEL_AMOUNT":66,"TX_ID":"0xebe9bbe07918be8e926b64e16bb06278514ac7b30fe80a7357c7295b6dd40861"
    ,"JEWEL_AMOUNT_USD":470.422191199,"TEAR_AMOUNT_USD":32.05944,"AMOUNT_USD":502.481631199}
    */
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>CRYSTAL_ID</Col><Col>TEARS_AMOUNT</Col><Col>JEWEL_AMOUNT</Col><Col>AMOUNT_USD</Col></Row>
  var rows = [];
  var dataSearch = [];
  var id = 0;
  props.dataCrystal.data.forEach(element => {

    dataSearch.push([element.CRYSTAL_ID, (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2)]);
    ++id;
    rows.push(
      <CrystalRows key={id}
      BLOCK_TIMESTAMP={ element.BLOCK_TIMESTAMP }
      CRYSTAL_ID={ parseInt(element.CRYSTAL_ID,16) }
      TEARS_AMOUNT={ element.TEARS_AMOUNT }
      JEWEL_AMOUNT={ element.JEWEL_AMOUNT }
      AMOUNT_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></CrystalRows>
      )
    });
  

    //console.log(dataSearch);
    /*
    {"TX_ID":"0x22273d84b67218c7f28504588035d87b7593c4326f413bdda9a90d424bc01d21","HERO_ID":60215
    ,"CRYSTAL_ID":"0x000000000000000000000000000000000000000000000000000000000000c6fc","BLOCK_TIMESTAMP":"2021-12-08 06:56:08.000"
    */
  var rowHeaders2 = <Row><Col>BLOCK_TIMESTAMP</Col><Col>CRYSTAL_ID</Col><Col>HERO_ID</Col><Col>AMOUNT_USD</Col></Row>
  var rows2 = [];
    
  props.dataHero.data.forEach(element => {
    var lookup = dataSearch.find( x => x[0] === element.CRYSTAL_ID)
    var amount_usd = 0;
    if (lookup !== undefined)
    {
      amount_usd = lookup[1];
    }
    ++id;
    rows2.push(
      <HeroSummonRows key={id}
      BLOCK_TIMESTAMP={ element.BLOCK_TIMESTAMP }
      CRYSTAL_ID={ parseInt(element.CRYSTAL_ID,16) }
      HERO_ID={ element.HERO_ID }
      AMOUNT_USD={ amount_usd }
      ></HeroSummonRows>
      )
    });
    
    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
    if (rows2.length === 0) rows2.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>
      <Row>
      <Col xs='10'>Summons - List of all tranasactions for summoning heroes.</Col>
      <Col xs='2'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
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
    <CardHeader>Trade Crystal for Hero</CardHeader>
    <Card>
    <CardBody>
      {rowHeaders2}
      {rows2}
    </CardBody>
    </Card>
    </Collapse>
    </Card>
  );
}


function HeroRows(props){
  return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.TOKEN_ID}</Col><Col>{props.JEWELS_COST}</Col><Col>{props.VALUE_USD}</Col></Row>);
}

function HeroPage(props){
  const [toggle1, setToggle1] = useState(false);

  if (props.dataBuy === '' || props.dataSold === '')
    return (<Card><CardBody>Loading Heros Data...</CardBody></Card>);

  if (props.dataBuy === 'error' || props.dataSold === 'error')
    return (<Card><CardBody>Wait! That's not a EVM address!</CardBody></Card>);
//[{"BLOCK_TIMESTAMP":"2021-12-22 23:03:21.000"
//,"TX_ID":"0x719556da488b79ae4cc3fc575bd1c9b81388dcdece3edd70892b2ecc3a99d4cc"
//,"JEWELS_PAID":41,"TOKEN_ID":77012}]
  var rowHeaders = <Row><Col>BLOCK_TIMESTAMP</Col><Col>TOKEN_ID</Col><Col>JEWELS_COST</Col><Col>VALUE_USD</Col></Row>
  var rows = [];
  var rowsSold = [];
  var id = 0;
  props.dataBuy.data.forEach(element => {
    ++id;
    rows.push(
      <HeroRows key={id}
      BLOCK_TIMESTAMP={ element.BLOCK_TIMESTAMP }
      TOKEN_ID={ element.TOKEN_ID }
      JEWELS_COST={ element.JEWELS_PAID }
      BOUGHT="BOUGHT"
      VALUE_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
      ></HeroRows>
      )
    });
//{"BLOCK_TIMESTAMP":"2021-12-09 15:42:12.000","AMOUNT":144.375,"BUYER":"0x25c4bb26f5651e125c46b8092a81c6167d24f02f"
//,"TX_ID":"0x4bcb39ac48cdbd95c3ea7d64773384c63f18564d4b53a13e233c59435424e761"
//,"TOKENID":"0x000000000000000000000000000000000000000000000000000000000000e86b"
//,"AMOUNT_USD":1058.460472665}
    props.dataSold.data.forEach(element => {
      ++id;
      rowsSold.push(
        <HeroRows key={id}
        BLOCK_TIMESTAMP={element.BLOCK_TIMESTAMP}
        TOKEN_ID={ parseInt(element.TOKENID) }
        JEWELS_COST={ element.AMOUNT }
        BOUGHT="SOLD"
        VALUE_USD={ (Math.round(element.AMOUNT_USD * 100) / 100).toFixed(2) }
        ></HeroRows>
        )
      });

      if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
      if (rowsSold.length === 0) rowsSold.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);

  return (
    <Card>
    <CardHeader>
      <Row>
      <Col xs='10'>Heroes - List of all tranasactions for buying and selling heroes.</Col>
      <Col xs='2'><Button onClick={() => toggle1 ? setToggle1(false) : setToggle1(true) }>Expand</Button></Col>
      </Row>
    </CardHeader>
    <CardBody>
    <Collapse isOpen={toggle1}>
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
    </Collapse>
    </CardBody>
    </Card>
  );
}


function Dfk_Report() {

  //const [activeTab, setActiveTab] = useState('1');
  const [searchText, setSearchText] = useState("0x0ba43bae4613e03492e4c17af3b014b6c3202b9d");

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
  
  const [bankingTxData2, setBankingTxData2] = useState('');
  const [searchActivatedBankingTxData2, setSearchActivatedBankingTxData2] = useState(0);

  const [heroSummonData, setHeroSummonData] = useState('');
  const [searchActivatedHeroSummonData, setSearchActivatedHeroSummonData] = useState(0);

  const [crystalSummonData, setCrystalSummonData] = useState('');
  const [searchActivatedCrystalSummonData, setSearchActivatedCrystalSummonData] = useState(0);

  const triggerSearchFinal = e => {
    console.log("Search Triggered");
    setSearchActivatedQuest(1);
    setSearchActivatedSwaps(1);
    setSearchActivatedItems(1);
    setSearchActivatedHeroSold(1);
    setSearchActivatedHeroBuy(1);
    setSearchActivatedBankingTxData(1);
    setSearchActivatedBankingTxData2(1);
    setSearchActivatedHeroSummonData(1);
    setSearchActivatedCrystalSummonData(1);
    setQuestData('');
    setSwapData('');
    setItemData('');
    setHeroSoldData('');
    setHeroBuyData('');
    setBankingTxData('');
    setBankingTxData2('');
    setHeroSummonData('');
    setCrystalSummonData('');
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
      }
      setSearchActivatedHeroSold(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHeroSold]);

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
      }
      setSearchActivatedCrystalSummonData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedCrystalSummonData]);

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
      }
      setSearchActivatedHeroSummonData(0);
    })
    // eslint-disable-next-line
  }, [searchActivatedHeroSummonData]);
  
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
  
  // const exportToJson = e => {
  //   e.preventDefault()
  //   downloadFile({
  //     data: JSON.stringify(usersData.users),
  //     fileName: 'users.json',
  //     fileType: 'text/json',
  //   })
  // }
  
  const exportToCsv = e => {
    e.preventDefault()
  
    // Headers for each column
    let headers = ['BLOCK_TIMESTAMP,FROM_TOKEN,FROM_AMOUNT,TO_TOKEN,TO_AMOUNT,AMOUNT_USD']
    
    // Convert users data to a csv
    /*
    let usersCsv = itemData.data.reduce((acc, user) => {
      const { id, name, surname, age } = user
      acc.push([id, name, surname, age].join(','))
      return acc
    }, [])
    */
    /* 
    return (<Row><Col>{props.BLOCK_TIMESTAMP}</Col><Col>{props.FROM_TOKEN}</Col><Col>{props.FROM_AMOUNT}</Col>
    <Col>{props.TO_TOKEN}</Col><Col>{props.TO_AMOUNT}</Col><Col>{props.VALUE_USD}</Col></Row>)
    */
    let usersCsv = []
    itemData.data.forEach( element => {
      usersCsv.push([element.BLOCK_TIMESTAMP, element.FROM_TOKEN, element.FROM_AMOUNT, element.TO_TOKEN, element.TO_AMOUNT, element.AMOUNT_USD].join(','))
    });
  
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'all_records.csv',
      fileType: 'text/csv',
    })
  }

  return (
      <div className="content">
        <CardHeader>
          Enter your address and press enter to see a summary of your wallet...
          <Input placeholder="0x..." value={searchText} onKeyDown={triggerSearch} onChange={ e => { setSearchText(e.target.value.toLowerCase()) }}></Input>
          <Button onClick={triggerSearchButton}>Search!</Button>
          <Button onClick={exportToCsv} disabled={false}>TODO:Download All Records</Button>
          
        </CardHeader>
        <QuestRewardsPage data={questData}></QuestRewardsPage>
        <SwapsPage data={swapData}></SwapsPage>
        <ItemsPage data={itemData}></ItemsPage>
        <BankPage dataDeposit={bankingTxData} dataWithdraw={bankingTxData2} ></BankPage>
        <HeroPage dataBuy={heroBuyData} dataSold={heroSoldData}></HeroPage>
        <HeroSummonPage dataCrystal={crystalSummonData} dataHero={heroSummonData}></HeroSummonPage>
      </div>
  );
}

export default Dfk_Report;
