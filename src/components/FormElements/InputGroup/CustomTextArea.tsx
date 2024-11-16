import React from "react";

interface Props {
  key_: string;
  val: string;
  valSetter: any;
  label: string;
  placeholder: string;
}

const CustomTextArea = ({
  key_,
  val,
  valSetter,
  label,
  placeholder,
}: Props) => {
  return (
    <div>
      <label
        className="mb-1 block text-body-sm font-medium text-dark dark:text-white"
        htmlFor="phoneNumber"
      >
        {label}
      </label>
      <textarea
        value={val}
        onChange={(e) => valSetter(key_, e.target.value)}
        rows={6}
        placeholder={placeholder}
        style={{ resize: "none" }}
        className=" w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      ></textarea>
    </div>
  );
};

export default CustomTextArea;
