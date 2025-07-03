import React, { useState } from "react";

function DraftToggleSwitch({ isDraft, setIsDraft }) {
  return (
    <div className="flex px-14 gap-3">
      <span className="text-sm font-medium text-gray-700">Draft</span>
      <button
        type="button"
        onClick={() => setIsDraft((prev) => !prev)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
          isDraft ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            isDraft ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
      <span className="text-sm text-gray-500">{isDraft ? "ON" : "OFF"}</span>
    </div>
  );
}
export default DraftToggleSwitch;
