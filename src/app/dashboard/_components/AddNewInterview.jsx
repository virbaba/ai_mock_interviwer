"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AIResponse from "../../../../utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();

  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc} Year of experience ${jobExperience}, depends on this information please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} intrerview question, ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_EASY} easy, ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_MEDIUM} medium and ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_HARD} hard, with answered in json format, give question and answer as field in json`;

      const answer = await AIResponse(InputPrompt);

      // Removes ```json and ``` with optional whitespace/newlines
      const exactAnswer = answer.replace(/```json\s*|```/g, "").trim();

      setJsonResponse(exactAnswer);

      if (exactAnswer) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: exactAnswer,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });
      } else {
        console.log("error in generate resposne by AI");
      }
      if (resp) {
        setOpenDialog(false);
        setLoading(false);
        router.push(`/dashboard/interview/${resp.mockId}`);
      }
    } catch (err) {
      console.error("Gemini API error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 cursor-pointer transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview.
            </DialogTitle>
            <DialogDescription>
              Add details about your job position, description and experience.
            </DialogDescription>

            <form onSubmit={onSubmit}>
              <div>
                <div className="mt-7 my-2">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/ Tech Stack (In Short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, Node.js, MySql etc."
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>
                <div>
                  <label>Year of Experience</label>
                  <Input
                    placeholder="Ex. 5 years"
                    type="number"
                    required
                    max="100"
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end mt-5">
                <Button
                  className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
                  onClick={() => setOpenDialog(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-indigo-700 hover:bg-indigo-600 cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 animate-spin" />
                      Generating from AI...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
