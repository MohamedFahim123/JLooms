import DashBoardFilterations from "@/app/components/DashBoardFilterations/DashBoardFilterations";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "@/app/components/DashBoardTable/DashBoardTable";
import { Metadata } from "next";
import { classes } from "../utils/tableData";

export const metadata: Metadata = {
    title: "Our Classes",
};

export default function page() {
    const tableCells : string[] = ['Class Name', 'Floor', 'Number of Students'];

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text='Classes' btnText='Add Class' haveBtn={true} btnLink='/dashboard/classes/add-new-class' />
            <DashBoardFilterations placeHolder="Find a Class" />
            <div className="overflow-x-auto">
                <DashBoardTable tableData={classes} tableCells={tableCells} currPage={'classes'} />
            </div>
        </div>
    );
};