// src/components/Settings/EmojiSettings.jsx
import React, { useState, useEffect } from "react";
import { X, Save, Plus, Settings, Image } from "lucide-react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../StudentTable/utils";

const EMOJI_PICKER_OPTIONS = [
  "👍",
  "👎",
  "👏",
  "🙌",
  "👋",
  "👀",
  "🔥",
  "💯",
  "✅",
  "❌",
  "⭐",
  "💫",
  "🌟",
  "💥",
  "📌",
  "📝",
  "📚",
  "📖",
  "📓",
  "📔",
  "✏️",
  "📋",
  "📊",
  "📈",
  "📉",
  "🎯",
  "🧩",
  "🎮",
  "🎨",
  "🎭",
  "🎤",
  "🎧",
  "📱",
  "💻",
  "⏰",
  "📷",
  "🧠",
  "❤️",
  "👕",
  "👚",
  "👔",
  "🐸",
  "💖",
  "⚡",
  "🏆",
  "👓",
  "💙",
  "😊",
  "😎",
  "🤔",
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
];

const EmojiSettings = ({ isOpen, onClose, onSave }) => {
  const [customEmojis, setCustomEmojis] = useState({});
  const [emojiGroups, setEmojiGroups] = useState([]);
  const [editingEmojiId, setEditingEmojiId] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [imageURLs, setImageURLs] = useState({});
  const [selectedTab, setSelectedTab] = useState("emojis"); // "emojis" o "images"
  const [loaded, setLoaded] = useState(false);

  // Función para cargar los datos iniciales
  const loadInitialData = async () => {
    // Cargar emojis personalizados si existen
    const savedEmojis = loadFromLocalStorage("customEmojis", {});
    setCustomEmojis(savedEmojis);

    try {
      // Cargar grupos de emojis
      const savedEmojiGroups = loadFromLocalStorage("emojiGroups", []);
      if (savedEmojiGroups.length > 0) {
        console.log("Usando grupos guardados:", savedEmojiGroups);
        setEmojiGroups(savedEmojiGroups);
      } else {
        // Cargar los grupos por defecto desde constants.js
        const constants = await import("../StudentTable/constants");
        console.log("Usando grupos por defecto:", constants.EMOJI_GROUPS);
        setEmojiGroups(constants.EMOJI_GROUPS);
      }
    } catch (error) {
      console.error("Error al cargar grupos de emojis:", error);
      // Intentar cargar al menos un array vacío como fallback
      setEmojiGroups([]);
    }

    // Cargar URLs de imágenes si existen
    const savedImageURLs = loadFromLocalStorage("customEmojiImages", {});
    setImageURLs(savedImageURLs);

    setLoaded(true);
  };

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const handleEmojiChange = (emojiId, newEmoji) => {
    setCustomEmojis({
      ...customEmojis,
      [emojiId]: newEmoji,
    });
    setEditingEmojiId(null);
  };

  const handleSaveChanges = () => {
    // Guardar emojis personalizados
    saveToLocalStorage("customEmojis", customEmojis);

    // Guardar URLs de imágenes
    saveToLocalStorage("customEmojiImages", imageURLs);

    // Guardar grupos actualizados si se han modificado
    saveToLocalStorage("emojiGroups", emojiGroups);

    // Notificar al componente padre
    onSave({ customEmojis, imageURLs, emojiGroups });
    onClose();
  };

  const handleAddImageURL = (emojiId, url) => {
    if (url && url.trim() !== "") {
      setImageURLs({
        ...imageURLs,
        [emojiId]: url.trim(),
      });
    }
  };

  const getDisplayEmoji = (emojiItem) => {
    // Si hay una imagen personalizada, mostrar ícono de imagen
    if (imageURLs[emojiItem.id]) {
      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image size={16} className="absolute opacity-50" />
          <span className="text-xl relative z-10">
            {customEmojis[emojiItem.id] || emojiItem.emoji}
          </span>
        </div>
      );
    }
    // Si hay un emoji personalizado, mostrarlo
    if (customEmojis[emojiItem.id]) {
      return customEmojis[emojiItem.id];
    }
    // De lo contrario, mostrar el emoji original
    return emojiItem.emoji;
  };

  if (!isOpen || !loaded) return null;

  // Encontrar el grupo de participación (debe ser el primero)
  const participacionGroup = emojiGroups.find(
    (g) => g.title === "Participación"
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <Settings className="mr-2" /> Configuración de Emojis
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ${
                selectedTab === "emojis"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("emojis")}
            >
              Emojis
            </button>
            <button
              className={`px-4 py-2 ${
                selectedTab === "images"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("images")}
            >
              Imágenes
            </button>
          </div>
        </div>

        {selectedTab === "emojis" && (
          <>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Emojis disponibles</h3>
              <div className="grid grid-cols-10 gap-2 bg-gray-100 p-3 rounded">
                {EMOJI_PICKER_OPTIONS.map((emoji, index) => (
                  <button
                    key={index}
                    className={`text-2xl p-2 rounded hover:bg-blue-100 ${
                      selectedEmoji === emoji ? "bg-blue-200" : "bg-white"
                    }`}
                    onClick={() => setSelectedEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Mostrar primero el grupo de participación destacado */}
            {participacionGroup && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-blue-600">
                  Emojis de Participación
                </h3>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {participacionGroup.emojis.map((emojiItem, emojiIndex) => (
                      <div
                        key={emojiIndex}
                        className="flex items-center space-x-3 p-2 bg-white rounded"
                      >
                        <div className="text-2xl min-w-[40px] text-center">
                          {editingEmojiId === emojiItem.id ? (
                            <div className="flex space-x-1">
                              <button
                                onClick={() =>
                                  handleEmojiChange(emojiItem.id, selectedEmoji)
                                }
                                className="text-green-500 hover:text-green-700 p-1"
                                disabled={!selectedEmoji}
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={() => setEditingEmojiId(null)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingEmojiId(emojiItem.id)}
                              className="hover:bg-gray-100 p-1 rounded"
                            >
                              {getDisplayEmoji(emojiItem)}
                            </button>
                          )}
                        </div>
                        <span className="flex-grow">{emojiItem.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Otros grupos de emojis */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Otros Grupos de Emojis</h3>
              {emojiGroups
                .filter((group) => group.title !== "Participación")
                .map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="mb-4 bg-gray-50 p-3 rounded border"
                  >
                    <h4 className="font-medium mb-2">{group.title}</h4>
                    <div className="space-y-2">
                      {group.emojis.map((emojiItem, emojiIndex) => (
                        <div
                          key={emojiIndex}
                          className="flex items-center space-x-3 p-2 bg-white rounded"
                        >
                          <div className="text-2xl min-w-[40px] text-center">
                            {editingEmojiId === emojiItem.id ? (
                              <div className="flex space-x-1">
                                <button
                                  onClick={() =>
                                    handleEmojiChange(
                                      emojiItem.id,
                                      selectedEmoji
                                    )
                                  }
                                  className="text-green-500 hover:text-green-700 p-1"
                                  disabled={!selectedEmoji}
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={() => setEditingEmojiId(null)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditingEmojiId(emojiItem.id)}
                                className="hover:bg-gray-100 p-1 rounded"
                              >
                                {getDisplayEmoji(emojiItem)}
                              </button>
                            )}
                          </div>
                          <span className="flex-grow">{emojiItem.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {selectedTab === "images" && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Imágenes personalizadas</h3>
            <p className="text-sm text-gray-500 mb-4">
              Introduce URLs de imágenes para reemplazar emojis. Las imágenes
              deben ser cuadradas y preferiblemente de 64x64 píxeles.
            </p>

            {/* Grupo de participación primero */}
            {participacionGroup && (
              <div className="mb-4 bg-blue-50 p-3 rounded border border-blue-200">
                <h4 className="font-medium mb-2 text-blue-600">
                  {participacionGroup.title}
                </h4>
                <div className="space-y-2">
                  {participacionGroup.emojis.map((emojiItem, emojiIndex) => (
                    <div
                      key={emojiIndex}
                      className="flex items-center space-x-3 p-2 bg-white rounded"
                    >
                      <div className="text-2xl min-w-[40px] text-center">
                        {getDisplayEmoji(emojiItem)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="URL de imagen (https://...)"
                            value={imageURLs[emojiItem.id] || ""}
                            onChange={(e) =>
                              handleAddImageURL(emojiItem.id, e.target.value)
                            }
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                          />
                          {imageURLs[emojiItem.id] && (
                            <button
                              onClick={() => {
                                const newImageURLs = { ...imageURLs };
                                delete newImageURLs[emojiItem.id];
                                setImageURLs(newImageURLs);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {emojiItem.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Otros grupos */}
            {emojiGroups
              .filter((group) => group.title !== "Participación")
              .map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="mb-4 bg-gray-50 p-3 rounded border"
                >
                  <h4 className="font-medium mb-2">{group.title}</h4>
                  <div className="space-y-2">
                    {group.emojis.map((emojiItem, emojiIndex) => (
                      <div
                        key={emojiIndex}
                        className="flex items-center space-x-3 p-2 bg-white rounded"
                      >
                        <div className="text-2xl min-w-[40px] text-center">
                          {getDisplayEmoji(emojiItem)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="URL de imagen (https://...)"
                              value={imageURLs[emojiItem.id] || ""}
                              onChange={(e) =>
                                handleAddImageURL(emojiItem.id, e.target.value)
                              }
                              className="w-full p-1 text-sm border border-gray-300 rounded"
                            />
                            {imageURLs[emojiItem.id] && (
                              <button
                                onClick={() => {
                                  const newImageURLs = { ...imageURLs };
                                  delete newImageURLs[emojiItem.id];
                                  setImageURLs(newImageURLs);
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {emojiItem.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmojiSettings;
