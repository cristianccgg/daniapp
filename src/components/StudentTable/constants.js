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
  participacion1: "👕",
  participacion2: "👚",
  participacion3: "👔",
  preguntas: "🐸",
  casi: "💖",
  energia: "⚡",
  estrellas: "🏆",
  mejorar: "👓",
  sobresaliente: "⭐",
  objetivo: "💙",
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
        id: "participacion1",
        emoji: EMOJIS.participacion1,
        label: "Participación 1",
      },
      {
        id: "participacion2",
        emoji: EMOJIS.participacion2,
        label: "Participación 2",
      },
      {
        id: "participacion3",
        emoji: EMOJIS.participacion3,
        label: "Participación 3",
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
    ],
  },
];
