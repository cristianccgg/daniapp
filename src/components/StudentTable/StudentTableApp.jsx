// src/components/StudentTable/StudentTableApp.jsx
import React, { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Edit, Save, X, Settings } from "lucide-react";

// Componentes
import StudentTableHeader from "./StudentTableHeader";
import StudentRow from "./StudentRow";
import CombinedEmojiPanel from "./CombinedEmojiPanel";
import ActionButtons from "./ActionButtons";
import EmojiSettings from "../Settings/EmojiSettings";

// Utilidades y constantes
import { EMOJIS, EMOJI_GROUPS } from "./constants";
import {
  createNewStudent,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils";
import { useEmojis } from "./EmojisProvider";

const StudentTableApp = ({ classId, onReturnToDashboard }) => {
  // Contexto de emojis
  const { getEmojiGroups, updateCustomEmojis } = useEmojis();

  // Estado para la ventana de configuración de emojis
  const [showEmojiSettings, setShowEmojiSettings] = useState(false);

  // Estado de la clase actual (valores por defecto)
  const defaultClassInfo = {
    id: classId,
    nivel: 6,
    semana: 3,
    dia: 3,
    tema: "Presente Simple",
    name: "Nueva Clase",
  };

  // Estado para los estudiantes (valor por defecto)
  const defaultStudents = [];

  // Estado para controlar el modo de edición de la información de clase
  const [editingClassInfo, setEditingClassInfo] = useState(false);
  const [editingTema, setEditingTema] = useState(false);

  // Inicializar estados con datos del localStorage o valores por defecto
  const [classInfo, setClassInfo] = useState(() => {
    return loadFromLocalStorage(`class-${classId}-info`, defaultClassInfo);
  });

  // Estado temporal para editar la información de la clase
  const [tempClassInfo, setTempClassInfo] = useState(classInfo);

  const [students, setStudents] = useState(() => {
    const savedStudents = loadFromLocalStorage(
      `class-${classId}-students`,
      null
    );
    return savedStudents !== null ? savedStudents : defaultStudents;
  });

  // Estado para los emojis disponibles
  const [availableEmojis, setAvailableEmojis] = useState([]);

  // Estado para controlar qué emoji se está mostrando en participación
  const [currentParticipacionEmoji, setCurrentParticipacionEmoji] = useState(0);
  const participacionEmojis = [
    EMOJIS.participacion1,
    EMOJIS.participacion2,
    EMOJIS.participacion3,
  ];

  // Estado para controlar el emoji seleccionado actualmente
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Configurar los sensores para el drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Inicializar emojis disponibles
  useEffect(() => {
    // Inicializar emojis disponibles desde los grupos
    const emojiGroups = getEmojiGroups();
    const allEmojis = emojiGroups.flatMap((group) =>
      group.emojis.map((item) => ({
        id: item.id,
        emoji: item.emoji,
        label: item.label,
      }))
    );

    setAvailableEmojis(allEmojis);

    // Inicializar el estado temporal con los valores actuales
    setTempClassInfo(classInfo);
  }, [classInfo, getEmojiGroups]);

  // Guardar en localStorage cuando cambian los datos
  useEffect(() => {
    saveToLocalStorage(`class-${classId}-students`, students);

    // Actualizar también el registro de clases para mostrar la última modificación
    const classRegistry = loadFromLocalStorage("classRegistry", []);
    const updatedRegistry = classRegistry.map((c) =>
      c.id === classId ? { ...c, lastModified: new Date().toISOString() } : c
    );
    saveToLocalStorage("classRegistry", updatedRegistry);
  }, [students, classId]);

  useEffect(() => {
    saveToLocalStorage(`class-${classId}-info`, classInfo);
  }, [classInfo, classId]);

  // Manejar el cambio en la participación cíclica
  const handleCycleParticipacion = () => {
    setCurrentParticipacionEmoji(
      (currentParticipacionEmoji + 1) % participacionEmojis.length
    );
  };

  // Agregar un nuevo estudiante
  const addNewStudent = () => {
    setStudents([...students, createNewStudent()]);
  };

  // Eliminar el último estudiante
  const removeLastStudent = () => {
    if (students.length > 0) {
      const newStudents = [...students];
      newStudents.pop();
      setStudents(newStudents);
    }
  };

  // Limpiar todos los datos excepto nombres
  const clearAllExceptNames = () => {
    const clearedStudents = students.map((student) => ({
      ...student,
      tiempo: false,
      camara: false,
      participacion: [],
      mejoresAreas: [],
      areasAMejorar: [],
      temasAnteriores: "",
    }));

    setStudents(clearedStudents);
  };

  // Limpiar completamente (eliminar todos los estudiantes)
  const clearAll = () => {
    setStudents([]);
    saveToLocalStorage(`class-${classId}-students`, []);
  };

  // Manejar cambios en los inputs
  const handleInputChange = (id, field, value) => {
    if (
      (field === "mejoresAreas" || field === "areasAMejorar") &&
      !Array.isArray(value)
    ) {
      value = [value]; // Convertir a array si no lo es
    }

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  // Manejar la selección de un emoji
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  // Agregar emoji a la participación de un estudiante
  const addEmojiToStudent = (studentId) => {
    if (selectedEmoji) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? {
                ...student,
                participacion: [
                  ...student.participacion,
                  {
                    id: `participacion-${Date.now()}`, // ID único para cada emoji de participación
                    emoji: selectedEmoji.emoji,
                    type: selectedEmoji.id,
                  },
                ],
              }
            : student
        )
      );
    }
  };

  // Manejar fin del arrastre
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id.startsWith("emoji-") && over.id.startsWith("student-")) {
      // Arrastre de emoji al área de participación de estudiante
      const studentId = over.id.replace("student-", "");
      const emojiTypeId = active.id.replace("emoji-", "");
      const emojiInfo = availableEmojis.find((e) => e.id === emojiTypeId);

      if (emojiInfo) {
        // Usar el tipo de emoji para guardar la referencia, no solo el emoji visual
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId
              ? {
                  ...student,
                  participacion: [
                    ...student.participacion,
                    {
                      id: `participacion-${Date.now()}`, // ID único para cada emoji de participación
                      emoji: emojiInfo.emoji,
                      type: emojiTypeId, // Guardar el tipo de emoji para referencia posterior
                    },
                  ],
                }
              : student
          )
        );
      }
    } else if (
      active.id.startsWith("participacion-") &&
      over.id.startsWith("participacion-") &&
      active.id !== over.id // Asegurarnos que no es el mismo emoji
    ) {
      // Reorganizar emojis dentro del área de participación de un mismo estudiante

      // Encontrar a qué estudiante pertenecen estos emojis
      let targetStudent = null;
      let targetStudentId = null;

      for (const student of students) {
        if (
          student.participacion.some(
            (p) => p.id === active.id || p.id === over.id
          )
        ) {
          targetStudent = student;
          targetStudentId = student.id;
          break;
        }
      }

      if (targetStudent) {
        const oldIndex = targetStudent.participacion.findIndex(
          (p) => p.id === active.id
        );
        const newIndex = targetStudent.participacion.findIndex(
          (p) => p.id === over.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          setStudents((prevStudents) =>
            prevStudents.map((s) =>
              s.id === targetStudentId
                ? {
                    ...s,
                    participacion: arrayMove(
                      s.participacion,
                      oldIndex,
                      newIndex
                    ),
                  }
                : s
            )
          );
        }
      }
    }
  };

  // Eliminar un emoji de participación
  const removeParticipacionEmoji = (studentId, emojiId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              participacion: student.participacion.filter(
                (p) => p.id !== emojiId
              ),
            }
          : student
      )
    );
  };

  // Manejar cambios en la información de la clase temporal
  const handleTempClassInfoChange = (field, value) => {
    setTempClassInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Guardar los cambios en la información de la clase
  const saveClassInfo = () => {
    setClassInfo(tempClassInfo);
    setEditingClassInfo(false);
  };

  // Cancelar la edición y restaurar valores originales
  const cancelClassInfoEdit = () => {
    setTempClassInfo(classInfo);
    setEditingClassInfo(false);
  };

  // Manejar cambios en el tema
  const handleTemaChange = (e) => {
    setTempClassInfo((prev) => ({
      ...prev,
      tema: e.target.value,
    }));
  };

  // Guardar los cambios en el tema
  const saveTema = () => {
    setClassInfo((prev) => ({
      ...prev,
      tema: tempClassInfo.tema,
    }));
    setEditingTema(false);
  };

  // Manejar guardado de configuración de emojis
  const handleSaveEmojiSettings = ({
    customEmojis,
    imageURLs,
    emojiGroups,
  }) => {
    updateCustomEmojis(customEmojis, imageURLs, emojiGroups);

    // Refrescar emojis disponibles
    const updatedGroups = getEmojiGroups();
    const updatedEmojis = updatedGroups.flatMap((group) =>
      group.emojis.map((item) => ({
        id: item.id,
        emoji: item.emoji,
        label: item.label,
      }))
    );

    setAvailableEmojis(updatedEmojis);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Encabezado y botones de Dashboard y Configuración*/}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onReturnToDashboard}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
          >
            Ir al Dashboard
          </button>
          <h1 className="text-3xl font-bold text-center">{classInfo.name}</h1>
          <button
            onClick={() => setShowEmojiSettings(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors flex items-center"
          >
            <Settings size={18} className="mr-2" />
            Configurar Emojis
          </button>
        </div>

        {/* Información de la clase */}
        <div className="w-full flex gap-4 pb-4">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Información de nivel, semana y día */}
              <div className="space-y-1 text-gray-700">
                {!editingClassInfo ? (
                  <>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">NIVEL {classInfo.nivel}</p>
                        <p className="font-bold">SEMANA {classInfo.semana}</p>
                        <p className="font-bold">DÍA {classInfo.dia}</p>
                      </div>
                      <button
                        onClick={() => setEditingClassInfo(true)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Editar información</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={saveClassInfo}
                          className="text-green-500 hover:text-green-700"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={cancelClassInfoEdit}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-600">
                          Nivel
                        </label>
                        <input
                          type="number"
                          value={tempClassInfo.nivel}
                          onChange={(e) =>
                            handleTempClassInfoChange(
                              "nivel",
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full p-1 border border-gray-300 rounded text-sm"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">
                          Semana
                        </label>
                        <input
                          type="number"
                          value={tempClassInfo.semana}
                          onChange={(e) =>
                            handleTempClassInfoChange(
                              "semana",
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full p-1 border border-gray-300 rounded text-sm"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">
                          Día
                        </label>
                        <input
                          type="number"
                          value={tempClassInfo.dia}
                          onChange={(e) =>
                            handleTempClassInfoChange(
                              "dia",
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full p-1 border border-gray-300 rounded text-sm"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Wall of Fame y tema de la semana */}
              <div className="text-center">
                <h2 className="font-bold text-lg mb-2">WALL OF FAME</h2>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-3xl">⭐</span>
                  <p className="font-bold">TEMA Y PREGUNTA DE LA SEMANA</p>
                  <span className="text-3xl">⭐</span>
                </div>

                {!editingTema ? (
                  <div className="mt-2 flex justify-center items-center">
                    <p className="mr-2">{classInfo.tema}</p>
                    <button
                      onClick={() => setEditingTema(true)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-center">
                    <input
                      type="text"
                      value={tempClassInfo.tema}
                      onChange={handleTemaChange}
                      className="p-1 border border-gray-300 rounded text-center max-w-xs"
                    />
                    <button
                      onClick={saveTema}
                      className="ml-1 text-green-500 hover:text-green-700"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setTempClassInfo((prev) => ({
                          ...prev,
                          tema: classInfo.tema,
                        }));
                        setEditingTema(false);
                      }}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="tabla-container mt-4 w-full">
              <div className="overflow-x-auto">
                <table className="border-collapse w-full min-h-52">
                  <StudentTableHeader />
                  <tbody>
                    {students.length > 0 ? (
                      students.map((student) => (
                        <StudentRow
                          key={student.id}
                          student={student}
                          handleInputChange={handleInputChange}
                          addEmojiToStudent={addEmojiToStudent}
                          removeParticipacionEmoji={removeParticipacionEmoji}
                        />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center p-4 text-gray-500"
                        >
                          No hay estudiantes. Haz clic en "Agregar Estudiante"
                          para comenzar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Tabla y emojis con DndContext */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <div className="max-w-fit w-70 grid grid-cols-1 gap-6">
              {/* Panel combinado de emojis y significado */}
              <div className="md:col-span-1">
                <CombinedEmojiPanel
                  participacionEmojis={participacionEmojis}
                  currentParticipacionEmoji={currentParticipacionEmoji}
                  handleCycleParticipacion={handleCycleParticipacion}
                  selectedEmoji={selectedEmoji}
                  handleEmojiSelect={handleEmojiSelect}
                />
              </div>
            </div>
          </DndContext>
        </div>

        {/* Botones de acción */}
        <ActionButtons
          addNewStudent={addNewStudent}
          removeLastStudent={removeLastStudent}
          clearAllExceptNames={clearAllExceptNames}
          clearAll={clearAll}
        />
      </div>

      {/* Modal de configuración de emojis */}
      <EmojiSettings
        isOpen={showEmojiSettings}
        onClose={() => setShowEmojiSettings(false)}
        onSave={handleSaveEmojiSettings}
      />
    </div>
  );
};

export default StudentTableApp;
