import { Table } from "@/app/dashboard/utils/interfaces";
import ClassesTableRow from "../ClassesTableRow/ClassesTableRow";
import CurriculumsTableRow from "../CurriculumsTableRow/CurriculumsTableRow";
import EmployeesTableRow from "../EmployeesTableRow/EmployeesTableRow";
import MainParentTableRow from "../MainParentTableRow/MainParentTableRow";
import ParentTableRow from "../ParentTableRow/ParentTableRow";
import RolesTableRow from "../RolesTableRow/RolesTableRow";
import StudentsTableRow from "../StudentsTableRow/StudentsTableRow";
import TeachersTableRow from "../TeachersTableRow/TeachersTableRow";

interface DashBoardTableProps {
  tableData: Table[];
  tableCells: string[];
  currPage: string;
  currStudentId?: string;
}

export default function DashBoardTable({
  currPage,
  tableData,
  tableCells,
  currStudentId,
}: DashBoardTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="hidden md:table-header-group bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            {tableCells?.map((cell, index) => (
              <th key={index} className="py-3 px-4 font-semibold text-gray-500">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        {tableData?.map((cell) => (
          <tbody key={cell.id}>
            {currPage === "teachers" && <TeachersTableRow cell={cell} />}
            {currPage === "students" && <StudentsTableRow cell={cell} />}
            {currPage === "classes" && <ClassesTableRow cell={cell} />}
            {currPage === "parents" && <MainParentTableRow cell={cell} />}
            {currPage === "singleStudent" && cell?.code && (
              <ParentTableRow currStudentId={currStudentId} cell={cell} />
            )}
            {currPage === "employees" && <EmployeesTableRow cell={cell} />}
            {currPage === "Roles" && <RolesTableRow cell={cell} />}
            {currPage === "curriculums" && <CurriculumsTableRow cell={cell} />}
          </tbody>
        ))}
      </table>
    </div>
  );
}
