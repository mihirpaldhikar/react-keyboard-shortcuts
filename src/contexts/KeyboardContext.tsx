/*
 * Copyright 2023 Mihir Paldhikar
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF
 * ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
 * SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import type KeyBinding from "@type/KeyBinding";
import type KeyboardProviderProps from "@props/KeyboardProviderProps";

const initialKeyBinding = new Set<string>();

const KeyboardContext = createContext<KeyBinding>(initialKeyBinding);

function KeyboardProvider({ children }: KeyboardProviderProps): ReactNode {
  const [keyBinding, setKeyBinding] = useState<KeyBinding>(initialKeyBinding);

  const keyDownHandler = useCallback(
    (event: KeyboardEvent): void => {
      if (
        event.ctrlKey ||
        (event.ctrlKey && event.shiftKey) ||
        (event.ctrlKey && event.altKey) ||
        (event.shiftKey && event.altKey) ||
        (event.ctrlKey && event.ctrlKey && event.altKey)
      ) {
        event.preventDefault();
      }

      const newKeyBinding: KeyBinding = new Set<string>([
        ...Array.from(keyBinding),
        event.key.toLowerCase(),
      ]);

      setKeyBinding(newKeyBinding);
    },
    [keyBinding]
  );

  const keyUpHandler = useCallback(
    (event: KeyboardEvent): void => {
      if (
        event.ctrlKey ||
        (event.ctrlKey && event.shiftKey) ||
        (event.ctrlKey && event.altKey) ||
        (event.shiftKey && event.altKey) ||
        (event.ctrlKey && event.ctrlKey && event.altKey)
      ) {
        event.preventDefault();
      }

      const newKeyBinding: KeyBinding = new Set<string>([
        ...Array.from(keyBinding).filter(
          (key) => key !== event.key.toLowerCase()
        ),
      ]);

      setKeyBinding(newKeyBinding);
    },
    [keyBinding]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyDownHandler, keyUpHandler]);

  return (
    <KeyboardContext.Provider value={keyBinding}>
      {children}
    </KeyboardContext.Provider>
  );
}

export default KeyboardProvider;
