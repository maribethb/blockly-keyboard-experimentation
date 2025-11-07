/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {ShortcutRegistry, utils} from 'blockly/core';
import * as Constants from '../constants';

/**
 * Class for registering shortcuts that give the user context
 * about the currently focused block, such as reading its text
 * or reading the text of all parent blocks.
 */
export class WhereAmIAction {

  currentBlockAction: ShortcutRegistry.KeyboardShortcut = {
    name: Constants.SHORTCUT_NAMES.READ_CURRENT_BLOCK,
    preconditionFn: (workspace, scope) => {
      return true;
    },
    callback: (workspace, e, shortcut, scope) => {
      if (!scope.focusedNode) return false;
      const block = workspace.getCursor().getSourceBlockFromNode(scope.focusedNode);
      if (!block) return false;
      utils.aria.announceDynamicAriaState((block as any).computeAriaLabel());
      return true;
    },
    keyCodes: [utils.KeyCodes.I],
  }

  install() {
    ShortcutRegistry.registry.register(this.currentBlockAction);
  }

  uninstall() {
    ShortcutRegistry.registry.unregister(Constants.SHORTCUT_NAMES.READ_CURRENT_BLOCK);
  }

}