"use client";

import React, { useEffect, useState } from "react";
import ProjectPanel from "../ProjectPanel";
import { fetchWithInterceptors } from "@/utils/fetch/fetchInterceptor";
import { getIdToken } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import CustomLoader from "@/components/common/CustomLoader";

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
  {
    summary: "\n\n\n# PAPER 1:\n## TITLE:\nTabMixer: Noninvasive Estimation of the Mean Pulmonary Artery Pressure via Imaging and Tabular Data Mixing\n\n## ABSTRACT:\nRight Heart Catheterization is a gold standard procedure for diagnosing\nPulmonary Hypertension by measuring mean Pulmonary Artery Pressure (mPAP). It\nis invasive, costly, time-consuming and carries risks. In this paper, for the\nfirst time, we explore the estimation of mPAP from videos of noninvasive\nCardiac Magnetic Resonance Imaging. To enhance the predictive capabilities of\nDeep Learning models used for this task, we introduce an additional modality in\nthe form of demographic features and clinical measurements. Inspired by\nall-Multilayer Perceptron architectures, we present TabMixer, a novel module\nenabling the integration of imaging and tabular data through spatial, temporal\nand channel mixing. Specifically, we present the first approach that utilizes\nMultilayer Perceptrons to interchange tabular information with imaging features\nin vision models. We test TabMixer for mPAP estimation and show that it\nenhances the performance of Convolutional Neural Networks, 3D-MLP and Vision\nTransformers while being competitive with previous modules for imaging and\ntabular data. Our approach has the potential to improve clinical processes\ninvolving both modalities, particularly in noninvasive mPAP estimation, thus,\nsignificantly enhancing the quality of life for individuals affected by\nPulmonary Hypertension. We provide a source code for using TabMixer at\nhttps://github.com/SanoScience/TabMixer.\n\n## PUBLISHED DATE:\n2024-09-11\n\n\n# PAPER 2:\n## TITLE:\nLet Me DeCode You: Decoder Conditioning with Tabular Data\n\n## ABSTRACT:\nTraining deep neural networks for 3D segmentation tasks can be challenging,\noften requiring efficient and effective strategies to improve model\nperformance. In this study, we introduce a novel approach, DeCode, that\nutilizes label-derived features for model conditioning to support the decoder\nin the reconstruction process dynamically, aiming to enhance the efficiency of\nthe training process. DeCode focuses on improving 3D segmentation performance\nthrough the incorporation of conditioning embedding with learned numerical\nrepresentation of 3D-label shape features. Specifically, we develop an\napproach, where conditioning is applied during the training phase to guide the\nnetwork toward robust segmentation. When labels are not available during\ninference, our model infers the necessary conditioning embedding directly from\nthe input data, thanks to a feed-forward network learned during the training\nphase. This approach is tested using synthetic data and cone-beam computed\ntomography (CBCT) images of teeth. For CBCT, three datasets are used: one\npublicly available and two in-house. Our results show that DeCode significantly\noutperforms traditional, unconditioned models in terms of generalization to\nunseen data, achieving higher accuracy at a reduced computational cost. This\nwork represents the first of its kind to explore conditioning strategies in 3D\ndata segmentation, offering a novel and more efficient method for leveraging\nannotated data. Our code, pre-trained models are publicly available at\nhttps://github.com/SanoScience/DeCode .\n\n## PUBLISHED DATE:\n2024-07-12\n\n\n# PAPER 3:\n## TITLE:\nMISS: Multiclass Interpretable Scoring Systems\n\n## ABSTRACT:\nIn this work, we present a novel, machine-learning approach for constructing\nMulticlass Interpretable Scoring Systems (MISS) - a fully data-driven\nmethodology for generating single, sparse, and user-friendly scoring systems\nfor multiclass classification problems. Scoring systems are commonly utilized\nas decision support models in healthcare, criminal justice, and other domains\nwhere interpretability of predictions and ease of use are crucial. Prior\nmethods for data-driven scoring, such as SLIM (Supersparse Linear Integer\nModel), were limited to binary classification tasks and extensions to\nmulticlass domains were primarily accomplished via one-versus-all-type\ntechniques. The scores produced by our method can be easily transformed into\nclass probabilities via the softmax function. We demonstrate techniques for\ndimensionality reduction and heuristics that enhance the training efficiency\nand decrease the optimality gap, a measure that can certify the optimality of\nthe model. Our approach has been extensively evaluated on datasets from various\ndomains, and the results indicate that it is competitive with other machine\nlearning models in terms of classification performance metrics and provides\nwell-calibrated class probabilities.\n\n## PUBLISHED DATE:\n2024-01-10\n\n\n# PAPER 4:\n## TITLE:\nNoninvasive Estimation of Mean Pulmonary Artery Pressure Using MRI, Computer Models, and Machine Learning\n\n## ABSTRACT:\nPulmonary Hypertension (PH) is a severe disease characterized by an elevated\npulmonary artery pressure. The gold standard for PH diagnosis is measurement of\nmean Pulmonary Artery Pressure (mPAP) during an invasive Right Heart\nCatheterization. In this paper, we investigate noninvasive approach to PH\ndetection utilizing Magnetic Resonance Imaging, Computer Models and Machine\nLearning. We show using the ablation study, that physics-informed feature\nengineering based on models of blood circulation increases the performance of\nGradient Boosting Decision Trees-based algorithms for classification of PH and\nregression of values of mPAP. We compare results of regression (with\nthresholding of estimated mPAP) and classification and demonstrate that metrics\nachieved in both experiments are comparable. The predicted mPAP values are more\ninformative to the physicians than the probability of PH returned by\nclassification models. They provide the intuitive explanation of the outcome of\nthe machine learning model (clinicians are accustomed to the mPAP metric,\ncontrary to the PH probability).\n\n## PUBLISHED DATE:\n2023-12-21",
    name: "Arkadiusz Sitek",
    affiliation: "Warsaw University of Technology",
    email: "ArkadiuszSitek@pw.edu.pl",
    researchgate:"link do researchgate"
}
];

interface Project {
  name: string;
  description: string;
  industry: string;
  tags: string[];
  company: string;
}

const BussinessProjects = () => {
  const { user } = useAuth();

  // USE STATES --
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // -- FUNCTIONS --
  const handleGetBussinessProjects = async () => {
    setIsLoading(true);
    if (user) {
      const tokenId = await getIdToken(user);
      const user_data = await fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "user" + `?id=${user.uid}`,
        tokenId,
      );

      fetchWithInterceptors(
        process.env.NEXT_PUBLIC_URL + "fy_search",
        tokenId,
        "POST",
        { user_data: user_data, type: "ceo" },
      )
        .then((data: any) => {
          console.log(data);
          // setProjects(data);
          setIsLoading(false);
        })
        .catch((error: any) => console.error(error));
    }
  };

  // -- USE EFFECTS --
  useEffect(() => {
    handleGetBussinessProjects();
    // setProjects(test_data);
  }, []);

  return (
    <div className="flex flex-row  flex-wrap  ">
      {isLoading ? (
        <CustomLoader />
      ) : (
        projects &&
        projects.length > 0 &&
        projects.map((ele, index) => {
          return <ProjectPanel key={index} project={ele} />;
        })
      )}
    </div>
  );
};

export default BussinessProjects;
