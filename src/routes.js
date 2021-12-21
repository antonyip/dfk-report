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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";

import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AAVE_9 from "views/AAVE_9.js";
import AAVE_10 from "views/AAVE_10.js";
import AAVE_11 from "views/AAVE_11.js";
import AAVE_12 from "views/AAVE_12.js";
import Curve_Free from "views/Curve_Free.js";
import OxSisyphus from "views/OxSisyphus.js"

var routes = [
  {
    path: "/aave_9",
    name: "AAVE 9",
    icon: "nc-icon nc-chart-bar-32",
    component: AAVE_9,
    layout: "/admin",
  },
  {
    path: "/aave_10",
    name: "AAVE 10",
    icon: "nc-icon nc-chart-bar-32",
    component: AAVE_10,
    layout: "/admin",
  },
  {
    path: "/aave_11",
    name: "AAVE 11",
    icon: "nc-icon nc-chart-bar-32",
    component: AAVE_11,
    layout: "/admin",
  },
  {
    path: "/aave_12",
    name: "AAVE 12",
    icon: "nc-icon nc-chart-bar-32",
    component: AAVE_12,
    layout: "/admin",
  },
  {
    path: "/curve_free",
    name: "Curve Free Square",
    icon: "nc-icon nc-chart-bar-32",
    component: Curve_Free,
    layout: "/admin",
  },
  {
    path: "/OxSisyphus",
    name: "OpenSea Raw Data",
    icon: "nc-icon nc-chart-bar-32",
    component: OxSisyphus,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/fakePath",
    name: "Powered By Flipside",
    icon: "nc-icon nc-spaceship",
    component: AAVE_9,
    layout: "/admin",
  },
];
export default routes;
