
import React, { useState, useRef, useEffect } from 'react';
import { getBookingAdvice } from '../services/geminiService';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: 'Olá! Sou seu assistente AgendAI. Como posso ajudar com seu agendamento hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const botReply = await getBookingAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: botReply || 'Não consegui processar sua dúvida.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-robot"></i>
              </div>
              <span className="font-bold">AgendAI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 animate-pulse flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo..."
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button type="submit" disabled={isLoading} className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition active:scale-95 group"
        >
          <i className="fas fa-comment-dots text-2xl group-hover:rotate-12 transition"></i>
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;
