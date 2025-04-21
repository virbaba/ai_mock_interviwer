"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Clock, MessageCircle, BarChart2 } from "lucide-react";
import Header from "../dashboard/_components/Header";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    icon: <Mic className="w-8 h-8 text-indigo-600" />,
    title: "Record Your Answer",
    description:
      "Use our built-in voice recorder to answer each mock interview question naturally.",
  },
  {
    id: 2,
    icon: <Clock className="w-8 h-8 text-indigo-600" />,
    title: "AI-powered Analysis",
    description:
      "Our AI evaluates your response instantly, providing a 1–10 rating and pinpointed feedback.",
  },
  {
    id: 3,
    icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
    title: "Get Structured Feedback",
    description:
      "Receive concise, actionable improvements in JSON format, focusing on clarity and confidence.",
  },
  {
    id: 4,
    icon: <BarChart2 className="w-8 h-8 text-indigo-600" />,
    title: "Track Your Progress",
    description:
      "Review your overall rating and detailed feedback history to measure your growth over time.",
  },
];

const HowItWorksPage = () => {
    const router = useRouter();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16 px-6 lg:px-24">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-700">
            How It Works
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our AI-driven mock interviews guide you step-by-step to boost your
            confidence and sharpen your responses.
          </p>
        </section>

        {/* Steps Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow"
            >
              <CardHeader className="items-center">
                <div className="flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800 text-center">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-indigo-700 hover:bg-indigo-600 px-8 py-4 cursor-pointer"
            onClick={()=>router.replace("/dashboard")}
          >
            Start Your Mock Interview
          </Button>
        </section>
      </main>
    </>
  );
};

export default HowItWorksPage;
