# Agility CMS Component Library for React

## Features

- Button | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-button)
- Combobox | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-combobox--all-variations)
- Dropdown | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-dropdown--default)
- Switch | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-atoms--switch-component)
- TreeView | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-treeview-v2--tree-view-component)
- TextInput | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-textinput--all-variations)
- TextInputSelect | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-textinputselect--all-variations)
- Radio | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-radio--all-variations)
- Checkbox | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-checkbox--all-variations)
- Text-area | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-textarea--all-variations)
- Select | [view](https://plenum-ui.vercel.app/?path=/story/plenum-ui-components-select--all-variations)

## Installing

Using npm:

```bash
$ npm install @agility/plenum-ui
```

Using yarn:

```bash
$ yarn add @agility/plenum-ui
```

## Usage

```js
import { Button } from '@agility/plenum-ui';

<Button label='Primary' type='primary' size='base' icon='BellIcon'>
```

## Advanced

If you wish to use yarn link with this project to debug locally:

```
cd THIS_PACKAGE
yarn link
yarn install
cd node_modules/react
yarn link
cd ../../node_modules/react-dom
yarn link
cd YOUR_PROJECT
yarn link PACKAGE_YOU_DEBUG_LOCALLY
yarn link react
yarn link react-dom
```

Then, when you are done

```
cd YOUR_PROJECT
yarn unlink "@agility/plenum-ui"
yarn unlink react
yarn link react-dom

cd THIS_PACKAGE
yarn unlink
cd node_modules/react
yarn unlink
cd ../../node_modules/react-dom
yarn unlink

```
