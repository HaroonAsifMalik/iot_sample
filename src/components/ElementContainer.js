import Element from "./Element";

function ElementContainer({ notes, resetPosition }) {
  return (
    <div className="bg-yellow-300 h-screen w-80 overflow-y-auto flex-shrink-0">
      <h1 className="text-xl font-bold text-center p-4 border-b-2 border-yellow-400">
        IoT Elements
      </h1>
      <div className="p-3 space-y-2">
        {notes.map((note) => (
          <Element
            key={note.id}
            note={note}
            icon={note.icon}
            hoverText={note.hoverText}
            description={note.description}
            resetPosition={resetPosition}
          />
        ))}
      </div>
    </div>
  );
}
export default ElementContainer;
