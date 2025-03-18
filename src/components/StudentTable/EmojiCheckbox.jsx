// src/components/StudentTable/EmojiCheckbox.jsx
import React from "react";

const EmojiCheckbox = ({ checked, onChange, emoji }) => {
  return (
    <div className="flex justify-center items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white peer-checked:bg-indigo-50 transition-colors">
          {checked ? (
            <span className="text-lg">{emoji}</span>
          ) : (
            <div className="w-4 h-4 border border-gray-400 rounded"></div>
          )}
        </div>
      </label>
    </div>
  );
};

export default EmojiCheckbox;
