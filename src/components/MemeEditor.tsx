import { FaTrash } from 'react-icons/fa';
import TextStyleControls from './TextStyleControls';
import type { MemeText } from '../types/meme';

interface MemeEditorProps {
  text: MemeText;
  onUpdate: (updates: Partial<MemeText>) => void;
  onRemove: () => void;
  index: number;
}

export default function MemeEditor({ text, onUpdate, onRemove, index }: MemeEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
          <input
            type="text"
            value={text.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Enter text"
            className="flex-1 text-sm p-1 border rounded"
          />
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1"
          title="Remove Text"
        >
          <FaTrash size={12} />
        </button>
      </div>
      
      <TextStyleControls
        style={text.style}
        onStyleChange={(style) => onUpdate({ style: { ...text.style, ...style } })}
      />
    </div>
  );
}