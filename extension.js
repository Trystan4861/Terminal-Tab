const vscode = require('vscode');

const TERMINAL_NAME = 'TTL';
const LEGACY_TERMINAL_NAME = 'TerminalTabLauncher';
let statusBarItem;

function getConfiguredCommand() {
  return vscode.workspace.getConfiguration('terminal-tab-launcher').get('command', 'whoami');
}

function getText(spanish, english) {
  return vscode.env.language.startsWith('es') ? spanish : english;
}

function updateStatusBar() {
  const terminalExists = Boolean(findExistingTerminal());
  statusBarItem.text = `${terminalExists ? '$(terminal-compact)' : '$(play)'} TTL`;

  const command = getConfiguredCommand();
  const tooltip = new vscode.MarkdownString();
  tooltip.isTrusted = true;
  tooltip.supportThemeIcons = true;
  tooltip.appendMarkdown('**Terminal Tab Launcher**\n\n');
  tooltip.appendText(`${command}\n\n`);
  if (terminalExists) {
    tooltip.appendMarkdown(`$(terminal) [${getText('Mostrar terminal', 'Show terminal')}](command:terminal-tab-launcher.show)  \\n`);
    tooltip.appendMarkdown(`$(play) [${getText('Relanzar comando', 'Relaunch command')}](command:terminal-tab-launcher.relaunch)  \\n`);
  } else {
    tooltip.appendMarkdown(`$(play) [${getText('Abrir pestaña', 'Open tab')}](command:terminal-tab-launcher.open)  \\n`);
  }
  tooltip.appendMarkdown(`$(settings-gear) [${getText('Configurar comando', 'Configure command')}](command:terminal-tab-launcher.setCommand)`);
  statusBarItem.tooltip = tooltip;
}

function isManagedTerminal(terminal) {
  return terminal.name === TERMINAL_NAME
    || terminal.name === LEGACY_TERMINAL_NAME
    || terminal.creationOptions?.name === TERMINAL_NAME
    || terminal.creationOptions?.name === LEGACY_TERMINAL_NAME
    || terminal.creationOptions?.env?.TERMINAL_TAB_LAUNCHER === '1';
}

function findExistingTerminal() {
  return vscode.window.terminals.find(isManagedTerminal);
}

function createTerminal(context) {
  return vscode.window.createTerminal({
    name: TERMINAL_NAME,
    location: vscode.TerminalLocation.Editor,
    iconPath: vscode.Uri.joinPath(context.extensionUri, 'icon.png'),
    env: { TERMINAL_TAB_LAUNCHER: '1' }
  });
}

function getOrCreateTerminal(context) {
  return findExistingTerminal() || createTerminal(context);
}

async function openTerminal(context) {
  const managedTerminal = findExistingTerminal();
  if (managedTerminal) {
    managedTerminal.show();
    updateStatusBar();
    return;
  }

  const existingTerminal = vscode.window.activeTerminal || vscode.window.terminals[0];
  if (existingTerminal) {
    const reuse = await vscode.window.showInformationMessage(
      getText(
        '¿Reutilizar la terminal existente?',
        'Reuse the existing terminal?'
      ),
      getText('Sí', 'Yes'),
      getText('No', 'No')
    );
    if (reuse === getText('Sí', 'Yes')) {
      existingTerminal.show();
      updateStatusBar();
      return;
    }
  }

  const newTerminal = createTerminal(context);
  newTerminal.show();
  newTerminal.sendText(getConfiguredCommand(), true);
  updateStatusBar();
}

function showTerminal(context) {
  getOrCreateTerminal(context).show();
  updateStatusBar();
}

function relaunchTerminal(context) {
  const terminal = getOrCreateTerminal(context);
  terminal.show();
  terminal.sendText(getConfiguredCommand(), true);
  updateStatusBar();
}

async function configureCommand() {
  const config = vscode.workspace.getConfiguration('terminal-tab-launcher');
  const newValue = await vscode.window.showInputBox({
    prompt: getText(
      'Comando que se ejecutará al abrir la pestaña de terminal',
      'Command to run when opening the terminal tab'
    ),
    value: config.get('command', 'whoami')
  });
  if (typeof newValue !== 'string') return;
  await vscode.workspace.getConfiguration().update(
    'terminal-tab-launcher.command',
    newValue,
    vscode.ConfigurationTarget.Global
  );
  updateStatusBar();
}

function activate(context) {
  const openCommand = vscode.commands.registerCommand(
    'terminal-tab-launcher.open',
    () => openTerminal(context)
  );
  const showCommand = vscode.commands.registerCommand(
    'terminal-tab-launcher.show',
    () => showTerminal(context)
  );
  const relaunchCommand = vscode.commands.registerCommand(
    'terminal-tab-launcher.relaunch',
    () => relaunchTerminal(context)
  );
  const setCommand = vscode.commands.registerCommand(
    'terminal-tab-launcher.setCommand',
    () => configureCommand()
  );
  const openCommandSettings = vscode.commands.registerCommand(
    'terminal-tab-launcher.openCommandSettings',
    () => vscode.commands.executeCommand(
      'workbench.action.openSettings',
      'terminal-tab-launcher.command'
    )
  );

  context.subscriptions.push(openCommand, showCommand, relaunchCommand, setCommand, openCommandSettings);

  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
  statusBarItem.command = 'terminal-tab-launcher.open';
  updateStatusBar();
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  context.subscriptions.push(vscode.window.onDidOpenTerminal(updateStatusBar));
  context.subscriptions.push(vscode.window.onDidCloseTerminal(updateStatusBar));
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('terminal-tab-launcher.command')) updateStatusBar();
  }));
}

function deactivate() {}

module.exports = { activate, deactivate };
