import { useState, useEffect, ComponentType } from 'react';
import Home from './Home';
import About from './About';

const routes: Record<string, ComponentType> = {
  '#/': Home,
  '#/about': About,
};

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const Page = routes[route] || Home;

  return (
    <>
      <header>
        <nav>
          <a href="#/">Home</a> | <a href="#/about">About</a>
        </nav>
      </header>
      <Page />
    </>
  );
}
