import React, {useRef, useState, useEffect} from "react";
import Chess from "../game/chess";

type CanvasProps = {
  name: string,
  width: number,
  height: number
}

const Canvas = (props: CanvasProps) => {
  const width: number = props.width;
  const height: number = props.height;
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

  const onMouseMove = event => {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const realW = rect.right - rect.left;
    const relY = event.clientY - rect.top;
    const realH = rect.bottom - rect.top;
    const pos = {x: relX / realW * width, y: relY / realH * height};
    animator['mousePosition'] = pos;
  }

  return <canvas 
    ref={ref}
    id={props.name}
    width={width}
    height={height}
    style={{
      border: "3px solid #000000",
      userSelect: 'none'
    }}
    unselectable='off'
    onMouseMove={onMouseMove}
    onMouseDown={() => animator['mouseDown'] = true}
    onMouseUp={event => {
      animator['mouseDown'] = false;
      event.preventDefault();
    }}
    onClick={() => animator.onLeftClick()}
    onContextMenu={event => {
      event.preventDefault();
      animator.onRightClick();
    }}></canvas>;
}

export default Canvas;