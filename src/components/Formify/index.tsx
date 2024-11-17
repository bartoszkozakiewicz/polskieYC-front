"use client";

import React, { useEffect } from "react";
import StickyButton from "./StickyButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Autofill from "./Autofill";
import Generate from "./Generate";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useSnackbar } from "notistack";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";

const stepsAutofill = ["Generate Document", "Verify and save document"];
const stepsGenerate = [
  "AutoFill Document",
  "Verify Scheme",
  "Verify and save document",
];

enum ConversionType {
  AUTOFILL = "AutoFill Document",
  GENERATE = "Generate Document",
}

const Formify = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const [conversionType, setConversionType] = React.useState<
    ConversionType | ""
  >(ConversionType.GENERATE);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [steps, setSteps] = React.useState<string[]>(stepsGenerate);

  const [btnText, setBtnText] = React.useState<string>("Generate");

  // --- USER INPUTS
  const [mp3File, setMp3File] = React.useState<File | null>(null);
  const [docxTemplate, setDocxTemplate] = React.useState<File | null>(null);
  const [formatPrompt, setFormatPrompt] = React.useState<string>("");

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleClickStickyButton = async () => {
    if (user) {
      if (activeStep === 0) {
        // 1. Check if there are word docs etc.
        if (conversionType === ConversionType.GENERATE) {
          if (mp3File === null) {
            enqueueSnackbar("Please upload a file", { variant: "error" });
            return;
          }
        } else {
          if (mp3File === null || docxTemplate === null) {
            enqueueSnackbar("Please upload both files", { variant: "error" });
            return;
          }
        }

        const id = await getIdToken(user);
        // To musi być skądś pobrane - jakoś deterministycznie ta operacja
        const operationCost: number = 1;

        fetchWithInterceptors(
          process.env.NEXT_PUBLIC_URL + "document" + `?id=${user.uid}`,
          id,
          "POST",
          { credentials: operationCost, type: conversionType },
        )
          .then((data: any) => {
            console.log("What a success ;oo");
            console.log(data);
            setActiveStep((prev: number) => prev + 1);
          })
          .catch(async (error: any) => {
            enqueueSnackbar(`${error?.message}`, { variant: "error" });
          });

        // While doing all of this, some loading progress should be shown
      }
    } else {
      enqueueSnackbar("Something went wrong, please refresh page.", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (activeStep === 0) {
      setBtnText("Generate");
    } else if (activeStep === 1) {
      setBtnText("Save");
    } else {
      setBtnText("Create Ad");
    }
  }, [activeStep]);

  useEffect(() => {
    setMp3File(null);
    setDocxTemplate(null);
    setFormatPrompt("");
    setActiveStep(0);
    setSteps(
      conversionType === ConversionType.GENERATE
        ? stepsGenerate
        : stepsAutofill,
    );
  }, [conversionType]);

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb
        pageName="Convert speech into usable form"
        link="Formify"
        conversionType={conversionType}
        setConversionType={setConversionType}
      />
      <div>
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step color="#5750F1" key={label} completed={completed[index]}>
                  <StepButton
                    disabled
                    color="primary"
                    onClick={handleStep(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </div>

          {conversionType === ConversionType.GENERATE ? (
            <Generate
              setMp3File={setMp3File}
              setFormatPrompt={setFormatPrompt}
              activeStep={activeStep}
            />
          ) : (
            <Autofill
              setDocxTemplate={setDocxTemplate}
              setMp3File={setMp3File}
              activeStep={activeStep}
            />
          )}
        </div>
        <StickyButton text={btnText} handleClick={handleClickStickyButton} />
      </div>
    </div>
  );
};

export default Formify;
