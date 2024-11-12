import { RefObject } from 'react';
import DraggableText from './DraggableText';
import type { Meme, MemeText } from '../types/meme';

interface MemePreviewProps {
  memeRef: RefObject<HTMLDivElement>;
  selectedMeme: Meme | null;
  texts: MemeText[];
  onTextPositionChange: (id: string, position: { x: number; y: number }) => void;
}

export default function MemePreview({
  memeRef,
  selectedMeme,
  texts,
  onTextPositionChange,
}: MemePreviewProps) {
  if (!selectedMeme) return null;

  return (
    <div 
      className="relative border rounded-lg overflow-hidden w-full max-w-full mx-auto"
      ref={memeRef}
      style={{ touchAction: 'none' }}
    >
      <img
        src={selectedMeme.url}
        alt={selectedMeme.name}
        className="w-full h-auto select-none max-w-full"
        draggable={false}
      />
      <div className="absolute inset-0">
        {texts.map((text) => (
          <DraggableText
            key={text.id}
            text={text}
            bounds="parent"
            onPositionChange={(position) => onTextPositionChange(text.id, position)}
          />
        ))}
      </div>
    </div>
  );
}