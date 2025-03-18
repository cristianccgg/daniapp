// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../StudentTable/utils";

const Dashboard = ({ onClassSelect, onNewClass }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Cargar clases al iniciar
  useEffect(() => {
    const savedClasses = loadFromLocalStorage("classRegistry", []);
    setClasses(savedClasses);
  }, []);

  // Crear una nueva clase
  const handleCreateClass = () => {
    if (newClassName.trim() === "") return;

    const newClass = {
      id: Date.now().toString(),
      name: newClassName,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    const updatedClasses = [...classes, newClass];
    setClasses(updatedClasses);
    saveToLocalStorage("classRegistry", updatedClasses);

    // Crear una nueva clase vacía y seleccionarla
    saveToLocalStorage(`class-${newClass.id}-info`, {
      id: newClass.id,
      nivel: 6,
      semana: 1,
      dia: 1,
      tema: "Tema de la clase",
      name: newClass.name,
    });

    saveToLocalStorage(`class-${newClass.id}-students`, []);

    setNewClassName("");
    setIsCreating(false);

    // Navegar a la nueva clase
    onClassSelect(newClass.id);
  };

  // Eliminar una clase
  const handleDeleteClass = (id, e) => {
    e.stopPropagation();
    if (window.confirm("¿Estás seguro de que deseas eliminar esta clase?")) {
      const updatedClasses = classes.filter((c) => c.id !== id);
      setClasses(updatedClasses);
      saveToLocalStorage("classRegistry", updatedClasses);

      // Eliminar datos asociados
      localStorage.removeItem(`class-${id}-info`);
      localStorage.removeItem(`class-${id}-students`);
    }
  };

  // Abrir una clase existente
  const handleClassClick = (id) => {
    onClassSelect(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard de Clases</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Nueva Clase
          </button>
        </div>

        {isCreating && (
          <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h2 className="text-xl font-semibold mb-3">Crear Nueva Clase</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Nombre de la clase"
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleCreateClass}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Crear
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewClassName("");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <div
                key={classItem.id}
                onClick={() => handleClassClick(classItem.id)}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{classItem.name}</h3>
                  <button
                    onClick={(e) => handleDeleteClass(classItem.id, e)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <p>
                    Creada: {new Date(classItem.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Última modificación:{" "}
                    {new Date(classItem.lastModified).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-8 text-gray-500">
              No hay clases creadas. ¡Crea tu primera clase!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
