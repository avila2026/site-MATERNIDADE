/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Componente de chat IA com suporte a múltiplos provedores.
 * Troca entre Gemini e Claude (Anthropic) sem recarregar a página.
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AIProvider } from '../types';
import { GeminiAdapter, AnthropicAdapter, getDefaultProvider } from '../services/aiAdapter';

const PROVIDER_LABELS: Record<AIProvider, string> = {
  gemini: 'Gemini',
  anthropic: 'Claude',
};

const PROVIDER_COLORS: Record<AIProvider, string> = {
  gemini: '#1a73e8',
  anthropic: '#c97a3d',
};

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState<AIProvider>(getDefaultProvider());
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Bem-vindo ao Achadinhos Maternidade! Estou aqui para ajudá-la a encontrar o melhor para você e seu bebê. Como posso ajudar?',
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ao receber nova mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const getAdapter = () =>
    provider === 'anthropic' ? AnthropicAdapter : GeminiAdapter;

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputValue,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const adapter = getAdapter();
      const isImageRequest = inputValue.toLowerCase().includes('gerar imagem de');

      if (isImageRequest) {
        if (adapter.provider === 'anthropic') {
          // Claude não suporta geração de imagens
          const aiMsg: ChatMessage = {
            role: 'model',
            text: 'Para gerar imagens, use o provedor Gemini (clique no seletor acima). O Claude não possui geração de imagens nativa.',
            timestamp: Date.now(),
          };
          setMessages(prev => [...prev, aiMsg]);
        } else {
          const prompt = inputValue.replace(/gerar imagem de/i, '').trim();
          const imageUrl = await adapter.generateImage(prompt);
          const aiMsg: ChatMessage = imageUrl
            ? { role: 'model', text: `Aqui está a imagem de: ${prompt}`, imageUrl, timestamp: Date.now() }
            : { role: 'model', text: 'Desculpe, não consegui gerar a imagem. Tente novamente.', timestamp: Date.now() };
          setMessages(prev => [...prev, aiMsg]);
        }
      } else {
        const history = messages.map(m => ({ role: m.role, text: m.text }));
        const responseText = await adapter.sendMessage(history, userMsg.text, 'fast');
        const aiMsg: ChatMessage = {
          role: 'model',
          text: responseText,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      const aiMsg: ChatMessage = {
        role: 'model',
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        timestamp: Date.now(),
      };
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

  const handleProviderChange = (newProvider: AIProvider) => {
    setProvider(newProvider);
    setMessages([
      {
        role: 'model',
        text: `Provedor alterado para ${PROVIDER_LABELS[newProvider]}. Como posso ajudar?`,
        timestamp: Date.now(),
      },
    ]);
  };

  const providerColor = PROVIDER_COLORS[provider];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-[#FFF1F2] rounded-none shadow-2xl shadow-[#4C0519]/10 w-[90vw] sm:w-[390px] h-[580px] mb-6 flex flex-col overflow-hidden border border-[#FECDD3] animate-slide-up-fade">

          {/* Header */}
          <div className="bg-[#FFE4E6] p-4 border-b border-[#FECDD3]">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: providerColor }}
                />
                <span className="font-serif italic text-[#4C0519] text-lg">
                  Concierge
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#FDA4AF] hover:text-[#4C0519] transition-colors"
                aria-label="Fechar chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Provider selector */}
            <div className="flex gap-1 bg-white/60 rounded p-1">
              {(['gemini', 'anthropic'] as AIProvider[]).map(p => (
                <button
                  key={p}
                  onClick={() => handleProviderChange(p)}
                  className={`flex-1 text-xs py-1.5 px-2 rounded transition-all duration-200 font-medium ${
                    provider === p
                      ? 'bg-[#4C0519] text-white shadow-sm'
                      : 'text-[#881337] hover:bg-white/80'
                  }`}
                >
                  {PROVIDER_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFF1F2]"
            ref={scrollRef}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#4C0519] text-[#FFF1F2]'
                      : 'bg-white border border-[#FFE4E6] text-[#881337] shadow-sm'
                  }`}
                >
                  {msg.text}
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Imagem gerada pela IA"
                      className="mt-3 rounded"
                    />
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#FFE4E6] p-4 flex gap-1 items-center shadow-sm">
                  {[0, 75, 150].map(delay => (
                    <div
                      key={delay}
                      className="w-1.5 h-1.5 bg-[#FDA4AF] rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#FFF1F2] border-t border-[#FECDD3]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  provider === 'anthropic'
                    ? 'Pergunte ao Claude...'
                    : 'Pergunte qualquer coisa...'
                }
                className="flex-1 bg-white border border-[#FECDD3] focus:border-[#4C0519] px-4 py-3 text-sm outline-none transition-colors placeholder-[#FDA4AF] text-[#4C0519]"
                disabled={isThinking}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className="bg-[#4C0519] text-[#FFF1F2] px-4 hover:bg-[#881337] transition-colors disabled:opacity-50"
                aria-label="Enviar mensagem"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-[#FDA4AF] mt-2 text-center">
              Usando {PROVIDER_LABELS[provider]}
              {provider === 'gemini' ? ' · Suporta geração de imagens' : ' · Melhor para raciocínio complexo'}
            </p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#4C0519] text-[#FFF1F2] w-14 h-14 flex items-center justify-center rounded-full shadow-xl hover:scale-105 transition-all duration-300 z-50"
        aria-label={isOpen ? 'Fechar assistente' : 'Abrir assistente IA'}
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
