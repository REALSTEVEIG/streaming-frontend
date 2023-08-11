//#region Imports
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import PartnershipSection from "@/components/Partnership/PartnershipSection";
import TopSection from "@/components/Partnership/TopSection";
import { getPartnerships } from "@/services/partnerships.service";
import React, { useEffect, useState } from "react";
//#endregion

const Partnerships = () => {
  const [partnershipPlans, setPartnershipPlans] = useState([]);
  const getPartnershipPlans = async () => {
    let result = await getPartnerships();
    setPartnershipPlans(result.data);
  };
  useEffect(() => {
    getPartnershipPlans();
  }, []);

  return (
    <>
      <AppHead title={"Partnership"} />
      <TopSection />
      <PartnershipSection items={partnershipPlans} />
    </>
  );
};
const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

Partnerships.getLayout = getLayout;

export default Partnerships;
