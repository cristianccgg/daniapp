// src/components/StudentTable/StudentRow.jsx
import React from "react";
import ParticipacionCell from "./ParticipacionCell";
import DropdownSelect from "./DropdownSelect";
import EmojiCheckbox from "./EmojiCheckbox";
import { AREAS, EMOJIS } from "./constants";

const StudentRow = ({
  student,
  handleInputChange,
  addEmojiToStudent,
  removeParticipacionEmoji,
}) => {
  return (
    <tr>
      {/* Nombre del estudiante */}
      <td className="border border-gray-300 p-2">
        <input
          type="text"
          value={student.nombre}
          onChange={(e) =>
            handleInputChange(student.id, "nombre", e.target.value)
          }
          className="w-full p-1 border border-gray-200 rounded"
        />
      </td>

      {/* Checkbox tiempo con emoji */}
      <td className="border border-gray-300 p-2 text-center">
        <EmojiCheckbox
          checked={student.tiempo}
          onChange={(e) =>
            handleInputChange(student.id, "tiempo", e.target.checked)
          }
          emoji={EMOJIS.tiempo}
        />
      </td>

      {/* Checkbox cámara con emoji */}
      <td className="border border-gray-300 p-2 text-center">
        <EmojiCheckbox
          checked={student.camara}
          onChange={(e) =>
            handleInputChange(student.id, "camara", e.target.checked)
          }
          emoji={EMOJIS.camara}
        />
      </td>

      {/* Participación (celda para arrastrar emojis) */}
      <td className="border border-gray-300 p-2">
        <ParticipacionCell
          studentId={student.id}
          participacion={student.participacion}
          onCellClick={addEmojiToStudent}
          removeParticipacionEmoji={removeParticipacionEmoji}
        />
      </td>

      {/* Mejores áreas (dropdown mejorado) */}
      <td className="border border-gray-300 p-2">
        <DropdownSelect
          options={AREAS}
          selected={student.mejoresAreas}
          onChange={(value) =>
            handleInputChange(student.id, "mejoresAreas", value)
          }
          placeholder="Seleccionar mejores áreas..."
        />
      </td>

      {/* Áreas a mejorar (dropdown mejorado) */}
      <td className="border border-gray-300 p-2">
        <DropdownSelect
          options={AREAS}
          selected={student.areasAMejorar}
          onChange={(value) =>
            handleInputChange(student.id, "areasAMejorar", value)
          }
          placeholder="Seleccionar áreas a mejorar..."
        />
      </td>

      {/* Temas anteriores a practicar (área de texto) */}
      <td className="border border-gray-300 p-2">
        <textarea
          value={student.temasAnteriores}
          onChange={(e) =>
            handleInputChange(student.id, "temasAnteriores", e.target.value)
          }
          className="w-full p-1 border border-gray-200 rounded"
          rows="2"
        />
      </td>
    </tr>
  );
};

export default StudentRow;
