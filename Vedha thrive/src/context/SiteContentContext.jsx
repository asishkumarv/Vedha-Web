import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getSiteContent()
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load site content', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, isLoading }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  return context?.content || { hero: {}, sections: [], cards: [], footer: {} };
};

export const useSiteLoading = () => {
  const context = useContext(SiteContentContext);
  return context?.isLoading ?? true;
};
