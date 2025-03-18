// src/components/StudentTable/StudentTableHeader.jsx
import React from "react";
import { Clock, Camera } from "lucide-react";

const StudentTableHeader = () => {
  return (
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2">NOMBRE</th>
        <th className="border border-gray-300 p-2 text-center w-10">
          <Clock size={18} className="mx-auto" />
        </th>
        <th className="border border-gray-300 p-2 text-center w-10">
          <Camera size={18} className="mx-auto" />
        </th>
        <th className="border border-gray-300 p-2">PARTICIPACIÓN</th>
        <th className="border border-gray-300 p-2">MEJORES ÁREAS</th>
        <th className="border border-gray-300 p-2">ÁREAS A MEJORAR</th>
        <th className="border border-gray-300 p-2">
          TEMAS ANTERIORES A PRACTICAR
        </th>
      </tr>
    </thead>
  );
};

export default StudentTableHeader;
