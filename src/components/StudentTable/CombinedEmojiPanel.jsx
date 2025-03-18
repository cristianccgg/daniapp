// src/components/StudentTable/CombinedEmojiPanel.jsx
import React from "react";
import { DraggableEmoji } from "./EmojiItem";
import { useEmojis } from "./EmojisProvider";

const CombinedEmojiPanel = ({ selectedEmoji, handleEmojiSelect }) => {
  const { getEmojiGroups } = useEmojis();
  const emojiGroups = getEmojiGroups();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-bold mb-4 text-center">Emojis y Significado</h3>

      {/* Grupos de emojis con significado y función de arrastre */}
      <div className="space-y-4">
        {emojiGroups.map((group) => (
          <div key={group.title} className="bg-white p-2 rounded shadow">
            <h4 className="font-semibold text-sm mb-2">{group.title}</h4>

            {/* Renderizado especial para el grupo Participación (solo emojis) */}
            {group.title === "Participación" ? (
              <div className="grid grid-cols-4 gap-2 p-1">
                {group.emojis.map((emojiItem) => (
                  <DraggableEmoji
                    key={emojiItem.id}
                    id={`emoji-${emojiItem.id}`}
                    emoji={emojiItem.emoji}
                    isSelected={selectedEmoji?.id === emojiItem.id}
                    onClick={() =>
                      handleEmojiSelect({
                        id: emojiItem.id,
                        emoji: emojiItem.emoji,
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              // Renderizado normal para otros grupos (emoji + etiqueta)
              group.emojis.map((emojiItem) => (
                <div
                  key={emojiItem.id}
                  className="flex items-center space-x-2 mb-2 p-1 hover:bg-gray-50 rounded"
                >
                  <DraggableEmoji
                    id={`emoji-${emojiItem.id}`}
                    emoji={emojiItem.emoji}
                    isSelected={selectedEmoji?.id === emojiItem.id}
                    onClick={() =>
                      handleEmojiSelect({
                        id: emojiItem.id,
                        emoji: emojiItem.emoji,
                      })
                    }
                  />
                  <span className="text-sm flex-1">{emojiItem.label}</span>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombinedEmojiPanel;
