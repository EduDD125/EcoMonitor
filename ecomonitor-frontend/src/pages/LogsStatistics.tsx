import ControlPainel from "../components/painels/controlPainel/controlPainel";
import LogStatisticsChart from "src/components/charts/logStatisticChart";

export default function LogsStatistics() {
  return (
    <>
      <ControlPainel>
          <LogStatisticsChart />
      </ControlPainel>
    </>
  );
};