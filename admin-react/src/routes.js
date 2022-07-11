
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Service from "views/Service";
import ServiceCreate from "views/ServiceCreate";
import Homepage from "views/Homepage";

const dashboardRoutes = [

  {
    path: "/homepage",
    name: "Homepage",
    icon: "nc-icon nc-bank",
    component: Homepage,
    layout: "/admin"
  },
  {
    path: "/service",
    name: "Service",
    icon: "nc-icon nc-grid-45",
    component: Service,
    layout: "/admin",
  }
];
// nucleo icons
export default dashboardRoutes;
