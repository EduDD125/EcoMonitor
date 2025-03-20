import { useState } from "react";
import "./upperBannerStyle.css"
import DrawerMenu from "../drawerMenu/DrawerMenu";
import DrawerMobileMenu from "../drawerMenu/drawerMobileMenu/drawerMobileMenu";
import { useAppContext } from "src/hooks/useAppContext";

export default function UpperBanner() {
    const { isMobile } = useAppContext();

    return (
        <div className="upper-banner__container">
            <img className="upper-banner__logo" src={"/photos/logos/EcoMONITOR-log.png"}/>
            {isMobile && <div className="upper-banner__drawer"><DrawerMobileMenu /></div>}
        </div>
    );
}