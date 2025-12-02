import { useEffect, useRef, useState } from 'react';

const NAME_KEY = 'findly_name';

const FAQ = [
  { q: 'Jak wyszukać?', a: 'Wpisz słowa kluczowe, takie jak nazwa, lokalizacja lub opis. Wyniki pojawią się natychmiast.' },
  { q: 'Czy mogę dodać swój przedmiot?', a: 'Nie w tej wersji. Dane są tylko do odczytu.' },
];

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

export function FindBot() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [inputName, setInputName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem(NAME_KEY);
    if (storedName) {
      setName(storedName);
      setMessages([
        { id: '1', text: `Witaj ponownie, ${storedName}! W czym mogę pomóc?`, sender: 'bot' }
      ]);
    } else {
      setMessages([
        { id: '1', text: "Cześć! Jestem Find-Bot. Jak masz na imię?", sender: 'bot' }
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSaveName = () => {
    const trimmed = inputName.trim();
    if (!trimmed) return;
    
    localStorage.setItem(NAME_KEY, trimmed);
    setName(trimmed);
    
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, sender: 'user' },
      { id: (Date.now() + 1).toString(), text: `Miło Cię poznać, ${trimmed}! Wybierz pytanie poniżej, aby zacząć.`, sender: 'bot' }
    ]);
  };

  const handleAsk = (q: string, a: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: q, sender: 'user' },
      { id: (Date.now() + 1).toString(), text: a, sender: 'bot' }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {open && (
        <div className="w-80 sm:w-96 h-[500px] max-h-[80vh] bg-base-100 border border-base-300 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-in origin-bottom-right">
          <div className="bg-primary text-primary-content p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-robot text-2xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-xl">Find-Bot</h3>
                <p className="text-xs opacity-80">Zawsze do usług</p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="btn btn-ghost btn-sm btn-circle text-primary-content hover:bg-white/20"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat ${msg.sender === 'bot' ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-image avatar flex">
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                    {msg.sender === 'bot' ? (
                      <i className="fas fa-robot text-xs text-base-content/70"></i>
                    ) : (
                      <i className="fas fa-user text-xs text-base-content/70"></i>
                    )}
                  </div>
                </div>
                <div className={`chat-bubble text-sm ${
                  msg.sender === 'bot' 
                    ? 'bg-base-100 text-base-content shadow-sm' 
                    : 'bg-primary text-primary-content'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-base-100 border-t border-base-200">
            {!name ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Wpisz swoje imię..."
                  className="input input-bordered input-sm flex-1"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button className="btn btn-primary btn-sm" onClick={handleSaveName}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-base-content/50 mb-1">Sugerowane pytania:</p>
                <div className="flex flex-wrap gap-2">
                  {FAQ.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => handleAsk(item.q, item.a)}
                      className="btn btn-xs btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 hover:text-base-content normal-case font-normal"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`btn btn-circle btn-lg shadow-xl transition-all duration-300 bg-white dark:bg-black border-none hover:bg-gray-100 dark:hover:bg-gray-900 ${
          open ? 'rotate-90' : 'hover:scale-110'
        }`}
      >
        {open ? (
          <i className="fas fa-times text-xl text-black dark:text-white"></i>
        ) : (
          <div className="indicator">
            <i className="fas fa-comment-dots text-2xl text-black dark:text-white"></i>
            {!name && <span className="badge badge-xs badge-secondary indicator-item animate-pulse"></span>}
          </div>
        )}
      </button>
    </div>
  );
}
