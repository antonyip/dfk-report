
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

function Gen0Rows(props){
    return (<Row><Col>{props.CREATED_BLOCK}</Col><Col>{props.CRYSTAL_ID}</Col><Col>{props.HERO_ID}</Col><Col>{props.JEWEL_PRICE}</Col></Row>);
  }
  
  function Gen0Page(props){
  
    const [toggle1, setToggle1] = useState(false);
    const [gen0Data, setGen0Data] = useState('')

    // hero-rental-income
    useEffect( () => {
        axios.get("https://dfkreport.antonyip.com/heros-gen0")
        .then( res => {
        if (res.data === 'Invalid User Address!')
        {
            setGen0Data('error');
        }
        else
        {
            setGen0Data(res);
        }
        })
        // eslint-disable-next-line
    }, [gen0Data]);
   
    var rowHeaders = <Row><Col>CREATED_BLOCK</Col><Col>CRYSTAL_ID</Col><Col>HERO_ID</Col><Col>JEWEL_PRICE</Col></Row>
    var rows = [];
    var id = 0;
    var totalAmountUSD = 0;
    /*
    {"SUMMON_CRYSTAL_TX":"0xeed680b82dd6e43b990f53313fe031639269229223240a924a1dbb20005fb792"
    ,"CRYSTAL_ID":"0x00000000000000000000000000000000000000000000000000000000000006d6"
    ,"CREATED_BLOCK":"17620607","JEWEL_PRICE":1874.5,"CREATOR":"0x4fd81b18d2aebf0e92cf637a0e50e4f526bac8d6"
    ,"SUMMON_HERO_TX":"0x850d1ad4980639fed4b2e51dd6eb3f67bf7f038aad64d0bb142234e6cefab0e6"
    ,"HERO_ID":"0x0000000000000000000000000000000000000000000000000000000000002b13"}
    */
    if (gen0Data !== '')
    {
        gen0Data.data.forEach(element => {
        
        {
        ++id;
        rows.push(
            <Gen0Rows key={id}
            CREATED_BLOCK={element.CREATED_BLOCK}
            CRYSTAL_ID={parseInt(element.CRYSTAL_ID)}
            HERO_ID={parseInt(element.HERO_ID)}
            JEWEL_PRICE={element.JEWEL_PRICE}
            ></Gen0Rows>
            )
        }
        });
    }
  
    if (gen0Data === '') rows.push(<Card key='norec'><CardBody>Loading... <Spinner></Spinner></CardBody></Card>);
    if (rows.length === 0) rows.push(<Card key='norec'><CardBody>No Records Found...</CardBody></Card>);
  
    return (
      <Card>
      <CardHeader>
      <Row xs='12'>       
      </Row>
      </CardHeader>
      <CardBody>
      <Collapse isOpen={true}>
          {rowHeaders}
          {rows}
      </Collapse>
      </CardBody>
      </Card>
    );
  
    
  }

  function Gen0()
  {
      return (<div className="content">
          <Gen0Page></Gen0Page>
          </div>)
  }

  export default Gen0;