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
  const [updateCounter, setUpdateCounter] = useState(0); // Contador para forzar actualizaciones

  // Cargar datos personalizados al inicio
  useEffect(() => {
    const savedCustomEmojis = loadFromLocalStorage("customEmojis", {});
    setCustomEmojis(savedCustomEmojis);

    // Verificar que tenemos datos completos y válidos
    const savedEmojiGroups = loadFromLocalStorage("emojiGroups", []);

    let gruposValidos =
      savedEmojiGroups &&
      Array.isArray(savedEmojiGroups) &&
      savedEmojiGroups.length > 0;

    // Verificar que el grupo de Participación tenga 12 emojis
    if (gruposValidos) {
      const participacionGroup = savedEmojiGroups.find(
        (g) => g.title === "Participación"
      );
      if (
        !participacionGroup ||
        !participacionGroup.emojis ||
        participacionGroup.emojis.length < 12
      ) {
        console.warn(
          "Grupo de Participación incompleto, usando valores predeterminados"
        );
        gruposValidos = false;
      }
    }

    if (gruposValidos) {
      console.log("Usando grupos guardados:", savedEmojiGroups);
      setCustomEmojiGroups(savedEmojiGroups);
    } else {
      console.log("Usando grupos por defecto:", EMOJI_GROUPS);
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
    // Asegurar que usamos grupos válidos
    const groups =
      customEmojiGroups &&
      Array.isArray(customEmojiGroups) &&
      customEmojiGroups.length > 0
        ? customEmojiGroups
        : EMOJI_GROUPS;

    return groups.map((group) => ({
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
    console.log("Actualizando emojis personalizados");
    setCustomEmojis(newEmojis);
    setEmojiImages(newImages);

    if (newGroups && newGroups.length > 0) {
      // Verificar que el grupo de Participación está completo
      const participacionGroup = newGroups.find(
        (g) => g.title === "Participación"
      );
      if (!participacionGroup || participacionGroup.emojis.length < 12) {
        console.warn("Grupo de Participación incompleto en los grupos nuevos");
        // En caso de problemas, podemos mantener la estructura pero completarla
        const defaultParticipacionGroup = EMOJI_GROUPS.find(
          (g) => g.title === "Participación"
        );
        if (defaultParticipacionGroup && participacionGroup) {
          // Combinar manteniendo los emojis existentes y completando los que faltan
          participacionGroup.emojis = participacionGroup.emojis.concat(
            defaultParticipacionGroup.emojis.slice(
              participacionGroup.emojis.length
            )
          );
        }
      }

      setCustomEmojiGroups(newGroups);
    }

    // Incrementar el contador para forzar actualización de componentes
    setUpdateCounter((prev) => prev + 1);
  };

  const value = {
    customEmojis,
    emojiImages,
    getEmoji,
    getEmojiImage,
    renderEmoji,
    getEmojiGroups,
    updateCustomEmojis,
    updateCounter, // Exponer el contador a los componentes
  };

  return (
    <EmojisContext.Provider value={value}>{children}</EmojisContext.Provider>
  );
};

export default EmojisProvider;
