// Aplikacja "Pozdrowienia" - frontend w React z Tailwind CSS
// Zawiera: formularz, panel ekranowy, panel moderacji

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [view, setView] = useState("form"); // form | screen | mod
  const [greetings, setGreetings] = useState([]);
  const [formData, setFormData] = useState({ message: "", emoji: "😊", image: null });
  const [modPassword, setModPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  const handleSubmit = () => {
    const newGreeting = { ...formData, approved: false };
    setGreetings([...greetings, newGreeting]);
    setFormData({ message: "", emoji: "😊", image: null });
  };

  const approveGreeting = (index) => {
    const updated = greetings.map((g, i) => (i === index ? { ...g, approved: true } : g));
    setGreetings(updated);
  };

  const handleAuth = () => {
    if (modPassword === "glo2025") {
      setAuthenticated(true);
    } else {
      alert("Nieprawidłowe hasło");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-orange-200">
      <div className="mb-4 space-x-2">
        <button onClick={() => setView("form")} className="px-4 py-2 bg-white rounded">Formularz</button>
        <button onClick={() => setView("mod")} className="px-4 py-2 bg-white rounded">Moderacja</button>
        <button onClick={() => setView("screen")} className="px-4 py-2 bg-white rounded">Ekran</button>
      </div>

      {view === "form" && (
        <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
          <textarea
            name="message"
            placeholder="Napisz pozdrowienie..."
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <select name="emoji" value={formData.emoji} onChange={handleInputChange} className="w-full p-2 border rounded mb-2">
            <option>😊</option>
            <option>🎉</option>
            <option>❤️</option>
            <option>🔥</option>
          </select>
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} className="mb-2" />
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Wyślij</button>
        </div>
      )}

      {view === "mod" && (
        !authenticated ? (
          <div className="max-w-xs mx-auto space-y-2 bg-white p-4 rounded shadow">
            <input
              type="password"
              placeholder="Hasło moderatora"
              value={modPassword}
              onChange={(e) => setModPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleAuth} className="px-4 py-2 bg-blue-500 text-white rounded w-full">Zaloguj się</button>
          </div>
        ) : (
          <div className="space-y-4">
            {greetings.map((g, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <p className="text-lg">{g.emoji} {g.message}</p>
                {g.image && <img src={g.image} alt="user" className="w-32 h-32 object-cover mt-2" />}
                {!g.approved && <button onClick={() => approveGreeting(i)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Zatwierdź</button>}
              </div>
            ))}
          </div>
        )
      )}

      {view === "screen" && (
        <div className="grid gap-4 grid-cols-2">
          {greetings.filter(g => g.approved).map((g, i) => (
            <div key={i} className="bg-white text-center text-2xl p-4 rounded shadow">
              <p>{g.emoji} {g.message}</p>
              {g.image && <img src={g.image} alt="user" className="mx-auto mt-2 w-40 h-40 object-cover rounded-full" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;