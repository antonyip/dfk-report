

//import axios from "axios";
//import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  //Row,
  Col,
} from "reactstrap";

function ExternalSite() {
return (
  <div className="content">     
      <CardHeader>About me</CardHeader>
      <Card>  
        <CardBody>
          <CardTitle>hello there, just an ordinary developer looking to build stuffs for fun..</CardTitle>
          <Col>Most things here are experimental.. If I won the grand price, I would probably be able to finish the whole site in about ~3 months</Col>
          <Col>The whole site consists of 3 parts..</Col>
          <Col>1. snowflake database - Part of MetricsDAO</Col>
          <Col>2. nodejs endpoint (https://dfkreport.antonyip.com)</Col>
          <Col>3. this frontend webpage</Col>
          </CardBody>
        <CardFooter>... nothing else is here...</CardFooter>
      </Card>

      <CardHeader>Features... FRONTEND</CardHeader>
      <Card>
        <CardBody>
            <Col>Quest Rewards</Col>
            <Col>DEX Transactions</Col>
            <Col>Item (DFKGOLD) Transactions</Col>
            <Col>Banking/Staking Transactions</Col>
            <Col>Hero Buys and Sells</Col>
            <Col>Hero Summons</Col>
            <Col>Hero Level ups</Col>
            <Col>USD Calculations of all transactions</Col>
            <Col>Harvests</Col>
            <Col>Sum of some columns.. some stuffs not too sure how to calculate yet</Col>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>

      <CardHeader>Features... BACKEND</CardHeader>
      <Card>
        <CardBody>
          <Col>token-price-one - historical price of one</Col>
          <Col>token-price-jewel - historical price of jewel</Col>
          <Col>quest-rewards - </Col>
          <Col>hero-buy - </Col>
          <Col>hero-level-up - </Col>
          <Col>hero-deposit - </Col>
          <Col>hero-sold - </Col>
          <Col>hero-summon - </Col>
          <Col>crystal-summon - </Col>
          <Col>bank-deposit - </Col>
          <Col>bank-withdraw - </Col>
          <Col>seeds-harvests - </Col>
          <Col>token-swaps - </Col>
          <Col>item-txs - </Col>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>
      
      <CardHeader>Incomplete Features... FRONTEND</CardHeader>
      <Card>
        <CardBody>
            <Col>Seeds/LP Stuffs</Col>
            <Col>Summon Rental Income</Col>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>

      <CardHeader>Incomplete Features... BACKEND</CardHeader>
      <Card>
        <CardBody>
            <Col>LP/Seeds</Col>
            <Col>Summon Rental Income</Col>
            <Col>Gen 0 Hero Stuffs? Not sure where to look</Col>
            <Col>backfill data, currently backend only has data since 8 Dec 2021</Col>
            <Col>better historical Gaia Tears price</Col>
            <Col>better historical rune prices</Col>
            <Col>automation to update database tables</Col>
            <Col>documentation</Col>
            <Col>testing framework</Col>
            <Col>development framework</Col>
            <Col>summary of total spent in amount_usd or other currencies</Col>
            <Col>value_usd perhaps round it to 2 decimals</Col>
            <Col>Download Report as CSV</Col>
            <Col>use terra exchange rate to convert prices</Col>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>
  </div>
  );
}

export default ExternalSite;