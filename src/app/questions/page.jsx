"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../dashboard/_components/Header";

// Example interview questions data; replace with your fetched data
const mockQuestions = [
  { id: 1, question: "What are your strengths?" },
  { id: 2, question: "Tell me about a challenge you faced at work." },
  { id: 3, question: "Where do you see yourself in 5 years?" },
];

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = mockQuestions.length;
  const current = mockQuestions[activeIndex];

  const handlePrev = () => {
    setActiveIndex((i) => Math.max(i - 1, 0));
  };
  const handleNext = () => {
    setActiveIndex((i) => Math.min(i + 1, total - 1));
  };

  const progressPercent = ((activeIndex + 1) / total) * 100;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-700 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>
              Question {activeIndex + 1} of {total}
            </span>
            <span>{progressPercent.toFixed(0)}%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Question {activeIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 leading-relaxed">{current.question}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrev}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <Button
              size="sm"
              className="bg-indigo-700 hover:bg-indigo-600"
              onClick={handleNext}
              disabled={activeIndex === total - 1}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default Page;
