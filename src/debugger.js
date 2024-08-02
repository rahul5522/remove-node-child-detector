const defaultOptions = {
  highlightErrorNode: true,
  logErrorNodeToConsole: true,
  showErrorAlerts: false,
};

function highlightElement(element) {
  if (element && element.style) {
    element.style.border = `0.5px solid tomato`;
    element.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
  }
}

function logError(message, ...args) {
  if (console && console.error) {
    console.log(`${message}`, ...args);
  }
}

function showAlert(message) {
  if (typeof window !== "undefined" && window.alert) {
    window.alert(`${message}`);
  }
}

function overrideRemoveChild(options) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (options.logErrorNodeToConsole) {
        logError("Cannot remove a child from a different parent", child, this);
      }
      if (options.showErrorAlerts) {
        showAlert(`Cannot remove a child from a different parent ${child}`);
      }
      if (options.highlightErrorNode) {
        highlightElement(child);
        highlightElement(this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };
}

function overrideInsertBefore(options) {
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (options.logErrorNodeToConsole) {
        logError(
          "Cannot insert before a reference node from a different parent",
          referenceNode,
          this
        );
      }
      if (options.showErrorAlerts) {
        showAlert(
          `Cannot insert before a reference node from a different parent`
        );
      }
      if (options.highlightErrorNode) {
        highlightElement(child);
        highlightElement(this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

function startDebugger(userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };

  if (typeof window === 'undefined' || typeof Node === 'undefined') {
    console.warn('This debugger is intended for browser environments only.');
    return;
  }

  if (typeof Node === "function" && Node.prototype) {
    overrideRemoveChild(options);
    overrideInsertBefore(options);
  } else {
    logError("Node.prototype is not available. Debugging cannot be enabled.");
  }
}

module.exports = startDebugger;
