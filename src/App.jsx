import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Question from './components/question/Question'

var text=`$$(3\\times 4) \\div (5-3)$$`;
let optionshaha=[
  {
    text: "Option 1",
    image: "/vite.svg"
  },
  {
    text: "Option 2",
    image: "/another-image.svg"
  },
  // Add more options as needed
]
function App() {
  return (
    <>
      <Question title={"Question 1"} body={text} image={`/vite.svg`} options={optionshaha}></Question> 
    </>
  )
}

export default App
