// src/components/StudentTable/ParticipacionCell.jsx
import React from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ParticipacionEmoji } from "./EmojiItem";

const ParticipacionCell = ({
  studentId,
  participacion,
  onCellClick,
  removeParticipacionEmoji,
}) => {
  // Función para manejar la eliminación con prevención de propagación
  const handleRemoveEmoji = (e, emojiId) => {
    e.stopPropagation(); // Evita que el click llegue al contenedor padre
    removeParticipacionEmoji(studentId, emojiId);
  };

  return (
    <div
      className="min-h-14 flex flex-wrap gap-2 p-2 border border-gray-200 rounded"
      onClick={() => onCellClick(studentId)}
      id={`student-${studentId}`}
    >
      {participacion.length > 0 ? (
        <SortableContext
          items={participacion.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          {participacion.map((participacionItem) => (
            <ParticipacionEmoji
              key={participacionItem.id}
              id={participacionItem.id}
              emoji={participacionItem.emoji}
              type={participacionItem.type}
              onRemove={(e) => handleRemoveEmoji(e, participacionItem.id)}
            />
          ))}
        </SortableContext>
      ) : (
        <span className="text-gray-400 text-sm">Arrastra emojis aquí</span>
      )}
    </div>
  );
};

export default ParticipacionCell;
