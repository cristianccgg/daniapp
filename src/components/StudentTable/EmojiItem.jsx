// src/components/StudentTable/EmojiItem.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Image } from "lucide-react";
import { useEmojis } from "./EmojisProvider";

// Componente para un emoji individual arrastrable
export const DraggableEmoji = ({ emoji, id, isSelected, onClick }) => {
  const { getEmojiImage } = useEmojis();
  const emojiId = id.replace("emoji-", "");
  const imageUrl = getEmojiImage(emojiId);

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
      {imageUrl ? (
        <img src={imageUrl} alt={emojiId} className="w-8 h-8 object-contain" />
      ) : (
        <span>{emoji}</span>
      )}
    </button>
  );
};

// Componente para emojis en el área de participación del estudiante
export const ParticipacionEmoji = ({ emoji, id, onRemove, type }) => {
  const { getEmojiImage } = useEmojis();
  const imageUrl = type ? getEmojiImage(type) : null;

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
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={type || "emoji"}
          className="w-10 h-10 object-contain" // Aumentado de w-6 h-6 a w-10 h-10
        />
      ) : (
        <span className="text-3xl">{emoji}</span> // Aumentado de text-xl a text-3xl
      )}
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default {
  DraggableEmoji,
  ParticipacionEmoji,
};
