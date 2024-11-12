import { type FC } from 'react';
import type { SearchHistoryItem } from '../types/meme';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onHistoryItemClick: (term: string) => void;
  onClearHistory: () => void;
}

const SearchHistory: FC<SearchHistoryProps> = ({ 
  history, 
  onHistoryItemClick,
  onClearHistory 
}) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Recent searches:</span>
        <button
          onClick={onClearHistory}
          className="text-xs text-red-500 hover:text-red-600"
        >
          Clear history
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map(({ term, timestamp }) => (
          <button
            key={`${term}-${timestamp}`}
            onClick={() => onHistoryItemClick(term)}
            className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;