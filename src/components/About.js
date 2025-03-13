import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">About iNotebook</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">What is iNotebook?</h3>
          <p className="text-gray-600">
            iNotebook is a secure cloud-based notebook application that allows you to create, edit, 
            and manage your notes from anywhere. Your notes are private and secure, accessible only by you.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Features</h3>
          <ul className="space-y-2">
            <li className="pb-2 border-b border-gray-100">Create and manage notes</li>
            <li className="py-2 border-b border-gray-100">Secure cloud storage</li>
            <li className="py-2 border-b border-gray-100">Access from any device</li>
            <li className="py-2 border-b border-gray-100">Tag and categorize notes</li>
            <li className="py-2">Search functionality</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5 mt-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">How to Use</h3>
        <p className="text-gray-600">
          To get started with iNotebook, simply sign up for an account. Once logged in, you can 
          create new notes, edit existing ones, and organize them according to your needs.
          Our user-friendly interface makes note management simple and efficient.
        </p>
      </div>     
    </div>
  );
}

export default About;
