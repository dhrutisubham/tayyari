import React, { useState, useEffect } from 'react';
import './App.css'
import Question from './components/question/Question'




function App() {
  const [questionsSet, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://run.mocky.io/v3/92ccab19-d24c-48f0-a0ea-b78a1f3728eb`);
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
