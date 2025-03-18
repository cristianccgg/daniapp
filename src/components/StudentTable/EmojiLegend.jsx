// src/components/StudentTable/EmojiLegend.jsx
import React, { useEffect, useState } from "react";
import { useEmojis } from "./EmojisProvider";

const EmojiLegend = () => {
  const { getEmojiGroups, updateCounter, renderEmoji } = useEmojis();
  const [groups, setGroups] = useState([]);

  // Actualizar los grupos cuando cambia el contexto
  useEffect(() => {
    const updatedGroups = getEmojiGroups();
    setGroups(updatedGroups);
  }, [getEmojiGroups, updateCounter]); // Usar updateCounter como dependencia

  // Separar el grupo de participación de los otros grupos
  const participacionGroup = groups.find(
    (group) => group.title === "Participación"
  );
  const otherGroups = groups.filter((group) => group.title !== "Participación");

  return (
    <div className="bg-white p-3 rounded-lg shadow mt-4 mb-6">
      <h3 className="font-bold mb-2 text-center text-sm">
        Significado de Emojis
      </h3>

      {/* Grupo de participación - solo emojis sin etiquetas */}
      {participacionGroup && (
        <div className="mb-2">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span className="text-xs font-medium">
              {participacionGroup.title}:
            </span>
            {participacionGroup.emojis.map((emojiItem) => (
              <span key={emojiItem.id} className="text-xl">
                {renderEmoji(emojiItem.id, "text-xl")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Otros grupos - manteniendo la estructura de grupos pero en formato compacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {otherGroups.map((group) => (
          <div key={group.title} className="border-t pt-1">
            <div className="font-medium mb-1">{group.title}:</div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {group.emojis.map((emojiItem) => (
                <div key={emojiItem.id} className="flex items-center space-x-1">
                  <span className="text-lg">
                    {renderEmoji(emojiItem.id, "text-lg")}
                  </span>
                  <span className="truncate">{emojiItem.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiLegend;
