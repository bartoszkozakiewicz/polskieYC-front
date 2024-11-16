import React from 'react'
import Dropdown from '../Dropdown'

interface Props {
    setMp3File: (file: File) => void;
    setDocxTemplate: (file: File) => void;
}

const StepZero = ({setMp3File, setDocxTemplate}:Props) => {
  return (
    <div className='flex flex-row items-center w-[100%]'>
        <div className='flex-grow basis-5/10 p-6.5'>
            <Dropdown setFile={setDocxTemplate} type= 'docs'/>
        </div>
        <div className='flex-grow basis-5/10 flex flex-col gap-6 p-6.5'>
            <Dropdown setFile={setMp3File} type='mic'/>
        </div>
    </div>
  )
}

export default StepZero