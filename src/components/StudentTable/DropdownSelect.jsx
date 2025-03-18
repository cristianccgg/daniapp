// src/components/StudentTable/DropdownSelect.jsx
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Plus } from "lucide-react";

const DropdownSelect = ({
  options,
  selected,
  onChange,
  placeholder = "Seleccionar...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown si se hace click afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejar selección de una opción
  const handleSelect = (option) => {
    if (!selected.includes(option)) {
      onChange([...selected, option]);
    }
    setIsOpen(false);
  };

  // Manejar eliminación de una opción
  const handleRemove = (option, event) => {
    event.stopPropagation(); // Evitar que se abra el dropdown
    onChange(selected.filter((item) => item !== option));
  };

  // Filtrar opciones que ya están seleccionadas
  const availableOptions = options.filter(
    (option) => !selected.includes(option)
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Área para mostrar las selecciones actuales */}
      <div
        className="border border-gray-300 z-20 rounded p-1 min-h-10 flex flex-wrap gap-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          selected.map((item) => (
            <div
              key={item}
              className="bg-blue-100 text-blue-800 text-sm rounded px-2 py-1 flex items-center"
            >
              <span>{item}</span>
              <button
                onClick={(e) => handleRemove(item, e)}
                className="ml-1 text-blue-800 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}
        <div className="ml-auto flex items-center">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Menú dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
          {availableOptions.length > 0 ? (
            availableOptions.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSelect(option)}
              >
                <Plus size={14} className="mr-1 text-green-500" />
                <span>{option}</span>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No hay más opciones disponibles
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
