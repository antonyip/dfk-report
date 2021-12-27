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
/*
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
*/

import dfk_report from "views/dfk_report.js";
import backend from "views/backend.js";
import about from "views/about.js";

var routes = [
  {
    path: "/dfk_report",
    name: "Report Generator",
    icon: "nc-icon nc-single-copy-04",
    component: dfk_report,
    layout: "/admin",
  },
  {
    path: "/backend",
    name: "Backend",
    icon: "nc-icon nc-cloud-download-93",
    component: backend,
    layout: "/admin",
  },
  {
    path: "/about",
    name: "about",
    icon: "nc-icon nc-alert-circle-i",
    component: about,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/fakePath",
    name: "MetricsDAO",
    icon: "nc-icon nc-spaceship",
    component: dfk_report,
    layout: "/admin",
  },
];
export default routes;
