import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";

interface ISubRoute {
  path: string;
  text: string;
}

interface IRoute {
  text: string;
  icon: React.JSX.Element;
  subRoutes: ISubRoute[];
}

const DrawerMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const drawerMenuRoutes: IRoute[] = [
    {
      text: "Leituras",
      icon: <BarChartIcon />,
      subRoutes: [
        { path: "/leituras/", text: "Registros e Exportação" },
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
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          {drawerMenuRoutes.map((route, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {route.icon}
                <ListItemText primary={route.text} />
              </AccordionSummary>
              <AccordionDetails>
                <List component="div" disablePadding>
                    {route.subRoutes.map((subRoute, subIndex) => (
                        <ListItemButton
                            key={subIndex}
                            component={Link as any}
                            to={subRoute.path}
                            onClick={toggleDrawer(false)}
                        >
                        <ListItemText primary={subRoute.text} />
                        </ListItemButton>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
