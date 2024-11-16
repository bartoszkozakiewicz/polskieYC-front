import React from 'react'
import StepZero from './StepZero'
import StepOne from './StepOne';

interface Props {
  activeStep: number;
  setMp3File: (file: File) => void;
  setDocxTemplate: (file: File) => void;
}

const Autofill = ({activeStep, setMp3File, setDocxTemplate}:Props) => {
  return (
    <div className='flex flex-row items-center'>
        {
        (() => {
          switch (activeStep) {
            case 0:
              return <StepZero setMp3File={setMp3File} setDocxTemplate={setDocxTemplate}/>
            case 1:
              return <StepOne />
            default:
              return null;
          }
        })()
      }

  </div>
  )
}

export default Autofill