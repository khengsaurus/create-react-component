import * as vscode from "vscode";

export const terminalName = "create-react-component-terminal";

export function getResourceDir(dir: string) {
  let s = dir.length;
  for (let i = s - 1; i > 0; i--) {
    if (dir[i] === "/") {
      s = i;
      break;
    }
  }
  return dir.slice(0, s);
}

export function getYesNo(title: string) {
  return vscode.window.showInputBox({
    title,
    placeHolder: "yY/nN",
    prompt: "Defaults to yes",
  });
}

export function toBoolean(res?: string) {
  if (res === undefined) {
    throw new Error("Cancel");
  }
  return res?.toLowerCase()?.startsWith("n") ? false : true;
}

export function getTerminalInstance(): vscode.Terminal {
  const terminals = (<any>vscode.window).terminals;
  for (const terminal of terminals) {
    if (terminal.name === terminalName) {
      return terminal;
    }
  }
  return vscode.window.createTerminal({
    name: terminalName,
    hideFromUser: true,
  });
}

export function getStylesheetName(scss: boolean, mod: boolean) {
  return `styles${mod ? ".module" : ""}.${scss ? "s" : ""}css`;
}
