/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { GeminiAdapter } from '../services/aiAdapter';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bem-vindo ao Achadinhos Maternidade. Estou aqui para ajudá-la a encontrar o melhor para você e seu bebê. Como posso ajudar? (Você pode me pedir para gerar imagens também!)', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      // Check if user wants to generate an image
      if (inputValue.toLowerCase().includes('gerar imagem de')) {
          const prompt = inputValue.replace(/gerar imagem de/i, '').trim();
          const imageUrl = await GeminiAdapter.generateImage(prompt);
          if (imageUrl) {
              const aiMsg: ChatMessage = { role: 'model', text: `Aqui está a imagem de: ${prompt}`, imageUrl, timestamp: Date.now() };
              setMessages(prev => [...prev, aiMsg]);
          } else {
              const aiMsg: ChatMessage = { role: 'model', text: "Desculpe, não consegui gerar a imagem.", timestamp: Date.now() };
              setMessages(prev => [...prev, aiMsg]);
          }
      } else {
          const history = messages.map(m => ({ role: m.role, text: m.text }));
          // Use fast mode for chat
          const responseText = await GeminiAdapter.sendMessage(history, userMsg.text, 'fast');
          
          const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
          setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
        const aiMsg: ChatMessage = { role: 'model', text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.', timestamp: Date.now() };
        setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsThinking(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-[#FFF1F2] rounded-none shadow-2xl shadow-[#4C0519]/10 w-[90vw] sm:w-[380px] h-[550px] mb-6 flex flex-col overflow-hidden border border-[#FECDD3] animate-slide-up-fade">
          {/* Header */}
          <div className="bg-[#FFE4E6] p-5 border-b border-[#FECDD3] flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#4C0519] rounded-full animate-pulse"></div>
                <span className="font-serif italic text-[#4C0519] text-lg">Concierge</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#FDA4AF] hover:text-[#4C0519] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FFF1F2]" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#4C0519] text-[#FFF1F2]' 
                      : 'bg-white border border-[#FFE4E6] text-[#881337] shadow-sm'
                  }`}
                >
                  {msg.text}
                  {msg.imageUrl && <img src={msg.imageUrl} alt="Generated" className="mt-2" />}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                 <div className="bg-white border border-[#FFE4E6] p-5 flex gap-1 items-center shadow-sm">
                   <div className="w-1.5 h-1.5 bg-[#FDA4AF] rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-[#FDA4AF] rounded-full animate-bounce" style={{ animationDelay: '75ms' }}></div>
                   <div className="w-1.5 h-1.5 bg-[#FDA4AF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-[#FFF1F2] border-t border-[#FECDD3]">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pergunte qualquer coisa..." 
                className="flex-1 bg-white border border-[#FECDD3] focus:border-[#4C0519] px-4 py-3 text-sm outline-none transition-colors placeholder-[#FDA4AF] text-[#4C0519]"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className="bg-[#4C0519] text-[#FFF1F2] px-4 hover:bg-[#881337] transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#4C0519] text-[#FFF1F2] w-14 h-14 flex items-center justify-center rounded-full shadow-xl hover:scale-105 transition-all duration-500 z-50"
      >
        {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
             </svg>
        ) : (
            <span className="font-serif italic text-lg">Ai</span>
        )}
      </button>
    </div>
  );
};

export default Assistant;