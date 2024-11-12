import { type FC } from 'react';
import MemeGenerator from './components/MemeGenerator';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <MemeGenerator />
    </div>
  );
};

export default App;