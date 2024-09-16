import Element from "./Element";

function ElementContainer({ notes, resetPosition }) {
  return (
    <div className="bg-yellow-300 h-screen col-span-2">
      <h1 className="justify-center text-xl flex p-3 m-3">
        The Elements Container Box
      </h1>
      <div className="grid grid-cols-2 p-3">
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
