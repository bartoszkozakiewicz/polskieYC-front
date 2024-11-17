interface Props {
  label: string;
  isChecked: boolean;
  setSearchType: (searchType: string) => void;
}

const CustomCheckbox = ({ label, isChecked, setSearchType }: Props) => {
  const checkboxId = `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`; // Unique ID based on label

  return (
    <div>
      <label
        htmlFor={checkboxId}
        className="flex cursor-pointer select-none items-center text-body-sm font-medium text-dark dark:text-white"
      >
        <div className="relative">
          <input
            checked={isChecked}
            disabled={label=="Businesses"}
            type="checkbox"
            style={{pointerEvents: label=="Businesses" ? "none" : "auto"}}
            id={checkboxId}
            className="sr-only"
            onChange={() => {
              setSearchType(label); // Trigger the state update
            }}
          />

          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked
                ? "border-primary bg-gray-2 dark:bg-dark-2"
                : "border-dark-5 dark:border-dark-6"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-primary"
              }`}
            >
              {" "}
            </span>
          </div>
        </div>
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
