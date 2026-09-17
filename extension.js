const vscode = require('vscode');

const TERMINAL_NAME = 'TTL';
const LEGACY_TERMINAL_NAME = 'TerminalTabLauncher';
let statusBarItem;

function getConfiguredCommand() {
  return vscode.workspace.getConfiguration('terminal-tab-launcher').get('command', 'whoami');
}

function updateStatusBarTooltip() {
  const command = getConfiguredCommand();
  const tooltip = new vscode.MarkdownString();
  tooltip.isTrusted = true;
  tooltip.supportThemeIcons = true;
  tooltip.appendMarkdown('**Terminal Tab Launcher**\n\n');
  tooltip.appendText(`${command}\n\n`);
  tooltip.appendMarkdown('$(terminal) [Mostrar terminal](command:terminal-tab-launcher.show)  \n');
  tooltip.appendMarkdown('$(play) [Relanzar comando](command:terminal-tab-launcher.relaunch)  \n');
  tooltip.appendMarkdown('$(settings-gear) [Configurar comando](command:terminal-tab-launcher.setCommand)');
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
  return vscode.window.terminals.find(isManagedTerminal) || vscode.window.activeTerminal;
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

function openTerminal(context) {
  const terminal = findExistingTerminal();
  if (terminal) {
    terminal.show();
    return;
  }
  const newTerminal = createTerminal(context);
  newTerminal.show();
  newTerminal.sendText(getConfiguredCommand(), true);
}

function showTerminal(context) {
  getOrCreateTerminal(context).show();
}

function relaunchTerminal(context) {
  const terminal = getOrCreateTerminal(context);
  terminal.show();
  terminal.sendText(getConfiguredCommand(), true);
}

async function configureCommand() {
  const config = vscode.workspace.getConfiguration('terminal-tab-launcher');
  const newValue = await vscode.window.showInputBox({
    prompt: 'Comando que se ejecutará al abrir la pestaña de terminal',
    value: config.get('command', 'whoami')
  });
  if (typeof newValue !== 'string') return;
  await vscode.workspace.getConfiguration().update(
    'terminal-tab-launcher.command',
    newValue,
    vscode.ConfigurationTarget.Global
  );
  updateStatusBarTooltip();
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
  statusBarItem.text = '$(terminal-compact) TTL';
  statusBarItem.command = 'terminal-tab-launcher.open';
  updateStatusBarTooltip();
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('terminal-tab-launcher.command')) updateStatusBarTooltip();
  }));
}

function deactivate() {}

module.exports = { activate, deactivate };
