import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
// import { useDrag } from "react-dnd";

function Elements(props) {
  const { key, text } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: key,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
      }}
      className="bg-red-300 justify-center flex"
    >
      <h1>{text}</h1>
    </div>
  );
}

export default Elements;
