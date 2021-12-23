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
  TabContent,
  TabPane,
  Table,
  Row
} from "reactstrap";
import classnames from 'classnames';

function QuestRewards(props){


  //console.log('a');
  if (props.data == '')
    return (<div>Loading...</div>);

  var html = "<div>";
  props.data.data.forEach(element => {
    html += "<div>";
    //console.log(element);
    html += element.BLOCK_TIMESTAMP;
    html += "</div>";
  });
  html += "</div>";
  
  return (
    <div><div>hello from quest rewards</div> {html} </div>
    );

}

function Dfk_Report() {

  const [activeTab, setActiveTab] = useState('1');
  const [questData, setQuestData] = useState('');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(async () => {
    const result = await axios.get("http://dfkreport.antonyip.com/quest-rewards?q=0x0ba43bae4613e03492e4c17af3b014b6c3202b9d")
    .then( res => {
      setQuestData(res);
    })
  }, []);
  
  return (
    <>
      <div className="content">
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            hello world
            <QuestRewards data={questData}></QuestRewards>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default Dfk_Report;
