import React, { useState } from "react";
import questions from "./Mockdata";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (option) => {
    const updatedOptions = [...selectedOptions]
    updatedOptions[currentQuestion] = option
    setSelectedOptions(updatedOptions)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length -1) {
      setCurrentQuestion(currentQuestion +1);
    } else {
        let FinalScore = 0
        selectedOptions.forEach((option,index)=>{
            if(option === questions[index].answer) FinalScore++;
        })
        setScore(FinalScore)
      setShowScore(true);
    }
  }
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion- 1);
    }
  }
return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-100 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Space Quiz</h1>

        {showScore ? (
            <div className="text-center p-8 bg-indigo-50 rounded-lg">
                <h2 className="text-2xl font-semibold">
                    Score: {score} / {questions.length}
                </h2>
            </div>
        ) : (
            <>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Q{currentQuestion + 1}: {questions[currentQuestion].question}
                    </h2>
                    <ul className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <li
                                key={index}
                                className={`p-3 rounded-md cursor-pointer transition-colors ${
                                    selectedOptions[currentQuestion] === option 
                                        ? "bg-indigo-600 text-white" 
                                        : "bg-white hover:bg-indigo-100 border border-gray-200"
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-between mt-6">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentQuestion === 0}
                        className={`px-4 py-2 rounded-md ${
                            currentQuestion === 0 
                                ? "bg-gray-300 cursor-not-allowed" 
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={selectedOptions[currentQuestion] === null}
                        className={`px-4 py-2 rounded-md ${
                            !selectedOptions 
                                ? "bg-gray-300 cursor-not-allowed" 
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                    >
                        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </>
        )}
    </div>
);
};

export default Quiz;
