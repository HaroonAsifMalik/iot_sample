import Draggable from "./Draggable";
import Elements from "./Elements";
import { DndContext } from "@dnd-kit/core";

function ElementContainer(props) {
  return (
    <div className="bg-slate-100 h-screen">
      <h2 className="justify-center flex">The Elements Container Box</h2>
      <div className="grid gap-4 grid-cols-3 p-1">
        {props.testData.map((element) => (
          <DndContext>
            <Draggable>
              <Elements key={element.id} text={element.text} />
            </Draggable>
          </DndContext>
        ))}
      </div>
    </div>
  );
}
export default ElementContainer;
