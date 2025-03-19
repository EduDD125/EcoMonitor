import ControlPainel from "src/components/painels/controlPainel/controlPainel";
import LogTable from "src/components/tables/log/logTable";

export default function LogsPage() {
    return (
      <>
        <ControlPainel>
          <div>
            <LogTable />
          </div>
        </ControlPainel>
      </>
    );
  };