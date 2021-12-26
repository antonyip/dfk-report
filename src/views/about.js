

//import axios from "axios";
//import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  //CardTitle,
  Table,
  //Row,
  Col,
} from "reactstrap";

function ExternalSite() {
return (
  <div className="content">
    <Col>
      <CardHeader>About me</CardHeader>
      <Card>
        
        <CardBody>hello there, just an ordinary developer looking to build stuffs for fun..</CardBody>
        <Table>
          <Col>Most things here are experimental.. If I won the grand price, I would probably be able to finish the whole site in about ~3 months</Col>
          <Col>The whole site consists of 3 parts..</Col>
          <Col>1. snowflake database - Part of MetricsDAO</Col>
          <Col>2. nodejs endpoint (https://dfkreport.antonyip.com)</Col>
          <Col>3. this frontend webpage</Col>
        </Table>
        <CardFooter>... nothing else is here...</CardFooter>
      </Card>

      <CardHeader>Features... FRONTEND</CardHeader>
      <Card>
        <CardBody>
          <Table>
            <Col>Seeds/LP Stuffs</Col>
            <Col>Harvests</Col>
            <Col>Item TX USD Prices</Col>
            <Col>Level ups</Col>
          </Table>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>
      
      <CardHeader>Incomplete Features... FRONTEND</CardHeader>
      <Card>
        <CardBody>
          <Table>
            <Col>Seeds/LP Stuffs</Col>
            <Col>Harvests</Col>
            <Col>Item TX USD Prices</Col>
            <Col>Level ups</Col>
            <Col>Sum of columns</Col>
          </Table>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>

      <CardHeader>Incomplete Features... BACKEND</CardHeader>
      <Card>
        <CardBody>
          <Table>
            <Col>LP/Seeds</Col>
            <Col>Summon Rental Income</Col>
            <Col>backfill data, currently backend only has data since 8 Dec 2021</Col>
            <Col>better historical Gaia Tears price</Col>
            <Col>better historical rune prices</Col>
            <Col>automation to update database tables</Col>
            <Col>documentation</Col>
            <Col>testing framework</Col>
            <Col>development framework</Col>
          </Table>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>
    </Col>
  </div>
  );
}

export default ExternalSite;