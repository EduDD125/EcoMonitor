import ReadingTable from "src/components/tables/reading/readingTable";
import ControlPainel from "../components/painels/controlPainel/controlPainel";

export default function ReadingsPage() {
  return (
    <>
      <ControlPainel>
          <ReadingTable />
      </ControlPainel>
    </>
  );
};