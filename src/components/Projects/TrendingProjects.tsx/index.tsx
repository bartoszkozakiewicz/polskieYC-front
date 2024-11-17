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
  },
];

interface Project {
  name: string;
  description: string;
  industry: string;
  tags: string[];
}

const TrendingProjects = () => {
  const { user } = useAuth();

  // USE STATES --
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // -- FUNCTIONS --
  const handleGetTrendingProjects = async () => {
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
        { user_data: user_data, type: "trending" },
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
    handleGetTrendingProjects();
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

export default TrendingProjects;
