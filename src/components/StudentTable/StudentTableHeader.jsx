// src/components/StudentTable/StudentTableHeader.jsx
import React, { useState, useEffect } from "react";
import { Edit, Save, X } from "lucide-react";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils";
import { EMOJIS } from "./constants";
import { useEmojis } from "./EmojisProvider";

const StudentTableHeader = ({ classId }) => {
  const { renderEmoji } = useEmojis();
  const [editingTemasHeader, setEditingTemasHeader] = useState(false);
  const [temasHeader, setTemasHeader] = useState(
    "TEMAS ANTERIORES A PRACTICAR"
  );
  const [tempTemasHeader, setTempTemasHeader] = useState("");

  // Cargar el título personalizado al inicializar
  useEffect(() => {
    const savedHeader = loadFromLocalStorage(
      `class-${classId}-temasHeader`,
      "TEMAS ANTERIORES A PRACTICAR"
    );
    setTemasHeader(savedHeader);
  }, [classId]);

  // Iniciar edición
  const startEditing = () => {
    setTempTemasHeader(temasHeader);
    setEditingTemasHeader(true);
  };

  // Guardar cambios
  const saveChanges = () => {
    setTemasHeader(tempTemasHeader);
    saveToLocalStorage(`class-${classId}-temasHeader`, tempTemasHeader);
    setEditingTemasHeader(false);
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingTemasHeader(false);
  };

  return (
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">NOMBRE</th>
        <th className="border border-gray-300 p-2 text-center w-10">
          {renderEmoji("tiempo", "text-2xl")}
        </th>
        <th className="border border-gray-300 p-2 text-center w-10">
          {renderEmoji("camara", "text-2xl")}
        </th>
        <th className="border border-gray-300 p-2">PARTICIPACIÓN</th>
        <th className="border border-gray-300 p-2">MEJORES ÁREAS</th>
        <th className="border border-gray-300 p-2">ÁREAS A MEJORAR</th>
        <th className="border border-gray-300 p-2">
          {!editingTemasHeader ? (
            <div className="flex items-center justify-between">
              <span>{temasHeader}</span>
              <button
                onClick={startEditing}
                className="text-blue-500 hover:text-blue-700 ml-2"
              >
                <Edit size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                type="text"
                value={tempTemasHeader}
                onChange={(e) => setTempTemasHeader(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={saveChanges}
                className="text-green-500 hover:text-green-700 ml-1"
              >
                <Save size={14} />
              </button>
              <button
                onClick={cancelEditing}
                className="text-red-500 hover:text-red-700 ml-1"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </th>
      </tr>
    </thead>
  );
};

export default StudentTableHeader;
