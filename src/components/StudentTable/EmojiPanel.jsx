// src/components/StudentTable/EmojiPanel.jsx
import React from "react";
import { RefreshCw } from "lucide-react";
import { EMOJI_GROUPS } from "./constants";
import { DraggableEmoji } from "./EmojiItem";

const EmojiPanel = ({
  participacionEmojis,
  currentParticipacionEmoji,
  handleCycleParticipacion,
  selectedEmoji,
  handleEmojiSelect,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-bold mb-4 text-center">Emojis Disponibles</h3>

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

      <div className="space-y-4">
        {EMOJI_GROUPS.map((group) => (
          <div key={group.title} className="bg-white p-2 rounded shadow">
            <h4 className="font-semibold text-sm mb-2">{group.title}</h4>
            <div className="flex flex-wrap gap-2">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiPanel;
