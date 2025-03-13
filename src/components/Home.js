import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Notes</h1>
        <div className="bg-gray-50 p-4 rounded-lg">
          <Notes showAlert={showAlert}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
