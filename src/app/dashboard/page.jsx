'use client'
import React, { useEffect } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const {user} = useUser();
  const router = useRouter();
  useEffect(()=>{

    if(!user){
      router.replace('/sign-in');
    }
  }, [user])
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2>Create And Start Your AI Mockup Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/* Previous Interview List */}
      <InterviewList/>
    </div>
  );
};

export default Dashboard;
