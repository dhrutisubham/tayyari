import React, { useState, useEffect } from 'react';
import './App.css'
import Question from './components/question/question.jsx'


function App() {
  const [questionsSet, setQuestions] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/a7ab9a0e-9ae4-4a36-a1fb-fba4a3c0766e.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setQuestions(data.questions);
        console.log(questionsSet);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      {questionsSet && (
      <Question questions={questionsSet}></Question> )}
    </>
  )
}

export default App
