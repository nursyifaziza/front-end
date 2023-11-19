/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components
import TotalSessions from "./components/TotalSessions";
import AppointmentsTable from "../dataTables/components/AppointmentsTable";
import { columnsDataComplex } from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";
import TodaySessions from "./components/TodaySessions";

export default function UserReports() {
  return (
    <Box
      p="32px"
    >
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          xl: 2,
        }}
        gap="20px"
        mb="20px"
      >
        <TodaySessions />
        <TotalSessions />
      </SimpleGrid>

      <Box>
        <AppointmentsTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </Box>
    </Box>
  );
}
