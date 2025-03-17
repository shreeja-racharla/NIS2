import React from "react";
import Nis2Cover from "@/globalcomponents/Nis2selfassesment/Nis2cover";
import Nis2Maturity from "@/globalcomponents/Nis2selfassesment/Nis2Maturity";
import Nis2Definition from "@/globalcomponents/Nis2selfassesment/Nis2Defination";

import Nis2InformationSecurity from "@/globalcomponents/Nis2selfassesment/Nis2InformationSecurity";
import DynamicNis2Tabs from "@/globalcomponents/Nis2selfassesment/DynamicNis2TabsWithRouter";

// Define the NIS2-specific tab items
const tabItems = [
  { label: "Cover", component: Nis2Cover },
  { label: "Maturity", component: Nis2Maturity },
  { label: "Definition", component: Nis2Definition },
  { label: "Information Security", component: Nis2InformationSecurity },

  // { label: "Information Security", component: Nis2InformationSecurity },
];

function Nis2Tabs() {
  return (
    <DynamicNis2Tabs 
      tabItems={tabItems} 
      reportModalComponent={null} // Remove the Excel report modal for now
    />
  );
}

export default Nis2Tabs;
