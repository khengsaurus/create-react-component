export function getCreateFolderCommand(path: string, name: string) {
  return `mkdir ${path}/${name}`;
}

export function getCreateStylesheetCommand(
  path: string,
  name: string,
  stylesheet: string
) {
  return `touch ${path}/${name}/${stylesheet}`;
}

export function getCreateComponentCommand(
  path: string,
  name: string,
  ts: boolean,
  stylesheet: string,
  useComponentFileName: boolean
) {
  const importStyles = stylesheet.includes(".module.")
    ? `import styles from './${stylesheet}';\n`
    : `import './${stylesheet}';\n`;

  const contents = `import React from 'react';\n${importStyles}\n${
    ts ? `type ${name}Props = {\n  //\n}\n\n` : ``
  }function ${name}(props${
    ts ? `: ${name}Props` : ``
  }) {\n  return <div></div>;\n};\n
export default ${name};`;

  const fileName = `${useComponentFileName ? name : "index"}.${
    ts ? "t" : "j"
  }sx`;
  return `echo "${contents}" > ${path}/${name}/${fileName}`;
}

export function getCreateBarrelCommand(
  path: string,
  name: string,
  ts: boolean
) {
  const barrelFile = `${path}/${name}/index.${ts ? "ts" : "js"}`;
  return `echo "export { default } from './${name}';" > ${barrelFile}`;
}
