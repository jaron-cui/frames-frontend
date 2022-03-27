import React, {useRef, useState, useEffect} from "react";
import Animator from "./animator";

const Canvas = (props) => {
  const width = props.width;
  const height = props.height;
  const style = {border: "3px solid #000000"};
  const ref = useRef(null);
  const [animator, setAnimator] = useState(new Animator(width, height));
  
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')

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

  return <canvas ref={ref} id={props.name} width={width} height={height} style={style}></canvas>;
}

export default Canvas;