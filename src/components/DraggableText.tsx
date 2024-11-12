import { useRef } from 'react';
import Draggable from 'react-draggable';
import type { MemeText } from '../types/meme';

interface DraggableTextProps {
  text: MemeText;
  bounds: string;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export default function DraggableText({ text, bounds, onPositionChange }: DraggableTextProps) {
  const nodeRef = useRef(null);

  const getTextStyle = () => {
    const { fontSize, color, outline, shadow, bold } = text.style;
    
    let textShadow = 'none';
    if (outline) {
      // Create a stronger outline effect with multiple shadows
      textShadow = `
        -1px -1px 0 #000,  
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000,
        -2px -2px 0 #000,
         2px -2px 0 #000,
        -2px  2px 0 #000,
         2px  2px 0 #000
      `;
    } else if (shadow) {
      textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    }

    return {
      fontSize: `${fontSize}px`,
      color,
      fontWeight: bold ? 'bold' : 'normal',
      textShadow,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      padding: '8px',
      cursor: 'move',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      touchAction: 'none',
      zIndex: 1000,
    } as const;
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={bounds}
      position={text.position}
      onDrag={(e, data) => onPositionChange({ x: data.x, y: data.y })}
      defaultPosition={{ x: 200, y: 100 }}
      grid={[1, 1]}
      scale={1}
    >
      <div 
        ref={nodeRef} 
        style={getTextStyle()}
        className="draggable-text"
      >
        {text.text || 'Enter text'}
      </div>
    </Draggable>
  );
}