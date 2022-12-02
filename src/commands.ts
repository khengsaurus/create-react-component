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
  stylesheet: string
) {
  const importStyles = stylesheet.includes(".module.")
    ? `import styles from './${stylesheet}';\n`
    : `import './${stylesheet}';\n`;

  const indexContents = `import React from 'react';\n${importStyles}\n${
    ts ? `interface I${name} {\n  //\n}\n\n` : ``
  }const ${name} = (props${
    ts ? `: I${name}` : ``
  }) => {\n  return <div></div>;\n};\n
export default ${name};`;

  return `echo "${indexContents}" > ${path}/${name}/index.${ts ? "t" : "j"}sx`;
}
