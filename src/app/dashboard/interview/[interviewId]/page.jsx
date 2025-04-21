"use client";
import React, { use, useEffect, useState } from "react";
import { MockInterview } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import { Lightbulb, Webcam as WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Interview = ({ params }) => {
  const { interviewId } = use(params);

  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience} Years
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex items-center gap-2 font-semibold text-yellow-500">
              <Lightbulb />
              Information
            </h2>
            <h2 className="text-justify text-yellow-500 mt-3">
              Enable Video Web Cam and Microphone to start your AI Generated
              Mock Interview. It has{" "}
              {process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions which
              you can answer. At the end, you’ll get a report based on your
              responses. <br />
              <span className="font-semibold">NOTE:</span> We never record your
              video. You can disable webcam access at any time.
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 rounded-lg border bg-gray-200" />
              <Button
                onClick={() => setWebCamEnabled(true)}
                className="bg-indigo-400 text-white w-full py-2 rounded-lg font-semibold cursor-pointer hover:bg-indigo-600"
              >
                Enable Camera and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className="bg-indigo-700 hover:bg-indigo-600 cursor-pointer">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
