import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

interface ChromeContextValue {
  chromeless: boolean;
  setChromeless: (next: boolean) => void;
}

const ChromeContext = createContext<ChromeContextValue>({
  chromeless: false,
  setChromeless: () => {},
});

interface ChromeProviderProps {
  chromeless: boolean;
  setChromeless: (next: boolean) => void;
  children: ReactNode;
}

export function ChromeProvider({ chromeless, setChromeless, children }: ChromeProviderProps) {
  const value = useMemo(() => ({ chromeless, setChromeless }), [chromeless, setChromeless]);
  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
}

/** Mount-scoped: requests chromeless layout while the calling view is mounted. */
export function useRequestChromeless(active: boolean): void {
  const { setChromeless } = useContext(ChromeContext);
  useEffect(() => {
    if (!active) return;
    setChromeless(true);
    return () => setChromeless(false);
  }, [active, setChromeless]);
}
