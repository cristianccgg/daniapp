// src/components/StudentTable/EmojiItem.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

// Componente para un emoji individual arrastrable
export const DraggableEmoji = ({ emoji, id, isSelected, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`text-2xl cursor-grab active:cursor-grabbing bg-gray-50 p-1 rounded ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      {emoji}
    </button>
  );
};

// Componente para emojis en el área de participación del estudiante
export const ParticipacionEmoji = ({ emoji, id, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <span className="text-xl">{emoji}</span>
      <button
        onClick={onRemove} // Ahora pasamos el evento directamente
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={10} />
      </button>
    </div>
  );
};

export default {
  DraggableEmoji,
  ParticipacionEmoji,
};
