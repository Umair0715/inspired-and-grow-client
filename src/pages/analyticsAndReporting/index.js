import ReportCards from "components/analyticsAndReporting/ReportCards";
import ReportStatistics from "components/analyticsAndReporting/ReportStatistics";
import ReportTable from "components/analyticsAndReporting/ReportTable";
import BackBtn from "components/global/BackBtn";
import Heading from "components/global/Heading";
import Layout from "components/global/Layout";
import React from "react";

const AnalyticsAndReporting = () => {
    return (
        <Layout>
            <div>
                
                <div>
                    <BackBtn />
                </div>
                <div className="mt-4">
                    <Heading title='Reports And Analytics' showIcon={false} />
                </div>
                <div>
                    <ReportCards />
                </div>
                <div className="flex items-center justify-between gap-4 mt-6 ">
                    <div>
                        <p className="text-xl font-semibold text-grayText">
                        Daily Order Details
                        </p>
                    </div>
                    <div>
                        <select className="select-box">
                        <option>Order 1</option>
                        <option>Order 2</option>
                        <option>Order 3</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <ReportTable />
                </div>
                <div className="mt-10">
                    <ReportStatistics />
                </div>
            </div>
        </Layout>
    );
};

export default AnalyticsAndReporting;
