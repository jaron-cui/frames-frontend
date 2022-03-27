import React, {useRef, useState, useEffect} from "react";
import Animator from "./animator";

const Canvas = (props) => {
  const width = props.width;
  const height = props.height;
  const style = {border: "3px solid #000000"};
  const ref = useRef(null);
  const canvas = <canvas ref={ref} id={props.name} width={width} height={height} style={style}></canvas>;
  const [animator, setAnimator] = useState(new Animator(width, height));
  
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    //Our first draw
    //context.fillStyle = '#000000'
    //context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    let animationFrameId;
    const render = () => {
      animator.draw(context)
      animator.tick();
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // {id: 0, type: line | rect | img, [start/end | texture + coordinate]: ...}
  const objects = [];
  // 0: [{prop, initval, endval, t, duration, easing}]
  const animations = {}

  return canvas;
}

export default Canvas;