import React, { useState } from 'react';
import { GeminiAdapter } from '../services/aiAdapter';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await GeminiAdapter.generateImage(prompt, aspectRatio);
      if (imageUrl) {
        onImageGenerated(imageUrl);
      } else {
        setError('Não foi possível gerar a imagem. Tente novamente.');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Erro ao gerar imagem. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a imagem..."
        className="w-full p-2 border rounded"
      />
      <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full p-2 border rounded">
        {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map(ratio => (
          <option key={ratio} value={ratio}>{ratio}</option>
        ))}
      </select>
      <button
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        className="w-full bg-[#2C2A26] text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Gerando...' : 'Gerar Imagem'}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default ImageGenerator;
