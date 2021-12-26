

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
          <Col>1. snowflake database</Col>
          <Col>2. nodejs endpoint (https://dfkreport.antonyip.com)</Col>
          <Col>3. this frontend webpage</Col>
        </Table>
        <CardFooter>... nothing else is here...</CardFooter>
      </Card>
      
      <CardHeader>Incomplete Features... FRONTEND</CardHeader>
      <Card>
        <CardBody>
          <Table>
            <Col>Seeds/LP Stuffs</Col>
          </Table>
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>

      <CardHeader>Incomplete Features... BACKEND</CardHeader>
      <Card>
        <CardBody>
          <Table>
            <Col>HERO SUMMONING COSTS</Col>
            <Col>backfill data, currently backend only has data since 8 Dec 2021</Col>
            <Col>historical Gaia Tears price</Col>
            <Col>historical rune prices</Col>
            <Col>automation to update database tables</Col>
            <Col>documentation</Col>
            <Col>testing framework</Col>
            <Col>development framework</Col>
          </Table>Gaia Tears
        </CardBody>
        <CardFooter>... wish i had more time...</CardFooter>
      </Card>
    </Col>
  </div>
  );
}

export default ExternalSite;