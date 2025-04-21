"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="animate-spin h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-gray-600">Loading interviews...</span>
        </div>
      ) : interviewList.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          No interviews found. Start a new mock interview to see it listed here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;