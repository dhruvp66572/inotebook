import React from 'react';
// You'll need to install these if not already installed:
// npm install react-icons

import { FiEdit, FiLock, FiSmartphone, FiTag, FiSearch } from 'react-icons/fi';

function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-lg text-white transform transition duration-500 hover:shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About iNotebook</h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto">Your secure digital notebook for capturing ideas anytime, anywhere.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4 border-blue-500">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">What is iNotebook?</h3>
          <p className="text-gray-700 leading-relaxed">
            iNotebook is a secure cloud-based notebook application that allows you to create, edit, 
            and manage your notes from anywhere. Your notes are private and secure, accessible only by you,
            with state-of-the-art encryption to protect your valuable information.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4 border-indigo-500">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Features</h3>
          <ul className="space-y-3">
            <li className="flex items-center pb-3 border-b border-gray-100">
              <span className="text-blue-500 mr-3"><FiEdit size={20} /></span>
              <span className="text-gray-700">Create and manage notes</span>
            </li>
            <li className="flex items-center py-3 border-b border-gray-100">
              <span className="text-blue-500 mr-3"><FiLock size={20} /></span>
              <span className="text-gray-700">Secure cloud storage</span>
            </li>
            <li className="flex items-center py-3 border-b border-gray-100">
              <span className="text-blue-500 mr-3"><FiSmartphone size={20} /></span>
              <span className="text-gray-700">Access from any device</span>
            </li>
            <li className="flex items-center py-3 border-b border-gray-100">
              <span className="text-blue-500 mr-3"><FiTag size={20} /></span>
              <span className="text-gray-700">Tag and categorize notes</span>
            </li>
            <li className="flex items-center pt-3">
              <span className="text-blue-500 mr-3"><FiSearch size={20} /></span>
              <span className="text-gray-700">Advanced search functionality</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-8 mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">How to Use</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          To get started with iNotebook, simply sign up for an account. Once logged in, you can 
          create new notes, edit existing ones, and organize them according to your needs.
          Our user-friendly interface makes note management simple and efficient.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Ready to organize your thoughts?</h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join thousands of users who trust iNotebook for their note-taking needs.
          Start your journey to better organization today.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
            Sign Up
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
