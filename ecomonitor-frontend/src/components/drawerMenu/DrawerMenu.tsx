import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface IRoutes {
  path: string;
  text: string;
  icon: React.JSX.Element;
}

const DrawerMenu: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    };

    const drawerMenuRoutes: IRoutes[] = [
        {
        path: "/leituras",
        text: "Leituras",
        icon: <BarChartIcon />,
        },
        {
        path: "/logs",
        text: "Logs do Sistema",
        icon: <ListAltIcon />,
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
                    <ListItem key={index} component={Link} to={route.path} onClick={toggleDrawer(false)}>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
        </>
    );
};

export default DrawerMenu;
