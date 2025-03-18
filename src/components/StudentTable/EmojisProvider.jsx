// src/components/StudentTable/EmojisProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { EMOJIS, EMOJI_GROUPS } from "./constants";
import { loadFromLocalStorage } from "./utils";

// Crear el contexto
const EmojisContext = createContext();

export const useEmojis = () => useContext(EmojisContext);

export const EmojisProvider = ({ children }) => {
  const [customEmojis, setCustomEmojis] = useState({});
  const [customEmojiGroups, setCustomEmojiGroups] = useState([]);
  const [emojiImages, setEmojiImages] = useState({});

  // Cargar datos personalizados al inicio
  useEffect(() => {
    const savedCustomEmojis = loadFromLocalStorage("customEmojis", {});
    setCustomEmojis(savedCustomEmojis);

    const savedEmojiGroups = loadFromLocalStorage("emojiGroups", []);
    if (savedEmojiGroups.length > 0) {
      setCustomEmojiGroups(savedEmojiGroups);
    } else {
      setCustomEmojiGroups(EMOJI_GROUPS);
    }

    const savedEmojiImages = loadFromLocalStorage("customEmojiImages", {});
    setEmojiImages(savedEmojiImages);
  }, []);

  // Función para obtener el emoji correcto (personalizado o por defecto)
  const getEmoji = (emojiId) => {
    return customEmojis[emojiId] || EMOJIS[emojiId] || "";
  };

  // Función para obtener la imagen personalizada si existe
  const getEmojiImage = (emojiId) => {
    return emojiImages[emojiId] || null;
  };

  // Función para renderizar el emoji o imagen según corresponda
  const renderEmoji = (emojiId, size = "text-xl") => {
    const imageUrl = getEmojiImage(emojiId);
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={emojiId}
          className={`inline-block ${
            size === "text-xl"
              ? "w-6 h-6"
              : size === "text-2xl"
              ? "w-8 h-8"
              : size === "text-3xl"
              ? "w-10 h-10"
              : "w-6 h-6"
          }`}
          style={{ objectFit: "contain" }}
        />
      );
    }
    return <span className={size}>{getEmoji(emojiId)}</span>;
  };

  // Obtener grupos de emojis actualizados con los personalizados
  const getEmojiGroups = () => {
    return customEmojiGroups.map((group) => ({
      ...group,
      emojis: group.emojis.map((emojiItem) => ({
        ...emojiItem,
        // Reemplazar emoji con versión personalizada si existe
        emoji: customEmojis[emojiItem.id] || emojiItem.emoji,
      })),
    }));
  };

  // Actualizar el contexto con nuevos emojis personalizados
  const updateCustomEmojis = (newEmojis, newImages, newGroups) => {
    setCustomEmojis(newEmojis);
    setEmojiImages(newImages);
    if (newGroups && newGroups.length > 0) {
      setCustomEmojiGroups(newGroups);
    }
  };

  const value = {
    customEmojis,
    emojiImages,
    getEmoji,
    getEmojiImage,
    renderEmoji,
    getEmojiGroups,
    updateCustomEmojis,
  };

  return (
    <EmojisContext.Provider value={value}>{children}</EmojisContext.Provider>
  );
};

export default EmojisProvider;
