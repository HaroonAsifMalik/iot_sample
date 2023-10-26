import Element from "./Element";
function ElementContainer(props) {
  const { notes } = props;
  return (
    <div className="bg-yellow-300 h-screen col-span-2">
      <h1 className="justify-center text-xl flex p-3 m-3">
        The Elements Container Box
      </h1>

      <div className="grid  grid-cols-2 p-3">
        {notes.map((note) => (
          <Element key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
export default ElementContainer;
