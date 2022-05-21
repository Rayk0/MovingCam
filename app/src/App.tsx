import { memoryUsage } from "process";
import React, { useEffect, useRef, useState } from "react";
import { updateJsxSpreadAttribute, updateSourceFile } from "typescript";
import "./App.css";

function App() {
  const containerRef: any = useRef();
  const innerRef: any = useRef();
  const [counter, setCounter] = useState(0);
  const [updateRate, setUpdaterate] = useState(10);
  const [mouseValue, setMousevalue] = useState({ x: 0, y: 0 });
  const [mouseDefault, setMousedefault] = useState({ _x: 0, _y: 0 });

  const setOrigin = (e: any) => {
    let mouseDef: any = { _x: mouseDefault._x, _y: mouseDefault._y };
    mouseDef._x = e.current.offsetLeft + Math.floor(e.current.offsetWidth / 2);
    mouseDef._y = e.current.offsetTop + Math.floor(e.current.offsetHeight / 2);
    setMousedefault(mouseDef);
  };

  const updatePosition = (event: any) => {
    var e = event || window.event;
    let mouseVal: any = { x: mouseValue.x, y: mouseValue.y };
    mouseVal.x = e.clientX - mouseDefault._x;
    mouseVal.y = (e.clientY - mouseDefault._y) * -1;
    setMousevalue(mouseVal);
  };

  const updateTransformStyle = (x: string, y: string) => {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    innerRef.current.style.transform = style;
    innerRef.current.style.webkitTransform = style;
    innerRef.current.style.mozTransform = style;
    innerRef.current.style.msTransform = style;
    innerRef.current.style.oTransform = style;
  };

  const update = (event: any) => {
    updatePosition(event);
    updateTransformStyle(
      (mouseValue.y / innerRef.current.offsetHeight / 2).toFixed(2),
      (mouseValue.x / innerRef.current.offsetWidth / 2).toFixed(2)
    );
  };

  const isTimeToUpdate = () => {
    setCounter(counter + 1);
    return counter % updateRate === 0;
  };
  const MouseEnter = (event: any) => {
    update(event);
  };

  const MouseLeave = () => {
    innerRef.current.style = "";
  };

  const MouseMove = (event: any) => {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  useEffect(() => {
    setOrigin(containerRef);
    console.log("je passe ici");
  }, []);

  return (
    <div className="App">
      <div
        id="container"
        onMouseEnter={(e) => MouseEnter(e)}
        onMouseMove={(e) => MouseMove(e)}
        onMouseLeave={MouseLeave}
        className="container"
        ref={containerRef}
      >
        <div id="inner" className="inner" ref={innerRef}></div>
      </div>
    </div>
  );
}

export default App;
