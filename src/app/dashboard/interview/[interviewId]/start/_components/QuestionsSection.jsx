import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  // Utility function to get color classes based on difficulty
  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "hard":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const textToSpeech = (text) => {
    if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }else{
        alert("Sorry your browser does not support text to speech feature");
    }
  }

  

  return (
    mockInterviewQuestion && (
      <div className="p-6 border rounded-xl shadow-sm bg-white space-y-6 mt-10">
        {/* Question Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestion?.map((_, index) => (
            <div
              key={index}
              className={`py-2 px-3 rounded-full text-sm text-center cursor-pointer font-medium transition-all duration-200 ${
                activeQuestionIndex === index
                  ? "bg-indigo-700 text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveQuestionIndex(index)}
            >
              Question #{index + 1}
            </div>
          ))}
        </div>

        {/* Current Question Details */}
        <div className="p-6 border rounded-lg bg-gray-50 shadow-md relative">
          {/* Difficulty Tag Top Right */}
          <span
            className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyBadgeClass(
              mockInterviewQuestion[activeQuestionIndex]?.difficulty
            )}`}
          >
            {mockInterviewQuestion[activeQuestionIndex]?.difficulty}
          </span>

          {/* Question */}
          <h2 className="text-lg font-semibold text-gray-800 mt-6">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>
        </div>
        <Volume2
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
          className="cursor-pointer"
        />
        <div className="border rounded-lg bg-blue-100 p-5 text-justify text-indigo-700 mt-20">
          <h2 className="flex gap-2 items-center ">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2>
            Click on Record Answer when you want to answer the question. At the
            end of interview we will give you feedback along with correct answer
            for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
