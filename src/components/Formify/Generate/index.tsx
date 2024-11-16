import React from 'react'
import StepZero from './StepZero';

interface Props {
  activeStep: number;
  setMp3File: (file: File) => void;
  setFormatPrompt: (prompt: string) => void;
}

const Generate = ({activeStep, setMp3File, setFormatPrompt}:Props) => {
  return (
    <div className='flex flex-row items-center'>
      {
        (() => {
          switch (activeStep) {
            case 0:
              return <StepZero setMp3File={setMp3File} setFormatPrompt={setFormatPrompt}/>
            case 1:
              return <h1 className='text-heading-5 font-bold text-dark dark:text-white'>Verify and save document</h1>
            case 2:
              return <h1 className='text-heading-5 font-bold text-dark dark:text-white'>Create an ad</h1>
            default:
              return null;
          }
        })()
      }
    </div>
  )
}

export default Generate