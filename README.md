# Create React Component

## 1. Right click on a folder or a file

If you right-click on a file, you will have the option to create your component on the same level as that file. If you right-click on a folder, you will have the options to create your component on the same level as that folder, as well as in it.

![image 1](https://raw.githubusercontent.com/khengsaurus/create-react-component/master/assets/1.png)

## 2. Input options

You will be prompted for the following things:

1. Component name (will be casted to pascal case)
2. Whether to use TypeScript
3. Whether to use SCSS
4. Whether to use a CSS module
5. Whether to name the component file after the component
6. Whether to name the stylesheet `styles.<suffix>` or use the component name
7. Whether to include a barrel file (skipped if you decline step 5)

![image 2](https://raw.githubusercontent.com/khengsaurus/create-react-component/master/assets/2.png)

## 3. Folder and files will be created

The newly-created component file will contain some boilerplate to help you get started. If you reply yes to all the prompts, you will have a new folder with the following structure:

```
~
└── Sample
    ├── index.tsx
    ├── styles.module.scss
    └── Sample.tsx
```

![image 3](https://raw.githubusercontent.com/khengsaurus/create-react-component/master/assets/3.png)

Happy coding :)
