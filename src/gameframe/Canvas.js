import React, {useRef, useState, useEffect} from "react";
import Coinflip from "../game/coinflip";
import Chess from "../game/chess";
import Game from "./game";

const Canvas = (props) => {
  const width = props.width;
  const height = props.height;
  const style = {border: "3px solid #000000"};
  const ref = useRef(null);
  const [animator, setAnimator] = useState(new Chess(width, height));
  
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    let animationFrameId;
    const render = () => {
      animator.draw(context);
      animator.tick();
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, []);

  const setProp = (property, value) => () => {
    animator[property] = value;
  }

  const onMouseMove = event => {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const realW = rect.right - rect.left;
    const relY = event.clientY - rect.top;
    const realH = rect.bottom - rect.top;
    const pos = {x: relX / realW * width, y: relY / realH * height};
    animator.mousePos = pos;
  }

  return <canvas 
    ref={ref}
    id={props.name}
    width={width}
    height={height}
    style={style}
    onMouseMove={onMouseMove}
    onMouseDown={setProp("mouseDown", true)}
    onMouseUp={setProp("mouseDown", false)}
    onClick={() => animator.onLeftClick()}
    onContextMenu={event => {
      event.preventDefault();
      animator.onRightClick();
    }}></canvas>;
}

export default Canvas;