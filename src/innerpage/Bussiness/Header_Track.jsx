import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header_Track = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const steps = [
    { title: "Personal information", path: "/business/personal-info" },
    { title: "Link Account", path: "/business/link-account" },
    { title: "Address", path: "/business-add-address" },
    { title: "Add Bank", path: "/add-card" },
    { title: "Service", path: "/business-add-services" },
    { title: "Availability", path: "/business-add-availability" },
  ];

  const [visitedSteps, setVisitedSteps] = useState(() => {
    const storedSteps = localStorage.getItem("visitedSteps");
    return storedSteps ? JSON.parse(storedSteps) : [];
  });

  useEffect(() => {
    if (!visitedSteps.includes(pathname)) {
      const updatedSteps = [...visitedSteps, pathname];
      setVisitedSteps(updatedSteps);
      localStorage.setItem("visitedSteps", JSON.stringify(updatedSteps));
    }
  }, [pathname, visitedSteps]);

  const isStepActiveOrVisited = (stepPath) => {
    return pathname === stepPath || visitedSteps.includes(stepPath);
  };

  return (
    <>
      <div className="steps flex justify-center items-center gap-x-5">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="itm flex flex-col gap-2 items-center font-semibold">
              <div
                className={`icn_itm size-10 rounded-full ${
                  isStepActiveOrVisited(step.path)
                    ? "bg-main_blue text-white"
                    : "bg-[#F1F1F1]"
                } flex justify-center items-center text-gray-400 font-semibold`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm ${
                  isStepActiveOrVisited(step.path)
                    ? "text-main_blue"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-28 border-t-2 rounded-xl border-dark_link"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Header_Track;
