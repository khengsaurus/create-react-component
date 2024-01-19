import { existsSync } from "fs";
import * as vscode from "vscode";
import {
  getCreateBarrelCommand,
  getCreateComponentCommand,
  getCreateFolderCommand,
  getCreateStylesheetCommand,
} from "./commands";
import {
  getResourceDir,
  getStylesheetSuffix,
  getTerminalInstance,
  getYesNo,
  toBoolean,
} from "./util";

function createCallback(path: string) {
  let ts = true;
  let scss = true;
  let mod = true;
  let barrel = false;
  let useComponentFileName = false;
  let componentName = "";
  let componentFileName = "";
  let stylesheetName = "";
  vscode.window
    .showInputBox({ title: "Name of your React component:" })
    .then((_name) => {
      if (!_name?.trim()) {
        throw new Error("Invalid name");
      }
      componentName = _name.charAt(0).toUpperCase() + _name.slice(1);
      const dir = `${path}/${componentName}`;
      if (existsSync(dir)) {
        vscode.window.showInputBox({
          title: `We can't use that name - there's already a directory here called '${componentName}'`,
          placeHolder: "Press enter or escape to exit",
        });
        throw new Error();
      }
    })
    .then(() => getYesNo("Would you like to use TypeScript?"))
    .then((res) => (ts = toBoolean(res)))
    .then(() => getYesNo("How about SCSS?"))
    .then((res) => (scss = toBoolean(res)))
    .then(() => getYesNo("Fancy a CSS module?"))
    .then((res) => (mod = toBoolean(res)))
    .then(() => {
      const suffix = ts ? "tsx" : "jsx";
      return getYesNo(
        `Would you like to name your component file '${componentName}.${suffix}'? If not, 'index.${suffix}' will be used.`
      );
    })
    .then((res) => {
      const suffix = ts ? "tsx" : "jsx";
      useComponentFileName = toBoolean(res);
      componentFileName = useComponentFileName
        ? `${componentName}.${suffix}`
        : `index.${suffix}`;
    })
    .then(() => {
      const suffix = getStylesheetSuffix(mod, scss);
      return getYesNo(
        `Would you like to name your stylesheet 'styles.${suffix}'? If not, '${componentName}.${suffix}' will be used.`
      );
    })
    .then((res) => {
      const suffix = getStylesheetSuffix(mod, scss);
      stylesheetName = toBoolean(res)
        ? `styles.${suffix}`
        : `${componentName}.${suffix}`;
    })
    .then(() =>
      useComponentFileName
        ? getYesNo("Would you like a barrel file?")
        : Promise.resolve("n")
    )
    .then((res) => (barrel = toBoolean(res)))
    .then(() => {
      const terminal = getTerminalInstance();
      const commands = [
        getCreateFolderCommand(path, componentName),
        getCreateStylesheetCommand(path, componentName, stylesheetName),
        getCreateComponentCommand(
          path,
          componentName,
          ts,
          stylesheetName,
          useComponentFileName
        ),
      ];
      commands.forEach((c) => terminal.sendText(c));
      if (barrel) {
        terminal.sendText(getCreateBarrelCommand(path, componentName, ts));
      }
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
