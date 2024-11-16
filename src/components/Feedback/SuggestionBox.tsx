import React from "react";

interface Props {
  suggestion: any;
  setSuggestion: any;
  addSuggestion: () => void;
}

const SuggestionBox = ({ suggestion, setSuggestion, addSuggestion }: Props) => {
  return (
    <div className="basis-1/3">
      <div className="">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="text-center text-xl font-medium text-dark dark:text-white">
                Suggest a feature
              </h3>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Short title
                  </label>
                  <input
                    value={suggestion ? suggestion.title : ""}
                    onChange={(e) =>
                      setSuggestion((prev: any) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="Title"
                    id="title"
                    placeholder="Write down title..."
                  />
                </div>
              </div>

              <label
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                htmlFor="phoneNumber"
              >
                Description
              </label>
              <textarea
                value={suggestion ? suggestion.description : ""}
                onChange={(e) =>
                  setSuggestion((prev: any) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={6}
                placeholder="Write down description of what you would like this features to do..."
                style={{ resize: "none" }}
                className="mb-6 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              ></textarea>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => addSuggestion()}
                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] text-xl font-medium text-gray-2 hover:bg-opacity-90"
                >
                  Suggest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;
