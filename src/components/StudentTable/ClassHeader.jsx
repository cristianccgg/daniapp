// src/components/StudentTable/ClassHeader.jsx
import React from "react";
import { EMOJI_GROUPS } from "./constants";

const ClassHeader = ({ classInfo }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Información de nivel, semana y día */}
      <div className="space-y-1 text-gray-700">
        <p className="font-bold">NIVEL {classInfo.nivel}</p>
        <p className="font-bold">SEMANA {classInfo.semana}</p>
        <p className="font-bold">DÍA {classInfo.dia}</p>
      </div>

      {/* Wall of Fame y tema de la semana */}
      <div className="text-center">
        <h2 className="font-bold text-lg mb-2">WALL OF FAME</h2>
        <div className="flex justify-center items-center space-x-2">
          <span className="text-3xl">⭐</span>
          <p className="font-bold">TEMA Y PREGUNTA DE LA SEMANA</p>
          <span className="text-3xl">⭐</span>
        </div>
        <p className="mt-2">{classInfo.tema}</p>
      </div>

      {/* Leyenda de significados de emojis */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold mb-2">Significado:</h3>
          <div className="space-y-1">
            {EMOJI_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="font-semibold text-sm mt-2">{group.title}:</h4>
                {group.emojis.map((emojiItem) => (
                  <div
                    key={emojiItem.id}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl">{emojiItem.emoji}</span>
                    <span className="text-sm">{emojiItem.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;
