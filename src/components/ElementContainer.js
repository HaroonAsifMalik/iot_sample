import Draggable from "./Draggable";
import Elements from "./Elements";
import { DndContext } from "@dnd-kit/core";

function ElementContainer(props) {
  return (
    <div className="bg-yellow-300 h-screen ">
      <h2 className="justify-center flex">The Elements Container Box</h2>
      <div className="grid gap-4 grid-cols-3 p-3">
        {props.testData.map((element) => (
          <Draggable key={element.id} id={element.id}>
            <Elements text={element.text} />
          </Draggable>
        ))}
      </div>
    </div>
  );
}
export default ElementContainer;
