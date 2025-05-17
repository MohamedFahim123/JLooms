import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "@/app/components/DashBoardTable/DashBoardTable";
import Loader from "@/app/components/Loader/Loader";
import SingleStudentView from "@/app/components/SingleStudentView/SingleStudentView";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { dataURLS } from "../../utils/dataUrls";

interface ParamsProps {
  id: string;
}

interface StudentsDetailsProps {
  params: Promise<ParamsProps>;
}

export const metadata: Metadata = {
  title: `Student Details`,
};

export default async function SingleStudentPage({
  params,
}: StudentsDetailsProps) {
  const { id } = await params;
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;
  const { userLoginned, userLoginnedType } = useLoginnedUserStore.getState();

  const fetchTeacher = await fetch(`${dataURLS.singleStudent}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await fetchTeacher?.json();

  const student = response?.data?.student;
  const tableCells =
    userLoginnedType === "Admin"
      ? ["Parent Name", "Parent Code", "Relation", "Mobile"]
      : userLoginned?.permissions?.includes("Un Assign Parents")
      ? ["Parent Name", "Parent Code", "Relation", "Mobile", "Remove"]
      : ["Parent Name", "Parent Code", "Relation", "Mobile"];

  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead
          text={`code: ${student?.code}` || ""}
          haveBtn={false}
        />
        <SingleStudentView student={student} />
        {userLoginnedType === "Admin"
          ? student?.parents?.length > 0 && (
              <DashBoardTable
                currPage="singleStudent"
                tableCells={tableCells}
                tableData={student?.parents}
                currStudentId={id}
              />
            )
          : userLoginned?.permissions?.includes("Assign Parents") &&
            student?.parents?.length > 0 && (
              <DashBoardTable
                currPage="singleStudent"
                tableCells={tableCells}
                tableData={student?.parents}
                currStudentId={id}
              />
            )}
      </div>
    </Suspense>
  );
}
