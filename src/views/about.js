

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

function ExternalSite() {
return (
  <div className="content">     
      <CardHeader tag='h4'>About me</CardHeader>
      <Card>  
        <CardBody>
          <CardTitle>hello there, just an ordinary developer looking to build stuffs for fun..</CardTitle>
          <Col>Most things here are experimental.. Please consider voting for me if you liked it...</Col>
          <Col>The whole site consists of 3 parts..</Col>
          <Col>1. snowflake database - Part of MetricsDAO</Col>
          <Col>2. nodejs endpoint (https://dfkreport.antonyip.com)</Col>
          <Col>3. this frontend webpage</Col>
          </CardBody>
        <CardFooter></CardFooter>
      </Card>

      <CardHeader tag='h4'>[BUGS] - How to report bugs...</CardHeader>
      <Card>  
        <CardBody>
          <Col>Please help me by creating an issue on the github page so I get an email and you can track its progress...</Col>
          <Button onClick={() => window.location = 'https://github.com/antonyip/dfk-report/issues'}>https://github.com/antonyip/dfk-report/issues</Button>
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
            <Col>USD Calculations (profits) of all transactions</Col>
            <Col>Harvests</Col>
            <Col>Sum Amount_USD of some Categories...</Col>
            <Col>Download as CSV</Col>
            <Col>Summon Rental Income</Col>
            <Col>Filter By Dates</Col>
            <Col>LP/Seeds Stuffs (Add / Remove Liquidity)</Col>
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
            <Col>Sending tokens to other addresses (Heroes/Jewels/Items/Seeds)</Col>
            <Col>Getting tokens from other addresses (Heroes/Jewels/Items/Seeds)</Col>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>

      <CardHeader tag='h4'>[BACKEND] Incomplete Features</CardHeader>
      <Card>
        <CardBody>
            <Col>Sending tokens to other addresses (Heroes/Jewels/Items/Seeds)</Col>
            <Col>Getting tokens from other addresses (Heroes/Jewels/Items/Seeds)</Col>
            <Col>backfill data, currently backend only has data since 8 Dec 2021</Col>
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

export default ExternalSite;