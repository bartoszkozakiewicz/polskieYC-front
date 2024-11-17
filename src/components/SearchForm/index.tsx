"use client";

import React, { useState } from "react";
import CustomTextArea from "../FormElements/InputGroup/CustomTextArea";
import CustomCheckbox from "../FormElements/Checkboxes/CustomCheckbox";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";
import { useAuth } from "@/contexts/AuthContext";
import { getIdToken } from "firebase/auth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import CustomLoader from "../common/CustomLoader";
import ProjectPanel from "../Projects/ProjectPanel";

const test_data = [
  {
    name: "Real-Time Task Performance Analytics",
    description:
      "A machine learning system that tracks an employee's progress on tasks in real-time, providing instant feedback and suggestions for improvement, thus helping optimize work output.",
    industry: "Corporate offices, remote teams, software development",
    tags: [
      "real-time analytics",
      "task tracking",
      "employee performance",
      "feedback automation",
    ],
    company: "test_name",
  },
  {
    name: "Personalized Healthcare Recommendations",
    description:
      "Utilize machine learning algorithms to analyze patient data including medical history, genetic information, lifestyle factors, and past treatment responses to create personalized healthcare recommendations. This could allow healthcare providers to tailor treatments to the individual needs of patients, improving outcomes and optimizing healthcare resources.",
    industry: "Healthcare",
    tags: [
      "Machine Learning",
      "Healthcare",
      "Personalization",
      "Predictive Analytics",
      "Patient Care",
    ],
    company: "Philips Polska",
  },
  {
    name: "Predictive Maintenance for Manufacturing Equipment",
    description:
      "In manufacturing industries, equipment failure can cause significant downtime and loss of productivity. By utilizing machine learning algorithms to analyze historical data from machinery (such as sensors that monitor temperature, vibration, and operational speed), companies can predict when a piece of equipment is likely to fail or need maintenance. This allows businesses to perform maintenance proactively instead of reactively, reducing unexpected breakdowns and associated costs.",
    industry: "Manufacturing",
    tags: [
      "Predictive Maintenance",
      "Machine Learning",
      "Manufacturing Efficiency",
      "Cost Reduction",
      "Operational Optimization",
    ],
    company: "ING Bank \u015al\u0105ski",
  },
  {
    name: "Predictive Maintenance for Manufacturing",
    description:
      "Manufacturing companies often face unexpected equipment failures that can lead to costly downtime and lost productivity. By implementing machine learning algorithms to analyze sensor data from machinery, companies can predict when a machine is likely to fail and schedule maintenance proactively. This reduces unplanned downtime, optimizes maintenance schedules, and improves overall operational efficiency.",
    industry: "Manufacturing",
    tags: [
      "Predictive Maintenance",
      "IoT",
      "Operational Efficiency",
      "Big Data",
      "Machine Learning",
    ],
    company: "BlaBla",
  },
  {
    name: "Dynamic Pricing Optimization",
    description:
      "Develop a machine learning model that analyzes real-time data from multiple sources, including competitor pricing, customer demand, and market trends, to optimize pricing strategies for products in retail. This model would allow businesses to adjust prices dynamically based on fluctuating conditions to maximize revenue and customer satisfaction.",
    industry: "Retail",
    tags: [
      "Pricing",
      "Machine Learning",
      "Retail Technology",
      "Revenue Management",
    ],
    company: "Zara",
  },
];

const SearchForm = () => {
  const { user } = useAuth();

  // -- USE STATES --
  const [searchType, setSearchType] = useState<string>("");
  const [reqs, setReqs] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // -- FUNCTIONS --
  const handleSetSearchType = (label: string) => {
    setSearchType(label);
  };

  const handleSearchResults = async () => {
    if (user) {
      const tokenId = await getIdToken(user);
      setIsLoading(true);
      setOpen(true);
      setIsLoading(false);

      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "custom_search",
        tokenId,
        "POST",
        { reqs: reqs, type: searchType, userId: user.uid },
      )
        .then((data: any) => {
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  const handleSaveReqs = (key: string, val: string) => {
    setReqs(val);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("Reqs: ", reqs);

  return (
    <div className="relative h-screen">
      <div className="basis-1/3">
        <div className="relative col-span-5 xl:col-span-3">
          <div className=" flex flex-col rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="text-center text-xl font-medium text-dark dark:text-white">
                Fill the search form
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 p-5">
              <div className="flex w-[100%] flex-row justify-around">
                <CustomCheckbox
                  label={"Venture Capital"}
                  isChecked={searchType == "Venture Capital"}
                  setSearchType={handleSetSearchType}
                />
                <CustomCheckbox
                  label={"Researchers"}
                  isChecked={searchType == "Researchers"}
                  setSearchType={handleSetSearchType}
                />
                <CustomCheckbox
                  label={"Businesses"}
                  isChecked={searchType == "Businesses"}
                  setSearchType={handleSetSearchType}
                />
              </div>
              <CustomTextArea
                key_={""}
                val={reqs}
                valSetter={handleSaveReqs}
                label={"Requirements"}
                placeholder="Write down your requirements accoring to project, business or whatever you are looking for. Greater details can give you better results."
              />
              <button
                onClick={handleSearchResults}
                className="h-[40px] w-[100%] rounded-md bg-primary text-xl font-bold text-white "
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          fullScreen
          aria-labelledby="dialog-title"
          maxWidth="lg"
          sx={{
            "& .MuiDialog-paper": {
              width: "90%",
              height: "90%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle id="dialog-title">
            Search Results
            <Divider sx={{ marginTop: 2 }} />
          </DialogTitle>

          <DialogContent sx={{ flexGrow: 1, overflowY: "auto" }}>
            {isLoading ? (
              <CustomLoader />
            ) : (
              <div className="flex flex-row  flex-wrap  ">
                {test_data.map((ele, index) => {
                  return <ProjectPanel key={index} project={ele} />;
                })}
              </div>
            )}
          </DialogContent>

          <Divider sx={{ marginBottom: 1 }} />

          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              className=" text-primary"
            >
              <p className="text-primary">Close</p>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchForm;
