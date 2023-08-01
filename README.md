
[![Agility Yellow Triangle Logo withe gray text reading Agility to the right of the triangle](https://cdn.agilitycms.com/content-manager/images/logos/agility-logo-storybook-350.png)](https://agilitycms.com/)
# Agility Plenum UI Library 

Welcome to Plenum, the definitive UI library for working within the [Agility CMS](https://www.agilitycms.com/) ecosystem. Built with [Next.js 13](https://nextjs.org/) and [Storybook 7.1](https://storybook.js.org/), Plenum is a comprehensive collection of components and patterns designed for building user interfaces in Agility CMS, as well as your own applications within the Agility CMS ecosystem.


## Building for the Agility Marketplace

The Plenum library is designed to encourage and facilitate building applications for the Agility CMS Marketplace. Use the rich selection of components and patterns to build consistent, robust, and user-friendly applications for the Agility ecosystem.

Contributions to extend and improve this library are welcome! Feel free to fork the repository and submit pull requests.

## Features

- Comprehensive UI components library, designed for versatility and consistency.
- Built with modern technologies like Next.js 13 and Storybook 7.1.
- Includes automation scripts for efficient component creation.
- Adopts Tailwind CSS for utility-first styling.
- Easy to use, install, and integrate into your project.
  
## Prerequisites

Before you begin, ensure that Tailwind CSS is installed in your project. Follow the instructions here: [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)

In your app entry point (i.e. \`_app.tsx\`), import the \`globals.css\` file from the previous step, and the \`tailwind.css\` file from Plenum:

```jsx
import "<RELATIVE_PATH>/globals.css";
import "@agility/plenum-ui/lib/tailwind.css";
```

Make sure to add any additional styles before these two import statements to prevent overwriting the Plenum styling.

## Installation

You can install the Plenum library using npm or yarn:

```bash
# Using npm:
npm install @agility/plenum-ui

# Using yarn:
yarn add @agility/plenum-ui
```

## Usage

Import and use the Plenum components in your React components:

```jsx
import { Component } from '@agility/plenum-ui';

<Component {...{ComponentProps}} />
```

## Scripts

### Development and Build Scripts

Run your development server:

```bash
npm run dev
# or
yarn dev
```

Build your project:

```bash
npm run build
# or
yarn build
```

Start your application:

```bash
npm run start
# or
yarn start
```

Lint your project:

```bash
npm run lint
# or
yarn lint
```

### Storybook Scripts

Build your Storybook:

```bash
npm run build-storybook
# or
yarn build-storybook
```

Run your Storybook in development mode:

```bash
npm run storybook:dev
# or
yarn storybook:dev
```

Generate Tailwind CSS for Storybook:

```bash
npm run storybook:tw
# or
yarn storybook:tw
```

Build Tailwind CSS:

```bash
npm run build:tw
# or
yarn build:tw
```

### Component Generation Script

We have a Node.js script that automates the creation of new components for our Storybook library. This script generates a component directory, along with the necessary files like \`Component.tsx\`, \`Component.stories.tsx\`, and \`index.tsx\`.

#### How to use the script

To use the script, you should have Node.js installed. From the terminal, you can create a new component by running the following command:

```bash
node create-component.js ComponentName DestinationDirectory
```

This command takes two arguments:

- \`ComponentName\` - The name of the new component you want to create. This should be in PascalCase (for example, "MyComponent").
- \`DestinationDirectory\` - The directory where the new component will be created. This should be relative to the 'stories' directory. (for example, "Atoms" or "Molecules").

The script will create a new directory with the given component name inside the specified destination directory (under the 'stories' directory). Then, it will generate three files in the new directory:

- \`ComponentName.tsx\` - This is the component file. It contains a basic React functional component structure.
- \`ComponentName.stories.tsx\` - This is the Storybook story file. It sets up a basic story for the new component.
- \`index.tsx\` - This file simply exports the new component. It's used for cleaner imports.

#### Example

To create a new component named "Button" in the "Atoms" directory, you would run:

```bash
node create-component.js Button Atoms
```

This would create a directory structure like:

```
- stories
  - Atoms
    - Button
      - Button.tsx
      - Button.stories.tsx
      - index.tsx
```

Each of the generated files will contain basic boilerplate code that you can start with.

##### Notes

This script does prompt the user before overwriting existing directories, so you can run it with confidence. Always use PascalCase for component names, and ensure the destination directory exists or can be created. If you encounter any issues, you can create the component and its files manually
