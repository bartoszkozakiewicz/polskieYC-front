import React from 'react'
import Dropdown from '../Dropdown'

interface Props {
    setMp3File: (file: File) => void;
    setFormatPrompt: (prompt: string) => void;
}

const StepZero = ({setMp3File, setFormatPrompt}:Props) => {
  return (
    <div className='flex-grow basis-7/10 flex flex-col gap-6 p-6.5'>
        <textarea
            onChange={(e) => setFormatPrompt(e.target.value)}
            rows={6}
            placeholder="Write down type of speech given and your requirements according to the document"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        ></textarea>
        <Dropdown setFile={setMp3File} type="mic"/>
    </div>
  )
}

export default StepZero