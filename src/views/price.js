import axios from "axios";
import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Spinner,
  Row,
  Col,
} from "reactstrap";
function PriceRows(props){
  return (<Row><Col>{props.MDDATE}</Col><Col>{props.GOLD_PRICE}</Col><Col>{props.GAIA_PRICE}</Col><Col>{props.JEWEL_PRICE}</Col><Col>{props.WONE_PRICE}</Col><Col>{props.RUNE_PRICE}</Col></Row>);
}

function PricePage(props){

  
  const [gen0Data, setGen0Data] = useState('')

  useEffect( () => {
      axios.get("https://dfkreport.antonyip.com/token-price-all")
      .then( res => {
          setGen0Data(res);
      })
      // eslint-disable-next-line
  }, [gen0Data]);
 
  var rowHeaders = <Row><Col>MDDATE</Col><Col>GOLD_PRICE</Col><Col>GAIA_PRICE</Col><Col>JEWEL_PRICE</Col><Col>WONE_PRICE</Col><Col>RUNE_PRICE</Col></Row>
  var rows = [];
  var id = 0;
  
  /*
  "MDDATE":"2021-12-29","GOLD_PRICE":0.015929,"GAIA_PRICE":0.05239124889,"JEWEL_PRICE":13.33,"WONE_PRICE":0.228427,"RUNE_PRICE":25.339030443}
  */
  if (gen0Data !== '')
  {
      gen0Data.data.forEach(element => {
      
      
      ++id;
      rows.push(
          <PriceRows key={id}
          MDDATE={element.MDDATE}
          GOLD_PRICE={(element.GOLD_PRICE)}
          GAIA_PRICE={(element.GAIA_PRICE)}
          JEWEL_PRICE={element.JEWEL_PRICE}
          WONE_PRICE={element.WONE_PRICE}
          RUNE_PRICE={element.RUNE_PRICE}
          ></PriceRows>
          )
      
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
function PriceSite() {
return (
  <div className="content">
      <PricePage></PricePage>
  </div>
  );
}

export default PriceSite;