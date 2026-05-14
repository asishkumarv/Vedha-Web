import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.getSiteContent()
      .then(setContent)
      .catch((error) => console.error('Failed to load site content', error));
  }, []);

  return (
    <SiteContentContext.Provider value={{ content }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  return context?.content || { hero: {}, sections: [], cards: [], footer: {} };
};
