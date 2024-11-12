import { FaBold } from 'react-icons/fa';
import { BsFillDropletFill } from 'react-icons/bs';
import { RxShadow } from 'react-icons/rx';
import { BsTextareaT } from 'react-icons/bs';
import type { TextStyle } from '../types/meme';

interface TextStyleControlsProps {
  style: TextStyle;
  onStyleChange: (style: Partial<TextStyle>) => void;
}

export default function TextStyleControls({ style, onStyleChange }: TextStyleControlsProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-1 items-center">
        <button
          onClick={() => onStyleChange({ bold: !style.bold })}
          className={`p-1 rounded ${style.bold ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          title="Toggle Bold"
        >
          <FaBold size={18} />
        </button>
        
        <button
          onClick={() => onStyleChange({ outline: !style.outline })}
          className={`p-1 rounded ${style.outline ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          title="Toggle Outline"
        >
          <BsTextareaT size={18} />
        </button>
        
        {/* <button
          onClick={() => onStyleChange({ shadow: !style.shadow })}
          className={`p-1 rounded ${style.shadow ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          title="Toggle Shadow"
        >
          <RxShadow size={12} />
        </button> */}
        
        <div className="relative">
          <button 
            className={`w-8 h-8 rounded flex items-center justify-center ${style.color === '#ffffff' ? 'bg-gray-200' : ''}`}
            style={{ backgroundColor: style.color }}
            title="Change Color"
          >
            <BsFillDropletFill className="text-white mix-blend-difference" size={18} />
            <input
              type="color"
              value={style.color}
              onChange={(e) => onStyleChange({ color: e.target.value })}
              className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
              title="Change Color"
            />
          </button>
        </div>

        <input
          type="range"
          min="12"
          max="72"
          value={style.fontSize}
          onChange={(e) => onStyleChange({ fontSize: parseInt(e.target.value) })}
          className="flex-1 h-6"
          title={`Font Size: ${style.fontSize}px`}
        />
      </div>
    </div>
  );
}