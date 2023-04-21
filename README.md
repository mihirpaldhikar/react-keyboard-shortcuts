# React Keyboard Shortcuts

A library for creating keyboard shortcuts using hooks in React JS.

> This package is currently published on [GitHub Packages](https://github.com/features/packages).
>
> To use the package you need to create ```.npmrc``` file in your working directory and add the following line to the
> file:
>
> ```@mihirpaldhikar:registry=https://npm.pkg.github.com```

### Usage

Import the ```KeyboardShortcuts``` wrapper in the root of the React app.

```tsx
import { KeyboardShortcuts } from "@mihirpaldhikar/react-keyboard-shortcuts";

<KeyboardShortcuts>
  <RootLayout />
</KeyboardShortcuts>

```

When ever you need to create a shortcut, use ```useShortcut``` hook.

```tsx
import { useShortcut } from "@mihirpaldhikar/react-keyboard-shortcuts";


export default function MyComponent(): JSX.Element {

  function saveHandler() {
    // save logic
    console.log("Saved!");
  }

  useShortcut("ctrl+s", saveHandler);

  return (
    <div>
      <h1>Hello from My Component!</h1>
    </div>
  );
}
```

#### Author: [Mihir Paldhikar](https://mihirpaldhikar.com)

