"use client";
// pages/welcome.tsx
import React from "react";
interface WelcomeProps {
  params: {
    name: string;
  };
}
const Welcome: React.FC<WelcomeProps> = (props) => {
  const decodedName = decodeURIComponent(props.params.name);

  return (
    <div className="flex justify-center mt-6">
      <h1>Welcome, {decodedName}!</h1>
      {/* <h1>Welcome,name</h1> */}

      {/* Add content for the welcome page */}
    </div>
  );
};

export default Welcome;
