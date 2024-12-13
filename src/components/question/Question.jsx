import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';



const Question = ({ questions }) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userChoices, setUserChoices] = useState(Array(questions.length).fill(null));
  const [showSolution, setShowSolution] = useState(false);

  const { id, type, question, image, options, correct_answer, correct_answers, common_image } = questions[currentQuestionIndex];

  let correctedAnswerArray=[];
  if (typeof correct_answer === 'object' && correct_answer !== null) {
     correctedAnswerArray = Object.entries(correct_answer).map(([key, value]) => ({ key, value }));
   } 
   else{
     correctedAnswerArray= correct_answer;
   }

  const handleNextClick = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex);
    setShowSolution(false);
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : prevIndex);
    setShowSolution(false);
  };

  const handleOptionChange = (optionIndex) => {
    setUserChoices(prevChoices => {
      const updatedChoices = [...prevChoices];
      updatedChoices[currentQuestionIndex] = optionIndex;
      return updatedChoices;
    });
  };

  const handleSubmitAnswer = () => {
    setShowSolution(true);
    // Compare user's choice with correct answer and display result
    // You can implement this logic based on your requirement
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    // Display correct answer and solution for the current question
  };

  const handleCloseSolution = () => {
    setShowSolution(false);
    // Display correct answer and solution for the current question
  };

  

  return (
    <div className='md:flex gap-2 h-full'>

    {/* Question Section  */}
    <section className="w-full h-full flex flex-col gap-2 md:gap-6 shadow-md bg-white rounded-lg overflow-auto"> 
      {/* Header */}
      <div className='sticky customPadding top-0 flex justify-between gap-4 items-center md:justify-start md:py-4 bg-white shadow-sm z-10'>
        <button className="rounded-lg p-2 md:hidden bg-gray-100" onClick={handlePreviousClick}>
          <ArrowBackIosNewIcon />
        </button>
        <h1 className='font-medium md:font-bold text-lg text-gray-700 md:text-gray-900'>Question {id}</h1>
        <button className="rounded-lg p-2 md:hidden bg-gray-100" onClick={handleNextClick}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      {/* Question Body */}
      <div className="flex flex-col customPadding gap-4 justify-center items-center">
        <p className='text-gray-900 w-full text-justify'>
          <Latex displayMode={true}>{question}</Latex>
        </p>
        {image && <img src={image} alt="Question Image" className="w-3/4" />}
      </div>
      {/* Options */}
      <ul className="flex flex-col customPadding md:flex-row flex-wrap w-full gap-2">
        {options.map((option, index) => (
          <li key={index} className={`w-full ${(option.image != null) ? "md:w-5/6" : "md:max-w-[80%] md:w-fit"} md:pr-6 border border-gray-200 flex gap-3 p-2 md:p-4 rounded-lg pt-2`}>
            <input type='radio' id={`Option ${index + 1}`} className='hidden' checked={userChoices[currentQuestionIndex] === index} onChange={() => handleOptionChange(index)} />
            {/* Conditionally render text and image options */}
            {(option.text || option.image) && (
              <label htmlFor={`Option ${index + 1}`} className="answers inline-flex gap-2 w-full pr-8 pb-1 pl-4">
                <div className='flex flex-col gap-4'>
                {option.text && <Latex displayMode={true}>{option.text}</Latex>}
                {option.image && <img className='w-full' src={option.image} alt={`Answer Option ${index + 1}`} />}
                </div>
              </label>
            )}
          </li>
        ))}
      </ul>
      {/* Footer */}
      <div className="grow"></div>
      <div className="sticky order-11 customPadding bg-white bottom-0 border-t-2 border-gray-200 py-4 pb-6 flex justify-center md:justify-between w-full">
        <button className="hidden md:flex border-gray-400 text-gray-500 pr-4 pl-2 py-2 rounded-md border-2  gap-2" onClick={handlePreviousClick}>
          <ArrowBackIcon />
          Previous
        </button>
        <div className="flex gap-2">
          <button className="border-gray-400 text-gray-500 px-4 py-2 rounded-md border-2" onClick={handleShowSolution}>
            Check Solution
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSubmitAnswer}>
            Submit Answer
          </button>
        </div>
        <button className="hidden md:flex border-gray-400 text-gray-500 pl-4 pr-2 py-2 rounded-md border-2 gap-2" onClick={handleNextClick}>
          Next
          <ArrowForwardIcon />
        </button>
      </div>
    </section>

    {/* Answer Section  */}
    {showSolution && (
      <>
      {/* Dark  Overlay  */}
      <div className="fixed top-0 bottom-0 left-0 right-0 md:hidden bg-black opacity-50 z-20"></div>
      <section className="h-full w-2/3 md:w-1/2 bg-white rounded-lg shadow-md p-4 absolute right-0 top-0 z-20 md:static">
        <div className='flex justify-between items-center mb-3'>
        <h2 className='font-semibold text-lg '>Answer</h2>
        <button onClick={handleCloseSolution}><CloseIcon></CloseIcon></button>
        </div>
        <section className="flex flex-col gap-2">
          {
            correct_answer && (
              <div className="p-2 bg-blue-100 rounded-md">
              <Latex>{correct_answer.text}</Latex>
            </div>
            )}
          {
          correct_answers && (
          correct_answers.map((answer, index) => (
            <div key={index} className="p-2 bg-blue-100 rounded-md">
              <Latex>{answer.text}</Latex>
            </div>
          )))}

          {common_image && (
            <img src={common_image} alt="Common Answer Image" />
          )}

        </section>
      </section>
      </>
    )}
    </div>
  );
}

export default Question;
