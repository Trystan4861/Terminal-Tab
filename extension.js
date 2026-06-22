const vscode = require('vscode');

let statusBarItem;

/**
 * Obtiene el comando configurado (default: whoami)
 */
function getConfiguredCommand() {
  const config = vscode.workspace.getConfiguration('terminal-tab');
  return config.get('command', 'whoami');
}

/**
 * Actualiza el tooltip del status bar
 */
function updateStatusBarTooltip() {
  const command = getConfiguredCommand();
  statusBarItem.tooltip = `Terminal Tab: ${command}`;
}

/**
 * Busca un terminal existente llamado "TerminalTab"
 */
function findExistingTerminal() {
  return vscode.window.terminals.find(t => t.name === 'TerminalTab');
}

/**
 * Abre (o reutiliza) el terminal TerminalTab y ejecuta el comando configurado
 */
function openTerminalTab(context) {
  let terminal = findExistingTerminal();

  if (terminal) {
    terminal.show();
    return;
  }

  terminal = vscode.window.createTerminal({
    name: 'TerminalTab',
    location: vscode.TerminalLocation.Editor,
    iconPath: vscode.Uri.joinPath(context.extensionUri, 'icon.png'),
  });

  terminal.show();
  terminal.sendText(getConfiguredCommand());
}

/**
 * Activación de la extensión
 */
function activate(context) {

  // Registrar comando principal
  const openCommand = vscode.commands.registerCommand(
    'terminal-tab.open',
    () => openTerminalTab(context)
  );

  // Comando: establecer comando
  const setCommand = vscode.commands.registerCommand(
    'terminal-tab.setCommand',
    async () => {
      const config = vscode.workspace.getConfiguration('terminal-tab');
      const currentValue = config.get('command', 'whoami');

      const newValue = await vscode.window.showInputBox({
        prompt: 'Enter the command to execute',
        value: currentValue
      });

      if (typeof newValue === 'string') {
        await vscode.workspace.getConfiguration().update(
          'terminal-tab.command',
          newValue,
          vscode.ConfigurationTarget.Global
        );
        updateStatusBarTooltip();
      }
    }
  );

  // Comando: abrir configuración exacta del setting
  const openCommandSettings = vscode.commands.registerCommand(
    'terminal-tab.openCommandSettings',
    () => {
      vscode.commands.executeCommand(
        'workbench.action.openSettings',
        'terminal-tab.command'
      );
    }
  );

  context.subscriptions.push(openCommand);
  context.subscriptions.push(setCommand);
  context.subscriptions.push(openCommandSettings);

  // Botón en barra de estado
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000
  );

  statusBarItem.text = '$(terminal-compact) TerminalTab';
  statusBarItem.command = 'terminal-tab.open';
  updateStatusBarTooltip();
  statusBarItem.show();

  context.subscriptions.push(statusBarItem);

  // Escuchar cambios en configuración
  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('terminal-tab.command')) {
      updateStatusBarTooltip();
    }
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
