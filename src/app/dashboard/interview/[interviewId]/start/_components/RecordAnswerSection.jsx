"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Webcam = dynamic(() => import("react-webcam"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";
const useSpeechToText = dynamic(
  () => import("react-hook-speech-to-text").then((mod) => mod.default),
  { ssr: false }
);

import { Mic } from "lucide-react";
import { toast } from "sonner";
import AIResponse from "../../../../../../../utils/GeminiAiModel";
import { db } from "../../../../../../../utils/db";
import { UserAnswer } from "../../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  console.log(mockInterviewQuestion);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results?.map((result) => {
      setUserAnswer((prevAns) => prevAns + " " + result.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) updateUserAnswerInDb();
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswerInDb = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for given interview question " +
      "Please give us rating for answer and feedback as area of imporvment if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const answer = await AIResponse(feedbackPrompt);

    // Removes ```json and ``` with optional whitespace/newlines
    const exactAnswer = answer.replace(/```json\s*|```/g, "").trim();
    console.log(userAnswer);
    const jsonFeedbackResp = JSON.parse(exactAnswer);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: jsonFeedbackResp?.feedback,
      rating: jsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 my-10 bg-black">
        <Image
          src={"/images/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam image"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        className={` cursor-pointer my-10 ${
          isRecording
            ? "bg-gray-200 hover:bg-gray-300"
            : "text-indigo-700  hover:bg-indigo-100 bg-white border"
        }`}
        onClick={startStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 items-center">
            <Mic /> Stop Recording
          </h2>
        ) : (
          <>
            <Mic /> Record Answer
          </>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
