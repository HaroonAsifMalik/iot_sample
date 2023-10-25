// import Draggable from "./Draggable";

function Elements(props) {
  const { id, text } = props;

  return (
    <div className="bg-red-300 justify-center flex rounded-md">
      <h1>
        {text}
        {id}
      </h1>
    </div>
  );
}

export default Elements;
