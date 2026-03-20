import React, { useState } from 'react';
import { aiService } from '../services/aiAdapter';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const imageUrl = await aiService.generateImage(prompt);
      if (imageUrl) {
        onImageGenerated(imageUrl);
      }
    } catch (error) {
      console.error('Error generating image:', error);
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
        disabled={loading}
        className="w-full bg-[#2C2A26] text-white p-2 rounded"
      >
        {loading ? 'Gerando...' : 'Gerar Imagem'}
      </button>
    </div>
  );
};

export default ImageGenerator;
