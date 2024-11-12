import { useState } from 'react';
import type { Meme } from '../types/meme';

interface MemeSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMemeSelect: (meme: Meme) => void;
  memes: Meme[];
}

export default function MemeSearch({
  searchTerm,
  onSearchChange,
  onMemeSelect,
  memes,
}: MemeSearchProps) {
  const [displayLimit, setDisplayLimit] = useState(6);
  
  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedMemes = filteredMemes.slice(0, displayLimit);
  const hasMore = displayLimit < filteredMemes.length;

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search templates..."
        className="w-full p-2 border rounded"
      />
      
      <div className="grid grid-cols-2 gap-2">
        {displayedMemes.map((meme) => (
          <button
            key={meme.id}
            onClick={() => onMemeSelect(meme)}
            className="relative aspect-square overflow-hidden rounded-lg hover:opacity-75 transition-opacity"
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setDisplayLimit(prev => prev + 6)}
          className="w-full py-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Show More Templates
        </button>
      )}
    </div>
  );
}