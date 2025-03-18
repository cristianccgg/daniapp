// src/components/StudentTable/CombinedEmojiPanel.jsx
import React from "react";
import { RefreshCw } from "lucide-react";
import { DraggableEmoji } from "./EmojiItem";
import { useEmojis } from "./EmojisProvider";

const CombinedEmojiPanel = ({
  participacionEmojis,
  currentParticipacionEmoji,
  handleCycleParticipacion,
  selectedEmoji,
  handleEmojiSelect,
}) => {
  const { getEmojiGroups, getEmojiImage } = useEmojis();
  const emojiGroups = getEmojiGroups();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-bold mb-4 text-center">Emojis y Significado</h3>

      {/* Selector de emoji de participación */}
      <div className="mb-4">
        <button
          onClick={handleCycleParticipacion}
          className="flex items-center justify-center w-full p-2 bg-indigo-500 text-white rounded mb-2 hover:bg-indigo-600 transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Cambiar emoji participación
        </button>
        <div className="text-center p-2 bg-white rounded-lg shadow mb-4">
          <span className="text-3xl">
            {participacionEmojis[currentParticipacionEmoji]}
          </span>
        </div>
      </div>

      {/* Grupos de emojis con significado y función de arrastre */}
      <div className="space-y-4">
        {emojiGroups.map((group) => (
          <div key={group.title} className="bg-white p-2 rounded shadow">
            <h4 className="font-semibold text-sm mb-2">{group.title}</h4>
            {group.emojis.map((emojiItem) => (
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombinedEmojiPanel;
