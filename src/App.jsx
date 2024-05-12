import React, { useState, useEffect } from 'react';
import './App.css'
import Question from './components/question/Question'




function App() {
  const [questionsSet, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://run.mocky.io/v3/a7ab9a0e-9ae4-4a36-a1fb-fba4a3c0766e`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setQuestions(data.questions);
        console.log(questionsSet);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestions();
  }, []);


  return (
    <>
      {questionsSet.length!=0 && (
      <Question questions={questionsSet}></Question> )}
    </>
  )
}

export default App
