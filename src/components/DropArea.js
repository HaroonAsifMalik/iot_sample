import { useDroppable } from "@dnd-kit/core";
function DropArea() {
  const { isOver } = useDroppable({ id: "drop-area" });

  return (
    <div
      className={`bg-red-300 h-screen ${isOver ? "border-4 border-blue-500" : ""}`}
    >
      <h1>This is Right side</h1>
    </div>
  );
}

export default DropArea;
