"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const getFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl shadow-sm
    hover:shadow-lg hover:-translate-y-1
     transition-shadow duration-200
    p-6 flex flex-col justify-between h-full
      "
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-indigo-700">
          {interview.jobPosition}
        </h2>
        <div className="flex items-center text-gray-600 text-sm">
          <Briefcase className="w-4 h-4 mr-1" />
          <span>{interview.jobExperience} yrs experience</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Created: {interview.createdAt}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Button
          onClick={getFeedback}
          size="sm"
          variant="outline"
          className="cursor-pointer w-1/2 hover:bg-indigo-50"
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-1/2 bg-indigo-700 hover:bg-indigo-600 cursor-pointer"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
