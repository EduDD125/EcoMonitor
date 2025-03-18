import "./controlPainelStyle.css";
import UpperBanner from "src/components/upperBanner/upperBanner";
import DrawerMenu from "../../drawerMenu/DrawerMenu";

interface ControlPainelProps {
  children: React.ReactNode;
}

export default function ControlPainel({ children }: ControlPainelProps) {
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
