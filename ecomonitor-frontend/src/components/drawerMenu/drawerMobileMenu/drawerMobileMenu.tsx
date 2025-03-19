import "./drawerMobileMenuStyle.css"
import React, { useState } from "react";
import {
  List,
  ListItemText,
  IconButton,
  SwipeableDrawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface ISubRoute {
  path: string;
  text: string;
}

interface IRoute {
  text: string;
  icon: React.JSX.Element;
  subRoutes: ISubRoute[];
}

interface MobileDrawerProps {
  routes: IRoute[];
}

const MobileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const drawerMenuRoutes: IRoute[] = [
    {
      text: "Leituras",
      icon: <BarChartIcon />,
      subRoutes: [
        { path: "/leituras/", text: "Registros e Exportação" },
        { path: "/leituras/nova_leitura", text: "Adicionar registro" },
        { path: "/leituras/estatisticas", text: "Estatísticas" },
      ],
    },
    {
      text: "Logs do Sistema",
      icon: <ListAltIcon />,
      subRoutes: [
        { path: "/logs/", text: "Registros e Exportação" },
        { path: "/logs/estatisticas", text: "Estatísticas" },
      ],
    },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List>
          {drawerMenuRoutes.map((route, index) => (
           <Accordion disableGutters>
           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <IconButton>
               {route.icon}
             </IconButton>
             <ListItemText primary={route.text} />
           </AccordionSummary>
           <AccordionDetails>
             <List component="div" disablePadding>
               {route.subRoutes.map((subRoute, subIndex) => (
                 <ListItemButton
                   key={subIndex}
                   component={Link}
                   to={subRoute.path}
                 >
                   <ListItemText primary={subRoute.text} />
                 </ListItemButton>
               ))}
             </List>
           </AccordionDetails>
         </Accordion>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default MobileDrawer;
