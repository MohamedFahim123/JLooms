import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { dataURLS } from "../../utils/dataUrls";

export const metadata: Metadata = {
  title: `Role Details`,
};

interface ParamsProps {
  id: string;
};

interface RoleDetailsProps {
  params: Promise<ParamsProps>;
};

interface PermissionInterface {
  id: number;
  name: string;
  enable: boolean;
};

const SingleRolePage = async ({ params }: RoleDetailsProps) => {
  let counter: number = 0;
  const { id } = await params;
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;

  const fetchRole = await fetch(`${dataURLS.singleRole}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await fetchRole?.json();
  const role = response?.data?.role;
  const permissions: PermissionInterface[] = response?.data?.permissions;

  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead text={role?.name || ""} haveBtn={false} />
        <div className="w-full">
          <div className="grid grid-cols-12 font-semibold text-gray-600 px-6 py-3 border-b border-gray-200">
            <div className="col-span-1">#</div>
            <div className="col-span-8">Permissions</div>
            <div className="col-span-3 text-center">Enabled</div>
          </div>

          {permissions?.map((permission) => {
            if (permission.enable) {
              counter = counter + 1;
            }
            return (
              permission.enable && (
                <div
                  key={permission?.id}
                  className="grid grid-cols-12 items-center px-6 py-3 border-b border-gray-100"
                >
                  <div className="col-span-1 text-sm">{counter}.</div>

                  <div className="col-span-8 text-sm">{permission?.name}</div>

                  <div className="col-span-3 flex items-center justify-center gap-2">
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={permission.enable}
                        readOnly
                        className="sr-only peer"
                      />
                      <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-emerald-500 transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-6"></div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        permission.enable ? "text-emerald-600" : "text-gray-400"
                      }`}
                    >
                      {permission.enable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </Suspense>
  );
};

export default SingleRolePage;
