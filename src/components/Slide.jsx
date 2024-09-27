import { useRef, useEffect, useState } from 'react';

function Slide() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 5; // Brush radius
    ctx.lineCap = 'round'; // Stroke end form
    ctx.strokeStyle = 'black'; // Stroke color

    setContext(ctx);
  }, []);

  const startDrawing = (event) => {
    if (context) {
      context.beginPath();
      context.moveTo(
        event.clientX - canvasRef.current.offsetLeft,
        event.clientY - canvasRef.current.offsetTop
      );
      setIsDrawing(true);
    }
  };

  const draw = (event) => {
    if (!isDrawing || !context) return;

    context.lineTo(
      event.clientX - canvasRef.current.offsetLeft,
      event.clientY - canvasRef.current.offsetTop
    );
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && context) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      style={{ border: '1px solid black' }}
    />
  );
}

export default Slide;
