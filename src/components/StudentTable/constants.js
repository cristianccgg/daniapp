// src/components/StudentTable/constants.js

// Áreas predefinidas para los dropdowns
export const AREAS = [
  "Fluidez",
  "Comprensión",
  "Gramática",
  "Entonación",
  "Pronunciación",
  "Vocabulario",
];

// Emojis predefinidos
export const EMOJIS = {
  tiempo: "⏰",
  camara: "📷",
  // Emojis para el grupo Participación (12 en total)
  participa_excelente: "🔥",
  participa_bueno: "👏",
  participa_regular: "👍",
  participa_atencion: "👀",
  participa_mano: "✋",
  participa_aplauso: "🙌",
  participa_estrella: "⭐",
  participa_medalla: "🏅",
  participa_trofeo: "🏆",
  participa_cerebro: "🧠",
  participa_idea: "💡",
  participa_felicitacion: "🎉",
  // Otros emojis
  preguntas: "🐸",
  casi: "💖",
  energia: "⚡",
  estrellas: "🏆",
  mejorar: "👓",
  sobresaliente: "⭐",
  objetivo: "💙",
  excelente: "🔥",
  bienHecho: "👏",
};

// Grupos de emojis para la selección
export const EMOJI_GROUPS = [
  {
    title: "Entrada y Cámara",
    emojis: [
      { id: "tiempo", emoji: EMOJIS.tiempo, label: "Entró a tiempo" },
      {
        id: "camara",
        emoji: EMOJIS.camara,
        label: "Mantuvo la cámara encendida",
      },
    ],
  },
  {
    title: "Participación",
    emojis: [
      {
        id: "participa_excelente",
        emoji: EMOJIS.participa_excelente,
        label: "Participación excelente",
      },
      {
        id: "participa_bueno",
        emoji: EMOJIS.participa_bueno,
        label: "Buena participación",
      },
      {
        id: "participa_regular",
        emoji: EMOJIS.participa_regular,
        label: "Participación regular",
      },
      {
        id: "participa_atencion",
        emoji: EMOJIS.participa_atencion,
        label: "Prestó atención",
      },
      {
        id: "participa_mano",
        emoji: EMOJIS.participa_mano,
        label: "Levantó la mano",
      },
      {
        id: "participa_aplauso",
        emoji: EMOJIS.participa_aplauso,
        label: "Participación destacada",
      },
      {
        id: "participa_estrella",
        emoji: EMOJIS.participa_estrella,
        label: "Participación estelar",
      },
      {
        id: "participa_medalla",
        emoji: EMOJIS.participa_medalla,
        label: "Medalla de participación",
      },
      {
        id: "participa_trofeo",
        emoji: EMOJIS.participa_trofeo,
        label: "Trofeo de participación",
      },
      {
        id: "participa_cerebro",
        emoji: EMOJIS.participa_cerebro,
        label: "Participación inteligente",
      },
      {
        id: "participa_idea",
        emoji: EMOJIS.participa_idea,
        label: "Aportó ideas",
      },
      {
        id: "participa_felicitacion",
        emoji: EMOJIS.participa_felicitacion,
        label: "Felicitaciones",
      },
    ],
  },
  {
    title: "Preguntas y Participación",
    emojis: [
      {
        id: "preguntas",
        emoji: EMOJIS.preguntas,
        label: "Hizo preguntas a sus compañeros",
      },
    ],
  },
  {
    title: "Participación en Automatic Fluency",
    emojis: [
      { id: "casi", emoji: EMOJIS.casi, label: "Ya casi, sigue practicando" },
      {
        id: "energia",
        emoji: EMOJIS.energia,
        label: "Participación con energía",
      },
      {
        id: "estrellas",
        emoji: EMOJIS.estrellas,
        label: "Participación 5 estrellas",
      },
    ],
  },
  {
    title: "Participación evaluación viernes",
    emojis: [
      {
        id: "mejorar",
        emoji: EMOJIS.mejorar,
        label: "Necesita mejorar y practicar más",
      },
      {
        id: "sobresaliente",
        emoji: EMOJIS.sobresaliente,
        label: "Cumplió el objetivo de la semana de manera sobresaliente",
      },
      {
        id: "objetivo",
        emoji: EMOJIS.objetivo,
        label: "Cumplió con el objetivo de la semana",
      },
      {
        id: "excelente",
        emoji: EMOJIS.excelente,
        label: "Excelente participación",
      },
      {
        id: "bienHecho",
        emoji: EMOJIS.bienHecho,
        label: "Buen trabajo",
      },
    ],
  },
];
