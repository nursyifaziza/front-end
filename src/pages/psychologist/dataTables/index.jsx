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
import {Box} from "@chakra-ui/react";
import AppointmentsTable from "@/pages/psychologist/dataTables/components/AppointmentsTable";
import {columnsDataComplex} from "@/pages/psychologist/default/variables/columnsData";
import tableDataComplex from "@/pages/psychologist/default/variables/tableDataComplex.json";

export default function Settings() {
    // Chakra Color Mode
    return (
        <Box p={"32px"}>
            <Box>
                <AppointmentsTable
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}/>
            </Box>
        </Box>
    );
}
