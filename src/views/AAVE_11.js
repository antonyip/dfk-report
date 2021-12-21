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
// react plugin used to create charts
import {
  Line,
  Pie
} from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import classnames from 'classnames';

function ValueWrapper(value) {
  let textValue = value.toString();
  let bigText = textValue.split('.');
  let smallText = bigText[1];
  bigText = bigText[0];
  if (bigText === '0') return bigText + '.' + smallText.slice(0,3)
  if (bigText.length < 4) return bigText + ''
  if (bigText.length < 5) return bigText.slice(0,1) + 'K'
  if (bigText.length < 6) return bigText.slice(0,2) + 'K'
  if (bigText.length < 7) return bigText.slice(0,3) + 'K'

  if (bigText.length < 8) return bigText.slice(0,1) + ' M'
  if (bigText.length < 9) return bigText.slice(0,2) + ' M'
  if (bigText.length < 10) return bigText.slice(0,3) + ' M'

  if (bigText.length < 11) return bigText.slice(0,1) + ' B'
  if (bigText.length < 12) return bigText.slice(0,2) + ' B'
  if (bigText.length < 13) return bigText.slice(0,3) + ' B'

  if (bigText.length < 14) return bigText.slice(0,1) + ' T'
  if (bigText.length < 15) return bigText.slice(0,2) + ' T'
  if (bigText.length < 16) return bigText.slice(0,3) + ' T'

  return value;
}



