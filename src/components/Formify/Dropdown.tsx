import React from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import { SlDocs } from "react-icons/sl";

interface DropdownProps {
  type?: string;
  setFile: (file: File) => void;
}

const Dropdown = ({type, setFile}:DropdownProps) => {
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Uploaded file: ", file);
    if (file) {
      setFile(file); 
      setFileName(file.name);
    }
  };

  return (
    <div
    id="FileUpload"
    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
  >
    <input
      type="file"
      name="profilePhoto"
      id="profilePhoto"
      // accept="image/png, image/jpg, image/jpeg"
      accept={type === 'mic' ? 'audio/mp3' : '.docx'}
      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
      onChange={handleFileChange}
    />
    <div className="flex flex-col items-center justify-center">
      <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
        {type === 'mic' && <CiMicrophoneOn className="text-[#5750F1] text-2xl" />}
        {type === 'docs' && <SlDocs className="text-[#5750F1] text-2xl" />}
      </span>
      {fileName ?
      <p className="mt-2.5 text-body-sm font-medium">
        <span className="text-primary">File uploaded </span>
        {fileName}
      </p>
       : 
       <p className="mt-2.5 text-body-sm font-medium">
        <span className="text-primary">Click to upload</span> or
        drag and drop
      </p>}
     
      <p className="mt-1 text-body-xs">
        {type === 'mic' && 'MP3 (max, 1h)'}
        {type === 'docs' && 'DOCX (max, 50MB)'}
      </p>
    </div>
  </div>
  )
}

export default Dropdown