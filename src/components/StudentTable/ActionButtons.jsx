// src/components/StudentTable/ActionButtons.jsx
import React from "react";
import { PlusCircle, Trash2, RefreshCw } from "lucide-react";

const ActionButtons = ({
  addNewStudent,
  removeLastStudent,
  clearAllExceptNames,
  clearAll,
}) => {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        onClick={addNewStudent}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        <PlusCircle size={18} className="mr-1" /> Agregar Estudiante
      </button>

      <button
        onClick={removeLastStudent}
        className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        <Trash2 size={18} className="mr-1" /> Eliminar Último
      </button>

      <button
        onClick={clearAllExceptNames}
        className="flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        <RefreshCw size={18} className="mr-1" /> Limpiar Todo Excepto Nombres
      </button>

      <button
        onClick={clearAll}
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        <Trash2 size={18} className="mr-1" /> Borrar Todo
      </button>
    </div>
  );
};

export default ActionButtons;
