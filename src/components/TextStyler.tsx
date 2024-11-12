import { type FC } from 'react';
import { FaBold } from 'react-icons/fa6';
import { MdFormatColorFill } from 'react-icons/md';
import { RxShadow } from 'react-icons/rx';
import type { TextStyle } from '../types/meme';

interface TextStylerProps {
  style: TextStyle;
  onChange: (style: TextStyle) => void;
}

const TextStyler: FC<TextStylerProps> = ({ style, onChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Font Size</label>
        <div className="flex items-center gap-2">
          <span className="text-sm">A</span>
          <input
            type="range"
            min="16"
            max="72"
            value={style.fontSize}
            onChange={(e) => onChange({ ...style, fontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-lg">A</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="color"
            value={style.color}
            onChange={(e) => onChange({ ...style, color: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer opacity-0 absolute inset-0"
            title="Text Color"
          />
          <div 
            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
            style={{ backgroundColor: style.color }}
          >
            <MdFormatColorFill className="text-white mix-blend-difference" />
          </div>
        </div>

        <button
          onClick={() => onChange({ ...style, bold: !style.bold })}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
            style.bold 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Bold"
        >
          <FaBold />
        </button>

        <button
          onClick={() => onChange({ ...style, outline: !style.outline })}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
            style.outline 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Outline"
        >
          <span className="font-bold text-lg leading-none" style={{ WebkitTextStroke: '1px currentColor' }}>
            O
          </span>
        </button>

        <button
          onClick={() => onChange({ ...style, shadow: !style.shadow })}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
            style.shadow 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Shadow"
        >
          <RxShadow />
        </button>
      </div>
    </div>
  );
};

export default TextStyler;