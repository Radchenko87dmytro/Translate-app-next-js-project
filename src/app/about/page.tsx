import React from "react";

const About = () => {
  return (
    <section className="w-full  max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <div className="flex-col justify-center items-center m-4">
        <h2 className="text-2xl font-semibold text-center mb-4">About</h2>
        <p className="text-center text-xl">
          Application for recording voice and comparison with true
          pronunciation.
        </p>
      </div>
    </section>
  );
};

export default About;
