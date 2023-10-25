// import Draggable from "./Draggable";

function Elements(props) {
  const { id, text } = props;

  return (
    <div className="bg-red-100 justify-center flex mb-5 rounded-md">
      <h1>
        {text}
        {id}
      </h1>
    </div>
  );
}

export default Elements;
