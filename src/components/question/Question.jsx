import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';


const Question = ({title, body, image, options}) => {
  return (
    <form className="w-full h-full flex flex-col gap-2 md:gap-6 pb-0 p-5 md:pt-6 md:px-8 lg:pt-8 lg:px-10 shadow-lg bg-white rounded-lg overflow-auto"> 
      <div className='flex justify-between gap-4 items-center md:justify-start'>
        <button className="rounded p-2 md:hidden bg-gray-200">
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </button>
        <h1 className='font-medium md:font-bold text-lg text-gray-700 md:text-gray-900'>{title}</h1>
        <button className="rounded p-2 md:hidden bg-gray-200">
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </button>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
      <p className='text-gray-900 w-full text-justify'>
        <Latex displayMode={true}>{body}</Latex>
      </p>
      {
        (image!=null) && (
          <img src={image} alt="Question Image" className="w-3/4" />
        )
      }
      </div>
      <div className="grow"></div>
      <div className="sticky order-11 bg-white bottom-0 border-t-2 border-gray-200 py-4 pb-6 flex justify-center md:justify-between w-full">
        <button className="hidden md:block border-gray-400 text-gray-500 pr-4 pl-2 py-2 rounded-md border-2 flex gap-2">
        <ArrowBackIcon></ArrowBackIcon>
          Previous
          
          </button>
        <div className="flex gap-2">
        <button className="border-gray-400 text-gray-500 px-4 py-2 rounded-md border-2 ">Check Solution</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md ">Submit Answer</button>

        </div>
        <button className="hidden md:block border-gray-400 text-gray-500 pl-4 pr-2 py-2 rounded-md border-2 flex gap-2">
          Next
          <ArrowForwardIcon></ArrowForwardIcon>
          </button>
      </div>
      <ul className="flex flex-col md:flex-row flex-wrap w-full">
  {options.map((option, index) => (
    <li key={index} className="w-full shadow-md">
      <input type='radio' className='flex flex-col gap-2' />
      {/* Conditionally render text and image options */}
      {option.text && <span>{option.text}</span>}
      {option.image && <img src={option.image} alt={`Answer Option ${index}`} />}
    </li>
  ))}
</ul>
    </form>
  )
}

export default Question