//#region Imports
import AuthLayout from "@/components/AuthLayout";
import AppHead from "@/components/Layout/Head";
import EditProfileSection from "@/components/Profile/EditProfileSection";
import ProfileSection from "@/components/Profile/ProfileSection";
import Subscriptions from "@/components/Profile/Subscriptions";
import TopSection from "@/components/Profile/TopSection";
import Transactions from "@/components/Profile/Transactions";
import { EDIT, PROFILE, TRANSACTIONS, SUBSCRIPTION } from "@/constants/constants";
import React, { useState } from "react";
//#endregion

const Profile = () => {
  const [isEdit, setIsEdit] = useState(EDIT);
  const [isTransactions, setIsTransactions] = useState(null);
  const [isSubscriptions, setIsSubscriptions] = useState(null);
  const [isProfile, setIsProfile] = useState(null);

  console.log("isEdit : ", isEdit);

  return (
    <>
      <AppHead title={"Profile"} />
      <TopSection />
      {isProfile === PROFILE && (
        <ProfileSection setIsProfile={setIsProfile} setIsEdit={setIsEdit} setIsSubscriptions={setIsSubscriptions} setIsTransactions={setIsTransactions} />
      )}
      {isEdit === EDIT && (
        <EditProfileSection setIsProfile={setIsProfile} setIsSubscriptions={setIsSubscriptions} setIsEdit={setIsEdit} setIsTransactions={setIsTransactions} />
      )}
      {isTransactions === TRANSACTIONS && (
        <Transactions setIsProfile={setIsProfile} setIsSubscriptions={setIsSubscriptions} setIsEdit={setIsEdit} setIsTransactions={setIsTransactions} />
      )}
      {isSubscriptions === SUBSCRIPTION && (
        <Subscriptions setIsProfile={setIsProfile} setIsSubscriptions={setIsSubscriptions} setIsEdit={setIsEdit} setIsTransactions={setIsTransactions} />
      )}
    </>
  );
};

const getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

Profile.getLayout = getLayout;

export default Profile;
