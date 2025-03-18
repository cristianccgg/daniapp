// src/components/StudentTable/utils.js

// Crear un nuevo estudiante con valores predeterminados
export const createNewStudent = () => ({
  id: Date.now().toString(),
  nombre: "NUEVO ESTUDIANTE",
  tiempo: false,
  camara: false,
  participacion: [],
  mejoresAreas: [],
  areasAMejorar: [],
  temasAnteriores: "",
});

// Cargar datos desde localStorage con mejor manejo de errores
export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const savedData = localStorage.getItem(key);

    // Verificar si hay datos guardados
    if (savedData === null || savedData === undefined) {
      return defaultValue;
    }

    // Intentar parsear los datos
    try {
      const parsedData = JSON.parse(savedData);

      // Verificar que los datos no están vacíos (para arrays)
      if (Array.isArray(parsedData) && parsedData.length === 0) {
        console.info(`Datos vacíos en "${key}", usando valor predeterminado`);
        return defaultValue;
      }

      return parsedData;
    } catch (parseError) {
      console.error(`Error al parsear datos de "${key}":`, parseError);
      return defaultValue;
    }
  } catch (error) {
    console.error(
      `Error al cargar datos de "${key}" desde localStorage:`,
      error
    );
    return defaultValue;
  }
};

// Guardar datos en localStorage con mejor manejo de errores
export const saveToLocalStorage = (key, data) => {
  if (data === null || data === undefined) {
    console.warn(`Intentando guardar datos nulos o indefinidos para "${key}"`);
    return;
  }

  // Para arrays, verificar que no estén vacíos
  if (Array.isArray(data) && data.length === 0) {
    console.warn(`Intentando guardar un array vacío para "${key}"`);
    return;
  }

  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    console.info(`Datos guardados correctamente en "${key}"`);
  } catch (error) {
    console.error(`Error al guardar datos de "${key}" en localStorage:`, error);
  }
};
