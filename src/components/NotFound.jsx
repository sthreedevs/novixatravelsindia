import React from "react";
import FuzzyText from "./ui/FuzzyText";

const NotFound = () => {
  return <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
    <FuzzyText>404</FuzzyText>
    <FuzzyText>Not Found</FuzzyText>
  </div>;
};

export default NotFound;
