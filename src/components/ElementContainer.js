import Elements from "./Elements";

function ElementContainer(props) {
  console.log(props);
  return (
    <div className="bg-slate-100 h-screen  ">
      <h2 className="justify-center flex ">The Elements Container Box</h2>
      <div className="grid gap-4 grid-cols-3 p-1">
        {props.testData.map((element) => (
          <Elements key={element.id} text={element.text} />
        ))}
      </div>
    </div>
  );
}

export default ElementContainer;
