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
import { useAppContext } from "src/hooks/useAppContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";




const MobileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { drawerMenuRoutes } = useAppContext();

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

 
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
