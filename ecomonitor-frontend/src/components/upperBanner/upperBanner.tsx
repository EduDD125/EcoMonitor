import { useState } from "react";
import "./upperBannerStyle.css"
import DrawerMenu from "../drawerMenu/DrawerMenu";
import DrawerMobileMenu from "../drawerMenu/drawerMobileMenu/drawerMobileMenu";

export default function UpperBanner() {
    const width = window.innerWidth;
    const [isMobile, setIsMobile] = useState(width < 1025);

    return (
        <div className="upper-banner__container">
            <img className="upper-banner__logo" src={"/photos/logos/EcoMONITOR-log.png"}/>
            {isMobile && <div className="upper-banner__drawer"><DrawerMobileMenu /></div>}
        </div>
    );
}