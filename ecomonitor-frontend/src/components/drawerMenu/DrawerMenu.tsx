import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useAppContext } from "src/hooks/useAppContext";


const DrawerMenu: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { drawerMenuRoutes } = useAppContext();


  const toggleExpand = () => {
    if (expanded){
      console.log("2");
       setExpanded((prev) => !prev);
      }
  };

  const boxToggleExpand = () => {
    if (!expanded){
      console.log("2");
       setExpanded((prev) => !prev);
      }
  }


  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      width: expanded ? 240 : 60, 
      transition: "width 0.3s",
      height: "100%",
      }}
    onClick={boxToggleExpand}
    >
      <IconButton onClick={toggleExpand} sx={{ alignSelf: "center", marginBottom: 2 }}>
        <MenuIcon />
      </IconButton>
      <List>

        {drawerMenuRoutes.map((route, index) => (
          
          <Box key={index}>
          
            {expanded ?
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
              :
              <ListItem disablePadding sx={{justifyContent: "center"}}>
                <IconButton>
                  {route.icon}
                </IconButton>
              </ListItem>
             }
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default DrawerMenu;