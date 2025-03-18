import React, { useState } from "react";
import StudentTableApp from "./components/StudentTable/StudentTableApp";
import Dashboard from "./components/Dashboard/Dashboard";
import EmojisProvider from "./components/StudentTable/EmojisProvider";

function App() {
  // Estado para controlar la vista actual (dashboard o clase específica)
  const [activeView, setActiveView] = useState("dashboard");
  // Estado para almacenar el ID de la clase actualmente seleccionada
  const [selectedClassId, setSelectedClassId] = useState(null);

  // Manejador para seleccionar una clase
  const handleClassSelect = (classId) => {
    setSelectedClassId(classId);
    setActiveView("class");
  };

  // Manejador para volver al dashboard
  const handleReturnToDashboard = () => {
    setActiveView("dashboard");
  };

  return (
    <EmojisProvider>
      <div className="app">
        {activeView === "dashboard" ? (
          <Dashboard onClassSelect={handleClassSelect} />
        ) : (
          <StudentTableApp
            classId={selectedClassId}
            onReturnToDashboard={handleReturnToDashboard}
          />
        )}
      </div>
    </EmojisProvider>
  );
}

export default App;
