import * as vscode from "vscode";
import {
  getCreateComponentCommand,
  getCreateFolderCommand,
  getCreateStylesheetCommand,
} from "./commands";
import {
  getResourceDir,
  getStylesheetName,
  getTerminalInstance,
  getYesNo,
  toBoolean,
} from "./util";

function createCallback(path: string) {
  let name = "";
  let ts = true;
  let scss = true;
  let mod = true;
  vscode.window
    .showInputBox({ title: "Name of your React component:" })
    .then((_name) => {
      if (!_name?.trim()) {
        throw new Error("Invalid name");
      }
      name = _name.charAt(0).toUpperCase() + _name.slice(1);
    })
    .then(() => getYesNo("Would you like to use TypeScript?"))
    .then((res) => (ts = toBoolean(res)))
    .then(() => getYesNo("How about SCSS?"))
    .then((res) => (scss = toBoolean(res)))
    .then(() => getYesNo("Final question - fancy a CSS module?"))
    .then((res) => (mod = toBoolean(res)))
    .then(() => {
      const terminal = getTerminalInstance();
      const stylesheet = getStylesheetName(scss, mod);
      terminal.sendText(getCreateFolderCommand(path, name));
      terminal.sendText(getCreateStylesheetCommand(path, name, stylesheet));
      terminal.sendText(getCreateComponentCommand(path, name, ts, stylesheet));
    });
}

export function activate(context: vscode.ExtensionContext) {
  const createNested = vscode.commands.registerCommand(
    "create-react-component.create-nested",
    (uri: vscode.Uri) => {
      if (uri?.fsPath) {
        createCallback(uri.fsPath);
      }
    }
  );

  const createFlat = vscode.commands.registerCommand(
    "create-react-component.create-flat",
    (uri: vscode.Uri) => {
      if (uri?.fsPath) {
        createCallback(getResourceDir(uri.fsPath));
      }
    }
  );

  context.subscriptions.push(createNested, createFlat);
}

export function deactivate() {
  vscode.window.showInformationMessage(
    "create-react-component deactivate called"
  );
}
