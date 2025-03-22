"use client";
import React from "react";

const Contact = () => {
  return (
    <section className="w-full  max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Contact Us</h2>
      <p className="text-center text-xl text-gray-600 mb-6">
        Have questions or want to practice your pronunciation? Send us a
        message!
      </p>
      {/* <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Your Message"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form> */}
    </section>

    // <div className="flex justify-center items-center m-20">
    //   <p className="text-xl">Contact us</p>
    // </div>
  );
};

export default Contact;
