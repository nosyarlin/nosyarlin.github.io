import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ArticleSearchContextValue = {
  query: string;
  setQuery: (q: string) => void;
};

const ArticleSearchContext = createContext<ArticleSearchContextValue | null>(
  null,
);

export function ArticleSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQueryState] = useState("");
  const setQuery = useCallback((q: string) => {
    setQueryState(q);
  }, []);
  const value = useMemo(() => ({ query, setQuery }), [query, setQuery]);
  return (
    <ArticleSearchContext.Provider value={value}>
      {children}
    </ArticleSearchContext.Provider>
  );
}

export function useArticleSearch() {
  const ctx = useContext(ArticleSearchContext);
  if (!ctx) {
    throw new Error("useArticleSearch must be used within ArticleSearchProvider");
  }
  return ctx;
}
