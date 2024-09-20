'use babel';

import { exec } from 'child_process';
import { CompositeDisposable } from 'atom';
import path from 'path';

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register the command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'show-in-explorer-plus:show-in-explorer-plus': () => this.showInExplorerPlus()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  showInExplorerPlus() {
    const activePaneItem = atom.workspace.getActivePaneItem();
    if (activePaneItem && activePaneItem.selectedPath) {
      const selectedDirPath = activePaneItem.selectedPath;
      console.log(`Selected Directory Path: ${selectedDirPath}`);  // Debug log
      // Execute the command to open cmd.exe with the selected directory
      const cmd = `start explorer.exe "${path.resolve(selectedDirPath)}"`;
      exec(cmd, (error) => {
        if (error) {
          atom.notifications.addError('Failed to open explorer+ ', { detail: error.message });
        }
      });
    } else {
      console.log('No directory selected ' , activePaneItem);  // Debug log
      atom.notifications.addWarning('No directory selected');
    }
  }
};
