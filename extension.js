const vscode = require('vscode');

let statusBarItem;

/**
 * Obtiene el comando configurado (default: whoami)
 */
function getConfiguredCommand() {
  const config = vscode.workspace.getConfiguration('terminal-tab-launcher');
  return config.get('command', 'whoami');
}

/**
 * Actualiza el tooltip del status bar
 */
function updateStatusBarTooltip() {
  const command = getConfiguredCommand();
  statusBarItem.tooltip = `Terminal Tab Launcher: ${command}`;
}

/**
 * Busca un terminal existente llamado "TerminalTabLauncher"
 */
function findExistingTerminal() {
  return vscode.window.terminals.find(
    t => t.name === 'TerminalTabLauncher'
  );
}

/**
 * Abre (o reutiliza) el terminal y ejecuta el comando configurado
 */
function openTerminal(context) {
  let terminal = findExistingTerminal();

  if (terminal) {
    terminal.show();
  } else {
    terminal = vscode.window.createTerminal({
      name: 'TerminalTabLauncher',
      location: vscode.TerminalLocation.Editor,
      iconPath: vscode.Uri.joinPath(context.extensionUri, 'icon.png'),
    });
    terminal.show();
  }

  terminal.sendText(getConfiguredCommand());
}

/**
 * Activación de la extensión
 */
function activate(context) {

  // Comando principal
  const openCommand = vscode.commands.registerCommand(
    'terminal-tab-launcher.open',
    () => openTerminal(context)
  );

  // Comando: establecer comando
  const setCommand = vscode.commands.registerCommand(
    'terminal-tab-launcher.setCommand',
    async () => {
      const config = vscode.workspace.getConfiguration('terminal-tab-launcher');
      const currentValue = config.get('command', 'whoami');

      const newValue = await vscode.window.showInputBox({
        prompt: 'Enter the command to execute',
        value: currentValue
      });

      if (typeof newValue === 'string') {
        await vscode.workspace.getConfiguration().update(
          'terminal-tab-launcher.command',
          newValue,
          vscode.ConfigurationTarget.Global
        );
        updateStatusBarTooltip();
      }
    }
  );

  // Comando: abrir configuración exacta del setting
  const openCommandSettings = vscode.commands.registerCommand(
    'terminal-tab-launcher.openCommandSettings',
    () => {
      vscode.commands.executeCommand(
        'workbench.action.openSettings',
        'terminal-tab-launcher.command'
      );
    }
  );

  context.subscriptions.push(openCommand);
  context.subscriptions.push(setCommand);
  context.subscriptions.push(openCommandSettings);

  // Status bar
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000
  );

  statusBarItem.text = '$(terminal-compact) TTL';
  statusBarItem.command = 'terminal-tab-launcher.open';
  updateStatusBarTooltip();
  statusBarItem.show();

  context.subscriptions.push(statusBarItem);

  // Escuchar cambios en configuración
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('terminal-tab-launcher.command')) {
        updateStatusBarTooltip();
      }
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
