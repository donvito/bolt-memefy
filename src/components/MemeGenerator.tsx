import { useState, useEffect, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import MemeSearch from './MemeSearch';
import MemePreview from './MemePreview';
import MemeEditor from './MemeEditor';
import type { Meme, MemeText } from '../types/meme';

export default function MemeGenerator() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [texts, setTexts] = useState<MemeText[]>([]);
  const memeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        setMemes(data.data.memes);
        setSelectedMeme(data.data.memes[0]);
      });
  }, []);

  const addNewText = () => {
    const newText: MemeText = {
      id: `text-${Date.now()}`,
      text: '',
      style: {
        fontSize: 32,
        color: '#ffffff',
        outline: true,
        shadow: false,
        bold: true
      },
      position: { x: 200, y: 100 }
    };
    setTexts([...texts, newText]);
  };

  const updateText = (id: string, updates: Partial<MemeText>) => {
    setTexts(texts.map(text => 
      text.id === id ? { ...text, ...updates } : text
    ));
  };

  const removeText = (id: string) => {
    setTexts(texts.filter(text => text.id !== id));
  };

  const handleTextPositionChange = (id: string, position: { x: number; y: number }) => {
    updateText(id, { position });
  };

  const downloadMeme = async () => {
    if (memeRef.current) {
      const dataUrl = await htmlToImage.toPng(memeRef.current);
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Meme Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <div className="lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto space-y-4">
          <MemeSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onMemeSelect={setSelectedMeme}
            memes={memes}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 min-w-0 max-w-[800px] mx-auto">
              <MemePreview
                memeRef={memeRef}
                selectedMeme={selectedMeme}
                texts={texts}
                onTextPositionChange={handleTextPositionChange}
              />
            </div>

            <div className="w-full lg:w-80 bg-gray-50 rounded-lg p-4 space-y-4 lg:sticky lg:top-4 h-fit">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">Text Elements</h2>
                <button
                  onClick={addNewText}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Add Text
                </button>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {texts.map((text, index) => (
                  <MemeEditor
                    key={text.id}
                    text={text}
                    onUpdate={(updates) => updateText(text.id, updates)}
                    onRemove={() => removeText(text.id)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={downloadMeme}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Download Meme
          </button>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        Made with ❤️ by <a href="https://donvitocodes.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">DonvitoCodes</a>
        {' • '}
        <a href="https://github.com/donvito" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">GitHub</a>
        {' • '}
        <a href="https://x.com/donvito" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">X</a>
      </div>
    </div>
  );
}