import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { dataURLS } from "../../utils/dataUrls";

export const metadata: Metadata = {
  title: `Curriculum Details`,
};

type ParamsProps = {
  id: string;
};
const CurriculumDetails = async ({
  params,
}: {
  params: Promise<ParamsProps>;
}) => {
  const { id } = await params;
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;

  const fetchparent = await fetch(`${dataURLS.singleCurriculum}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await fetchparent?.json();
  const curriculum = response?.data?.curriculum;

  if (!curriculum) {
    return (
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead text={`Curriculum Not Found`} haveBtn={false} />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead text={curriculum?.code || ""} haveBtn={false} />
        <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                <FaGraduationCap size={32} className="text-[#8A8A8A]" />
              </span>
              {curriculum?.name}
            </h3>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CurriculumDetails;
