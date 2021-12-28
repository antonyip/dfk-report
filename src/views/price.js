

//import axios from "axios";
//import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Col,
} from "reactstrap";

function PriceSite() {
return (
  <div className="content">     
      <CardHeader tag='h4'>About me</CardHeader>
      <Card>  
        <CardBody>
          <CardTitle>hello there, just an ordinary developer looking to build stuffs for fun..</CardTitle>
          <Col>Most things here are experimental.. If I won the grand price, I would probably be able to finish the whole site in about ~3 months</Col>
          <Col>The whole site consists of 3 parts..</Col>
          <Col>1. snowflake database - Part of MetricsDAO</Col>
          <Col>2. nodejs endpoint (https://dfkreport.antonyip.com)</Col>
          <Col>3. this frontend webpage</Col>
          </CardBody>
        <CardFooter></CardFooter>
      </Card>

      <CardHeader tag='h4'>[FRONTEND] Features...</CardHeader>
      <Card>
        <CardBody>
            <Col>Summary Page</Col>
            <Col>Quest Rewards</Col>
            <Col>DEX Transactions</Col>
            <Col>Item (DFKGOLD) Transactions</Col>
            <Col>Banking/Staking Transactions</Col>
            <Col>Hero Buys and Sells</Col>
            <Col>Hero Summons</Col>
            <Col>Hero Level ups</Col>
            <Col>USD Calculations of all transactions</Col>
            <Col>Harvests</Col>
            <Col>Sum Amount_USD of some Columns...</Col>
            <Col>Download as CSV</Col>
            <Col>Summon Rental Income</Col>
            <Col>Filter By Dates</Col>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>

      <CardHeader tag='h4'>[BACKEND] Features... </CardHeader>
      <Card>
        <CardBody>
          <Col>Go to the site to see the end points </Col>
          <Button onClick={() => window.location = 'https://dfkreport.antonyip.com'}>https://dfkreport.antonyip.com</Button>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
      
      <CardHeader tag='h4'>[FRONTEND] Incomplete Features</CardHeader>
      <Card>
        <CardBody>
            <Col>LP/Seeds Stuffs (Add / Remove Liquidity)</Col>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>

      <CardHeader tag='h4'>[BACKEND] Incomplete Features</CardHeader>
      <Card>
        <CardBody>
            <Col>backfill data, currently backend only has data since 8 Dec 2021</Col>
            <Col>LP/Seeds (Add / Remove Liquidity)</Col>
            <Col>Filtering by dates...</Col>
            <Col>better historical Gaia Tears price</Col>
            <Col>better historical rune prices</Col>
            <Col>automation to update database tables</Col>
            <Col>documentation</Col>
            <Col>testing framework</Col>
            <Col>development framework</Col>
            <Col>summary of total spent in other currencies</Col>
            <Col>use terra exchange rate to convert prices</Col>
            <Col>Custom Prices for items</Col>
            <Col>Ability to set hero prices in case of deviation</Col>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>
  </div>
  );
}

export default PriceSite;