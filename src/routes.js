// @material-ui/icons
import Monitoreo from "@material-ui/icons/Dashboard";
import Disponibilidad from "@material-ui/icons/Check";
import Noticias from '@material-ui/icons/Announcement';
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Search from "@material-ui/icons/Search";
// core components/views for Admin layout
import MonitoreoPage from "./views/Monitoreo/Monitoreo.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import NotificationsPage from "./views/Notifications/Notifications.js";
import SearchPage from "./views/Search/Search.js";
import DisponibilidadPage from "./views/Disponibilidad/Disponibilidad.js";
import NoticiasPage from "./views/Noticias/Noticias.js";

const routes = [
  {
    path: "/noticias",
    name: "Noticias",
    icon: Noticias,
    component: NoticiasPage,
    layout: "/admin"
  },
  {
    path: "/disponibilidad",
    name: "Disponibilidad",
    icon: Disponibilidad,
    component: DisponibilidadPage,
    layout: "/admin"
  },
  {
    path: "/monitoreo",
    name: "Monitoreo",
    icon: Monitoreo,
    component: MonitoreoPage,
    layout: "/admin"
  },
  {
    path: "/search",
    name: "Nagios Search",
    icon: Search,
    component: SearchPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
];

export default routes;
