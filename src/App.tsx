import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="app">
      <div className="card">
        <h1>Hallo wereld 👋</h1>
        <small>Codex → Codespaces → GitHub</small>
        <p style={{ marginTop: 12 }}>Kliks: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  );
}
