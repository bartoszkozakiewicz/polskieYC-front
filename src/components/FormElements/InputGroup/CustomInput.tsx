import React from "react";

interface Props {
  key_: string;
  val: string;
  valSetter: any;
  label: string;
  placeholder: string;
}

const CustomInput = ({ key_, val, valSetter, label, placeholder }: Props) => {
  return (
    <div className="w-full ">
      <label
        className="mb-1 block text-body-sm font-medium text-dark dark:text-white"
        htmlFor="phoneNumber"
      >
        {label}
      </label>
      <input
        value={val}
        onChange={(e) => valSetter(key_, e.target.value)}
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        type="text"
        name="Title"
        id="title"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