function TotalValueLocked() {

  const [data, setData] = useState();
  const [dataDaily, setDataDaily] = useState();
  const [dataDailyPartial, setDataDailyPartial] = useState();
  const [error, setError] = useState();
  const [errorData, setErrorData] = useState();
  const [loading, setLoading] = useState();
  const [firstChart, setFirstChart] = useState();
  const firstChartOptions = {
    title: { display: true, text: 'My Chart' },
    zoom: {
      enabled: true,
      mode: 'x',
    },
    pan: {
      enabled: true,
      mode: 'x',
    },
  }

  const mainChartClick = dataset => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    //console.log("di",firstChart.datasets[datasetIndex].label);
  }

  const resetChart = e => {
    setDataDailyPartial(firstChart);
  }

  const getElementAtEvent = element => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    let yearMonth = firstChart.labels[index];
    console.log("fc", yearMonth);

    let year = yearMonth.split('-')[0];
    let month = yearMonth.split('-')[1];
    if (month.length === 1) {month = '0'+month;}
    yearMonth = year+'-'+month;

    let labels = []
    let WBTC = []
    let UNI = []
    let DAI = []
    let ENJ = []
    let USDC = []
    let GUSD = []
    let RAI = []
    let CRV = []
    let BAL = []
    let PAX = []
    let FRAX = []
    let REN = []
    let BAT = []
    let TUSD = []
    let DPI = []
    let LINK = []
    let MANA = []
    let WETH = []
    let AAVE = []
    let AMPL = []
    let ZRX = []
    let SNX = []
    let KNC = []
    let MKR = []
    let USDP = []
    let YFI = []
    let BUSD = []
    let USDT = []
    let SUSD = []
    let RENFIL = []
    let XSUSHI = []

    
    dataDaily.map( x=> {
      //console.log(x.EDDATE);
      //console.log(x.EDDATE.slice(0,7));
      if (x.EDDATE.slice(0,7) === yearMonth)
      {
        //console.log(x.EDDATE.slice(0,7));
        labels.push(x.EDDATE.slice(0,10))
        WBTC.push(x.WBTC_TOTAL_LIQUIDITY_USD)
        UNI.push(x.UNI_TOTAL_LIQUIDITY_USD)
        DAI.push(x.DAI_TOTAL_LIQUIDITY_USD)
        ENJ.push(x.ENJ_TOTAL_LIQUIDITY_USD)
        USDC.push(x.USDC_TOTAL_LIQUIDITY_USD)
        GUSD.push(x.GUSD_TOTAL_LIQUIDITY_USD)
        RAI.push(x.RAI_TOTAL_LIQUIDITY_USD)
        CRV.push(x.CRV_TOTAL_LIQUIDITY_USD)
        BAL.push(x.BAL_TOTAL_LIQUIDITY_USD)
        PAX.push(x.PAX_TOTAL_LIQUIDITY_USD)
        FRAX.push(x.FRAX_TOTAL_LIQUIDITY_USD)
        REN.push(x.REN_TOTAL_LIQUIDITY_USD)
        BAT.push(x.BAT_TOTAL_LIQUIDITY_USD)
        TUSD.push(x.TUSD_TOTAL_LIQUIDITY_USD)
        DPI.push(x.DPI_TOTAL_LIQUIDITY_USD)
        LINK.push(x.LINK_TOTAL_LIQUIDITY_USD)
        MANA.push(x.MANA_TOTAL_LIQUIDITY_USD)
        WETH.push(x.WETH_TOTAL_LIQUIDITY_USD)
        AAVE.push(x.AAVE_TOTAL_LIQUIDITY_USD)
        AMPL.push(x.AMPL_TOTAL_LIQUIDITY_USD)
        ZRX.push(x.ZRX_TOTAL_LIQUIDITY_USD)
        SNX.push(x.SNX_TOTAL_LIQUIDITY_USD)
        KNC.push(x.KNC_TOTAL_LIQUIDITY_USD)
        MKR.push(x.MKR_TOTAL_LIQUIDITY_USD)
        USDP.push(x.USDP_TOTAL_LIQUIDITY_USD)
        YFI.push(x.YFI_TOTAL_LIQUIDITY_USD)
        BUSD.push(x.BUSD_TOTAL_LIQUIDITY_USD)
        USDT.push(x.USDT_TOTAL_LIQUIDITY_USD)
        SUSD.push(x.SUSD_TOTAL_LIQUIDITY_USD)
        RENFIL.push(x.RENFIL_TOTAL_LIQUIDITY_USD)
        XSUSHI.push(x.XSUSHI_TOTAL_LIQUIDITY_USD)
      }
    });

    setDataDailyPartial(
      {
        labels: labels,
        datasets: [
          {
            label: "WBTC",
            data: WBTC,
            fill: true,
            backgroundColor: "rgba(220, 64, 33, 0.2)",
            borderColor: "rgba(220, 64, 33, 1)"
        },
        {
            label: "UNI",
            data: UNI,
            fill: true,
            backgroundColor: "rgba(244, 250, 40, 0.2)",
            borderColor: "rgba(244, 250, 40, 1)"
        },
        {
            label: "DAI",
            data: DAI,
            fill: true,
            backgroundColor: "rgba(231, 109, 241, 0.2)",
            borderColor: "rgba(231, 109, 241, 1)"
        },
        {
            label: "ENJ",
            data: ENJ,
            fill: true,
            backgroundColor: "rgba(28, 46, 239, 0.2)",
            borderColor: "rgba(28, 46, 239, 1)"
        },
        {
            label: "USDC",
            data: USDC,
            fill: true,
            backgroundColor: "rgba(218, 7, 66, 0.2)",
            borderColor: "rgba(218, 7, 66, 1)"
        },
        {
            label: "GUSD",
            data: GUSD,
            fill: true,
            backgroundColor: "rgba(58, 195, 120, 0.2)",
            borderColor: "rgba(58, 195, 120, 1)"
        },
        {
            label: "RAI",
            data: RAI,
            fill: true,
            backgroundColor: "rgba(18, 116, 209, 0.2)",
            borderColor: "rgba(18, 116, 209, 1)"
        },
        {
            label: "CRV",
            data: CRV,
            fill: true,
            backgroundColor: "rgba(228, 34, 41, 0.2)",
            borderColor: "rgba(228, 34, 41, 1)"
        },
        {
            label: "BAL",
            data: BAL,
            fill: true,
            backgroundColor: "rgba(133, 74, 237, 0.2)",
            borderColor: "rgba(133, 74, 237, 1)"
        },
        {
            label: "PAX",
            data: PAX,
            fill: true,
            backgroundColor: "rgba(167, 44, 192, 0.2)",
            borderColor: "rgba(167, 44, 192, 1)"
        },
        {
            label: "FRAX",
            data: FRAX,
            fill: true,
            backgroundColor: "rgba(89, 229, 99, 0.2)",
            borderColor: "rgba(89, 229, 99, 1)"
        },
        {
            label: "REN",
            data: REN,
            fill: true,
            backgroundColor: "rgba(110, 33, 230, 0.2)",
            borderColor: "rgba(110, 33, 230, 1)"
        },
        {
            label: "BAT",
            data: BAT,
            fill: true,
            backgroundColor: "rgba(118, 244, 127, 0.2)",
            borderColor: "rgba(118, 244, 127, 1)"
        },
        {
            label: "TUSD",
            data: TUSD,
            fill: true,
            backgroundColor: "rgba(127, 42, 84, 0.2)",
            borderColor: "rgba(127, 42, 84, 1)"
        },
        {
            label: "DPI",
            data: DPI,
            fill: true,
            backgroundColor: "rgba(248, 148, 246, 0.2)",
            borderColor: "rgba(248, 148, 246, 1)"
        },
        {
            label: "LINK",
            data: LINK,
            fill: true,
            backgroundColor: "rgba(3, 70, 127, 0.2)",
            borderColor: "rgba(3, 70, 127, 1)"
        },
        {
            label: "MANA",
            data: MANA,
            fill: true,
            backgroundColor: "rgba(108, 89, 239, 0.2)",
            borderColor: "rgba(108, 89, 239, 1)"
        },
        {
            label: "WETH",
            data: WETH,
            fill: true,
            backgroundColor: "rgba(215, 21, 26, 0.2)",
            borderColor: "rgba(215, 21, 26, 1)"
        },
        {
            label: "AAVE",
            data: AAVE,
            fill: true,
            backgroundColor: "rgba(14, 207, 80, 0.2)",
            borderColor: "rgba(14, 207, 80, 1)"
        },
        {
            label: "AMPL",
            data: AMPL,
            fill: true,
            backgroundColor: "rgba(223, 193, 220, 0.2)",
            borderColor: "rgba(223, 193, 220, 1)"
        },
        {
            label: "ZRX",
            data: ZRX,
            fill: true,
            backgroundColor: "rgba(158, 210, 72, 0.2)",
            borderColor: "rgba(158, 210, 72, 1)"
        },
        {
            label: "SNX",
            data: SNX,
            fill: true,
            backgroundColor: "rgba(220, 111, 182, 0.2)",
            borderColor: "rgba(220, 111, 182, 1)"
        },
        {
            label: "KNC",
            data: KNC,
            fill: true,
            backgroundColor: "rgba(129, 29, 245, 0.2)",
            borderColor: "rgba(129, 29, 245, 1)"
        },
        {
            label: "MKR",
            data: MKR,
            fill: true,
            backgroundColor: "rgba(142, 201, 36, 0.2)",
            borderColor: "rgba(142, 201, 36, 1)"
        },
        {
            label: "USDP",
            data: USDP,
            fill: true,
            backgroundColor: "rgba(155, 182, 153, 0.2)",
            borderColor: "rgba(155, 182, 153, 1)"
        },
        {
            label: "YFI",
            data: YFI,
            fill: true,
            backgroundColor: "rgba(93, 220, 31, 0.2)",
            borderColor: "rgba(93, 220, 31, 1)"
        },
        {
            label: "BUSD",
            data: BUSD,
            fill: true,
            backgroundColor: "rgba(101, 239, 163, 0.2)",
            borderColor: "rgba(101, 239, 163, 1)"
        },
        {
            label: "USDT",
            data: USDT,
            fill: true,
            backgroundColor: "rgba(202, 19, 154, 0.2)",
            borderColor: "rgba(202, 19, 154, 1)"
        },
        {
            label: "SUSD",
            data: SUSD,
            fill: true,
            backgroundColor: "rgba(217, 251, 247, 0.2)",
            borderColor: "rgba(217, 251, 247, 1)"
        },
        {
            label: "RENFIL",
            data: RENFIL,
            fill: true,
            backgroundColor: "rgba(184, 159, 101, 0.2)",
            borderColor: "rgba(184, 159, 101, 1)"
        },
        {
            label: "XSUSHI",
            data: XSUSHI,
            fill: true,
            backgroundColor: "rgba(5, 56, 141, 0.2)",
            borderColor: "rgba(5, 56, 141, 1)"
        },
        ]
      }
    )
  };
  
  let labels = []
  let WBTC = []
  let UNI = []
  let DAI = []
  let ENJ = []
  let USDC = []
  let GUSD = []
  let RAI = []
  let CRV = []
  let BAL = []
  let PAX = []
  let FRAX = []
  let REN = []
  let BAT = []
  let TUSD = []
  let DPI = []
  let LINK = []
  let MANA = []
  let WETH = []
  let AAVE = []
  let AMPL = []
  let ZRX = []
  let SNX = []
  let KNC = []
  let MKR = []
  let USDP = []
  let YFI = []
  let BUSD = []
  let USDT = []
  let SUSD = []
  let RENFIL = []
  let XSUSHI = []
  useEffect( () => {
    
    axios.get("https://api.flipsidecrypto.com/api/v2/queries/0abc0d6f-891b-49ec-b3d3-71fb35e9f4ef/data/latest")
    .then( response => {
      setData(response.data);
      response.data.map( x => {
        labels.push(x.EDDATE.slice(0,10))
        WBTC.push(x.WBTC_TOTAL_LIQUIDITY_USD)
        UNI.push(x.UNI_TOTAL_LIQUIDITY_USD)
        DAI.push(x.DAI_TOTAL_LIQUIDITY_USD)
        ENJ.push(x.ENJ_TOTAL_LIQUIDITY_USD)
        USDC.push(x.USDC_TOTAL_LIQUIDITY_USD)
        GUSD.push(x.GUSD_TOTAL_LIQUIDITY_USD)
        RAI.push(x.RAI_TOTAL_LIQUIDITY_USD)
        CRV.push(x.CRV_TOTAL_LIQUIDITY_USD)
        BAL.push(x.BAL_TOTAL_LIQUIDITY_USD)
        PAX.push(x.PAX_TOTAL_LIQUIDITY_USD)
        FRAX.push(x.FRAX_TOTAL_LIQUIDITY_USD)
        REN.push(x.REN_TOTAL_LIQUIDITY_USD)
        BAT.push(x.BAT_TOTAL_LIQUIDITY_USD)
        TUSD.push(x.TUSD_TOTAL_LIQUIDITY_USD)
        DPI.push(x.DPI_TOTAL_LIQUIDITY_USD)
        LINK.push(x.LINK_TOTAL_LIQUIDITY_USD)
        MANA.push(x.MANA_TOTAL_LIQUIDITY_USD)
        WETH.push(x.WETH_TOTAL_LIQUIDITY_USD)
        AAVE.push(x.AAVE_TOTAL_LIQUIDITY_USD)
        AMPL.push(x.AMPL_TOTAL_LIQUIDITY_USD)
        ZRX.push(x.ZRX_TOTAL_LIQUIDITY_USD)
        SNX.push(x.SNX_TOTAL_LIQUIDITY_USD)
        KNC.push(x.KNC_TOTAL_LIQUIDITY_USD)
        MKR.push(x.MKR_TOTAL_LIQUIDITY_USD)
        USDP.push(x.USDP_TOTAL_LIQUIDITY_USD)
        YFI.push(x.YFI_TOTAL_LIQUIDITY_USD)
        BUSD.push(x.BUSD_TOTAL_LIQUIDITY_USD)
        USDT.push(x.USDT_TOTAL_LIQUIDITY_USD)
        SUSD.push(x.SUSD_TOTAL_LIQUIDITY_USD)
        RENFIL.push(x.RENFIL_TOTAL_LIQUIDITY_USD)
        XSUSHI.push(x.XSUSHI_TOTAL_LIQUIDITY_USD)
      })

      setFirstChart(
        {
          labels: labels,
          datasets: [
            {
              label: "WBTC",
              data: WBTC,
              fill: true,
              backgroundColor: "rgba(220, 64, 33, 0.2)",
              borderColor: "rgba(220, 64, 33, 1)"
          },
          {
              label: "UNI",
              data: UNI,
              fill: true,
              backgroundColor: "rgba(244, 250, 40, 0.2)",
              borderColor: "rgba(244, 250, 40, 1)"
          },
          {
              label: "DAI",
              data: DAI,
              fill: true,
              backgroundColor: "rgba(231, 109, 241, 0.2)",
              borderColor: "rgba(231, 109, 241, 1)"
          },
          {
              label: "ENJ",
              data: ENJ,
              fill: true,
              backgroundColor: "rgba(28, 46, 239, 0.2)",
              borderColor: "rgba(28, 46, 239, 1)"
          },
          {
              label: "USDC",
              data: USDC,
              fill: true,
              backgroundColor: "rgba(218, 7, 66, 0.2)",
              borderColor: "rgba(218, 7, 66, 1)"
          },
          {
              label: "GUSD",
              data: GUSD,
              fill: true,
              backgroundColor: "rgba(58, 195, 120, 0.2)",
              borderColor: "rgba(58, 195, 120, 1)"
          },
          {
              label: "RAI",
              data: RAI,
              fill: true,
              backgroundColor: "rgba(18, 116, 209, 0.2)",
              borderColor: "rgba(18, 116, 209, 1)"
          },
          {
              label: "CRV",
              data: CRV,
              fill: true,
              backgroundColor: "rgba(228, 34, 41, 0.2)",
              borderColor: "rgba(228, 34, 41, 1)"
          },
          {
              label: "BAL",
              data: BAL,
              fill: true,
              backgroundColor: "rgba(133, 74, 237, 0.2)",
              borderColor: "rgba(133, 74, 237, 1)"
          },
          {
              label: "PAX",
              data: PAX,
              fill: true,
              backgroundColor: "rgba(167, 44, 192, 0.2)",
              borderColor: "rgba(167, 44, 192, 1)"
          },
          {
              label: "FRAX",
              data: FRAX,
              fill: true,
              backgroundColor: "rgba(89, 229, 99, 0.2)",
              borderColor: "rgba(89, 229, 99, 1)"
          },
          {
              label: "REN",
              data: REN,
              fill: true,
              backgroundColor: "rgba(110, 33, 230, 0.2)",
              borderColor: "rgba(110, 33, 230, 1)"
          },
          {
              label: "BAT",
              data: BAT,
              fill: true,
              backgroundColor: "rgba(118, 244, 127, 0.2)",
              borderColor: "rgba(118, 244, 127, 1)"
          },
          {
              label: "TUSD",
              data: TUSD,
              fill: true,
              backgroundColor: "rgba(127, 42, 84, 0.2)",
              borderColor: "rgba(127, 42, 84, 1)"
          },
          {
              label: "DPI",
              data: DPI,
              fill: true,
              backgroundColor: "rgba(248, 148, 246, 0.2)",
              borderColor: "rgba(248, 148, 246, 1)"
          },
          {
              label: "LINK",
              data: LINK,
              fill: true,
              backgroundColor: "rgba(3, 70, 127, 0.2)",
              borderColor: "rgba(3, 70, 127, 1)"
          },
          {
              label: "MANA",
              data: MANA,
              fill: true,
              backgroundColor: "rgba(108, 89, 239, 0.2)",
              borderColor: "rgba(108, 89, 239, 1)"
          },
          {
              label: "WETH",
              data: WETH,
              fill: true,
              backgroundColor: "rgba(215, 21, 26, 0.2)",
              borderColor: "rgba(215, 21, 26, 1)"
          },
          {
              label: "AAVE",
              data: AAVE,
              fill: true,
              backgroundColor: "rgba(14, 207, 80, 0.2)",
              borderColor: "rgba(14, 207, 80, 1)"
          },
          {
              label: "AMPL",
              data: AMPL,
              fill: true,
              backgroundColor: "rgba(223, 193, 220, 0.2)",
              borderColor: "rgba(223, 193, 220, 1)"
          },
          {
              label: "ZRX",
              data: ZRX,
              fill: true,
              backgroundColor: "rgba(158, 210, 72, 0.2)",
              borderColor: "rgba(158, 210, 72, 1)"
          },
          {
              label: "SNX",
              data: SNX,
              fill: true,
              backgroundColor: "rgba(220, 111, 182, 0.2)",
              borderColor: "rgba(220, 111, 182, 1)"
          },
          {
              label: "KNC",
              data: KNC,
              fill: true,
              backgroundColor: "rgba(129, 29, 245, 0.2)",
              borderColor: "rgba(129, 29, 245, 1)"
          },
          {
              label: "MKR",
              data: MKR,
              fill: true,
              backgroundColor: "rgba(142, 201, 36, 0.2)",
              borderColor: "rgba(142, 201, 36, 1)"
          },
          {
              label: "USDP",
              data: USDP,
              fill: true,
              backgroundColor: "rgba(155, 182, 153, 0.2)",
              borderColor: "rgba(155, 182, 153, 1)"
          },
          {
              label: "YFI",
              data: YFI,
              fill: true,
              backgroundColor: "rgba(93, 220, 31, 0.2)",
              borderColor: "rgba(93, 220, 31, 1)"
          },
          {
              label: "BUSD",
              data: BUSD,
              fill: true,
              backgroundColor: "rgba(101, 239, 163, 0.2)",
              borderColor: "rgba(101, 239, 163, 1)"
          },
          {
              label: "USDT",
              data: USDT,
              fill: true,
              backgroundColor: "rgba(202, 19, 154, 0.2)",
              borderColor: "rgba(202, 19, 154, 1)"
          },
          {
              label: "SUSD",
              data: SUSD,
              fill: true,
              backgroundColor: "rgba(217, 251, 247, 0.2)",
              borderColor: "rgba(217, 251, 247, 1)"
          },
          {
              label: "RENFIL",
              data: RENFIL,
              fill: true,
              backgroundColor: "rgba(184, 159, 101, 0.2)",
              borderColor: "rgba(184, 159, 101, 1)"
          },
          {
              label: "XSUSHI",
              data: XSUSHI,
              fill: true,
              backgroundColor: "rgba(5, 56, 141, 0.2)",
              borderColor: "rgba(5, 56, 141, 1)"
          },
          ]
        }
      );

      setDataDailyPartial(
        {
          labels: labels,
          datasets: [
            {
              label: "WBTC",
              data: WBTC,
              fill: true,
              backgroundColor: "rgba(220, 64, 33, 0.2)",
              borderColor: "rgba(220, 64, 33, 1)"
          },
          {
              label: "UNI",
              data: UNI,
              fill: true,
              backgroundColor: "rgba(244, 250, 40, 0.2)",
              borderColor: "rgba(244, 250, 40, 1)"
          },
          {
              label: "DAI",
              data: DAI,
              fill: true,
              backgroundColor: "rgba(231, 109, 241, 0.2)",
              borderColor: "rgba(231, 109, 241, 1)"
          },
          {
              label: "ENJ",
              data: ENJ,
              fill: true,
              backgroundColor: "rgba(28, 46, 239, 0.2)",
              borderColor: "rgba(28, 46, 239, 1)"
          },
          {
              label: "USDC",
              data: USDC,
              fill: true,
              backgroundColor: "rgba(218, 7, 66, 0.2)",
              borderColor: "rgba(218, 7, 66, 1)"
          },
          {
              label: "GUSD",
              data: GUSD,
              fill: true,
              backgroundColor: "rgba(58, 195, 120, 0.2)",
              borderColor: "rgba(58, 195, 120, 1)"
          },
          {
              label: "RAI",
              data: RAI,
              fill: true,
              backgroundColor: "rgba(18, 116, 209, 0.2)",
              borderColor: "rgba(18, 116, 209, 1)"
          },
          {
              label: "CRV",
              data: CRV,
              fill: true,
              backgroundColor: "rgba(228, 34, 41, 0.2)",
              borderColor: "rgba(228, 34, 41, 1)"
          },
          {
              label: "BAL",
              data: BAL,
              fill: true,
              backgroundColor: "rgba(133, 74, 237, 0.2)",
              borderColor: "rgba(133, 74, 237, 1)"
          },
          {
              label: "PAX",
              data: PAX,
              fill: true,
              backgroundColor: "rgba(167, 44, 192, 0.2)",
              borderColor: "rgba(167, 44, 192, 1)"
          },
          {
              label: "FRAX",
              data: FRAX,
              fill: true,
              backgroundColor: "rgba(89, 229, 99, 0.2)",
              borderColor: "rgba(89, 229, 99, 1)"
          },
          {
              label: "REN",
              data: REN,
              fill: true,
              backgroundColor: "rgba(110, 33, 230, 0.2)",
              borderColor: "rgba(110, 33, 230, 1)"
          },
          {
              label: "BAT",
              data: BAT,
              fill: true,
              backgroundColor: "rgba(118, 244, 127, 0.2)",
              borderColor: "rgba(118, 244, 127, 1)"
          },
          {
              label: "TUSD",
              data: TUSD,
              fill: true,
              backgroundColor: "rgba(127, 42, 84, 0.2)",
              borderColor: "rgba(127, 42, 84, 1)"
          },
          {
              label: "DPI",
              data: DPI,
              fill: true,
              backgroundColor: "rgba(248, 148, 246, 0.2)",
              borderColor: "rgba(248, 148, 246, 1)"
          },
          {
              label: "LINK",
              data: LINK,
              fill: true,
              backgroundColor: "rgba(3, 70, 127, 0.2)",
              borderColor: "rgba(3, 70, 127, 1)"
          },
          {
              label: "MANA",
              data: MANA,
              fill: true,
              backgroundColor: "rgba(108, 89, 239, 0.2)",
              borderColor: "rgba(108, 89, 239, 1)"
          },
          {
              label: "WETH",
              data: WETH,
              fill: true,
              backgroundColor: "rgba(215, 21, 26, 0.2)",
              borderColor: "rgba(215, 21, 26, 1)"
          },
          {
              label: "AAVE",
              data: AAVE,
              fill: true,
              backgroundColor: "rgba(14, 207, 80, 0.2)",
              borderColor: "rgba(14, 207, 80, 1)"
          },
          {
              label: "AMPL",
              data: AMPL,
              fill: true,
              backgroundColor: "rgba(223, 193, 220, 0.2)",
              borderColor: "rgba(223, 193, 220, 1)"
          },
          {
              label: "ZRX",
              data: ZRX,
              fill: true,
              backgroundColor: "rgba(158, 210, 72, 0.2)",
              borderColor: "rgba(158, 210, 72, 1)"
          },
          {
              label: "SNX",
              data: SNX,
              fill: true,
              backgroundColor: "rgba(220, 111, 182, 0.2)",
              borderColor: "rgba(220, 111, 182, 1)"
          },
          {
              label: "KNC",
              data: KNC,
              fill: true,
              backgroundColor: "rgba(129, 29, 245, 0.2)",
              borderColor: "rgba(129, 29, 245, 1)"
          },
          {
              label: "MKR",
              data: MKR,
              fill: true,
              backgroundColor: "rgba(142, 201, 36, 0.2)",
              borderColor: "rgba(142, 201, 36, 1)"
          },
          {
              label: "USDP",
              data: USDP,
              fill: true,
              backgroundColor: "rgba(155, 182, 153, 0.2)",
              borderColor: "rgba(155, 182, 153, 1)"
          },
          {
              label: "YFI",
              data: YFI,
              fill: true,
              backgroundColor: "rgba(93, 220, 31, 0.2)",
              borderColor: "rgba(93, 220, 31, 1)"
          },
          {
              label: "BUSD",
              data: BUSD,
              fill: true,
              backgroundColor: "rgba(101, 239, 163, 0.2)",
              borderColor: "rgba(101, 239, 163, 1)"
          },
          {
              label: "USDT",
              data: USDT,
              fill: true,
              backgroundColor: "rgba(202, 19, 154, 0.2)",
              borderColor: "rgba(202, 19, 154, 1)"
          },
          {
              label: "SUSD",
              data: SUSD,
              fill: true,
              backgroundColor: "rgba(217, 251, 247, 0.2)",
              borderColor: "rgba(217, 251, 247, 1)"
          },
          {
              label: "RENFIL",
              data: RENFIL,
              fill: true,
              backgroundColor: "rgba(184, 159, 101, 0.2)",
              borderColor: "rgba(184, 159, 101, 1)"
          },
          {
              label: "XSUSHI",
              data: XSUSHI,
              fill: true,
              backgroundColor: "rgba(5, 56, 141, 0.2)",
              borderColor: "rgba(5, 56, 141, 1)"
          },
          ]
        }
      );

    }).then (
      () => {
        axios.get("https://api.flipsidecrypto.com/api/v2/queries/0a5e6be9-991e-4c3c-807a-e08f74e371d5/data/latest")
        .then( response => {
          setDataDaily(response.data)
        })
      }
    ).catch(error => {
      setError(true);
      setErrorData(error);
    }).finally(() => {
      setLoading(false);
    })
  } , []);

  if (error) return <div>{errorData}</div>;
  if (loading) return <div>Loading...</div>;

  return (<>
  <h1>Total Liquidity Dashboard</h1>
  <p>Visualize the daily total liquidity in Aave for the past year with the capability to zoom in/search 
    for specific days or ranges of days. What are the most interesting ways to answer the question: 
    What assets are dominant in Aave's liquidity pools and when?</p>
  <p>Click on a spot to zoom into the individual days.</p>
  <p>Toggle lines on and off by clicking on the legend.</p>
  <Line data={dataDailyPartial} options={firstChartOptions}
      //getDatasetAtEvent={mainChartClick}
      getElementAtEvent={getElementAtEvent}
      //getElementsAtEvent={getElementsAtEvent}
    >
   </Line>
   <div align="center"><Button onClick={resetChart}>Reset Chart</Button></div>
   <p>
     WBTC, WETH, DAI and USDT make up the most dominant pools in AAVE. 
   </p>
  </>)
}

function AAVE_11() {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <div className="content">
      <Nav tabs>
      <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Total Liquidity Dashboard
          </NavLink>
        </NavItem>
      </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <TotalValueLocked></TotalValueLocked>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default AAVE_11;
