import ReadingTable from "src/components/tables/reading/readingTable";
import ControlPainel from "../components/painels/controlPainel/controlPainel";
import StatisticsChart from "src/components/charts/statisticChart";

export default function ReadingsPage() {
  return (
    <>
      <ControlPainel>
          <StatisticsChart />
      </ControlPainel>
    </>
  );
};