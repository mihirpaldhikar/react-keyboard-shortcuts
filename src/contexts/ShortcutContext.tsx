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

import { createContext, useState } from "react";
import type ShortcutHandlers from "@interface/ShortcutHandlers";
import type KeyBinding from "@type/KeyBinding";

const initialShortcutHandlers: ShortcutHandlers = {
  // eslint-disable-next-line no-empty-function
  registerShortcut: (_, __: () => void) => {},
  // eslint-disable-next-line no-empty-function
  removeShortcut: (_) => {},
  // eslint-disable-next-line no-empty-function
  triggerShortcut: (_) => {},
};

export const ShortcutContext = createContext<ShortcutHandlers>(
  initialShortcutHandlers
);

function buildShortcut(keyBinding: KeyBinding): string {
  return Array.from(keyBinding).join("+");
}

function ShortcutProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [shortcutMap, addShortcutMap] = useState<Map<string, () => void>>(
    new Map()
  );

  function registerShortcut(keys: KeyBinding, handler: () => void): void {
    const shortcut = buildShortcut(keys);
    addShortcutMap(shortcutMap.set(shortcut, handler));
  }

  function removeShortcut(keys: KeyBinding): void {
    shortcutMap.delete(buildShortcut(keys));
  }

  function triggerShortcut(keys: KeyBinding): void {
    const listener = shortcutMap.get(buildShortcut(keys));

    if (listener != null) {
      listener();
    }
  }

  return (
    <ShortcutContext.Provider
      value={{
        registerShortcut,
        removeShortcut,
        triggerShortcut,
      }}
    >
      {children}
    </ShortcutContext.Provider>
  );
}

export default ShortcutProvider;
