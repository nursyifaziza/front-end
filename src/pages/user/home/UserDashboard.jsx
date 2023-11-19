// import LineChart from "@/components/charts/LineAreaChart";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import FetchLineChart from "./LineChart.component";
import FetchBarChart from "./BarChart.component";
import UserAppointmentsTable from "./UserAppointmentsTable";
import {columnsData} from "./variables/columnsData";
import tableData from "./variables/tableData.json";

function UserDashboard() {
    return (
        <Box p={"32px"}>
                <Heading size="lg">
                    Dashboard
                </Heading>
            {/* <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "500px", height: "250px", margin: "20px" }}>
          <FetchBarChart />
        </div>
        <div style={{ width: "500px", height: "250px", margin: "20px" }}>
          <FetchLineChart />
        </div>
      </div> */}

            <SimpleGrid
                columns={{
                base: 1,
                md: 2,
                xl: 2
            }}
                gap="40px"
                mb="20px">
                <FetchBarChart/>
                <FetchLineChart/>
            </SimpleGrid>

            <Box>
                <UserAppointmentsTable columnsData={columnsData} tableData={tableData}/>
            </Box>
        </Box>
    );
}

export default UserDashboard;
