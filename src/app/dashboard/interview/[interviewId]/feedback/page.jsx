"use client";
import React, { useEffect, useState, useMemo, use } from "react";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Feedback = ({ params }) => {
  const { interviewId } = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  // Calculate average rating once feedbackList updates
  const averageRating = useMemo(() => {
    if (feedbackList.length === 0) return null;
    const total = feedbackList.reduce(
      (sum, item) => sum + Number(item.rating),
      0
    );
    // keeping one decimal place; we can also use Math.round(total / feedbackList.length) for an integer
    return (total / feedbackList.length).toFixed(1);
  }, [feedbackList]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback</h2>

      <h2 className="text-indigo-700 text-lg my-3">
        Your overall interview rating:{" "}
        {averageRating !== null ? (
          <strong>{averageRating}/10</strong>
        ) : (
          <span className="italic text-gray-400">N/A</span>
        )}
      </h2>

      <h2 className="text-sm text-gray-500">
        Below are each question with the correct answer, your answer, and
        feedback:
      </h2>

      {feedbackList.length === 0 ? (
        <div className="mt-5 text-center text-gray-500 italic">
          No feedback available for this interview.
        </div>
      ) : (
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-2 bg-gray-200 rounded-lg my-2 text-left flex items-center gap-2 cursor-pointer w-full justify-between">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg">
                  <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                  <strong>Your Answer:</strong> {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct Answer:</strong> {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-indigo-700">
                  <strong>Feedback:</strong> {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      )}

      <Button
        onClick={() => router.replace("/dashboard")}
        className="bg-indigo-700 hover:bg-indigo-600 mt-5 cursor-pointer"
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
