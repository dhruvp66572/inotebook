import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Notess</h1>
        <p className="text-gray-600 mt-2">Manage your notes efficiently and securely</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Notes showAlert={showAlert}/>
      </div>
    </div>
  );
};

export default Home;
