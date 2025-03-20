import "./controlPainelStyle.css";
import UpperBanner from "src/components/upperBanner/upperBanner";
import DrawerMenu from "../../drawerMenu/DrawerMenu";
import { useAppContext } from "src/hooks/useAppContext";

interface ControlPainelProps {
  children: React.ReactNode;
}

export default function ControlPainel({ children }: ControlPainelProps) {
  const { isMobile } = useAppContext();

  if (isMobile)
    return (
      <main className="main__content">
        <UpperBanner />
        <div className="control-painel__container">
          <div className="control-painel__content">
            {children}
          </div>
        </div>
      </main>
    );


  return (
    <main className="main__content">
      <UpperBanner />
      <div className="control-painel__container">
        <div className="drawer-menu__button-container">
          <DrawerMenu />
        </div>
        <div className="control-painel__content">
          {children}
        </div>
      </div>
    </main>
  );
}
