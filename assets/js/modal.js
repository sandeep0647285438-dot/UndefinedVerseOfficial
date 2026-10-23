
/**
 * UNDEFINEDVERSEOFFICIAL
 * Accessible modal controller
 * File: assets/js/modal.js
 */

export function initModals() {
  const dialogs = document.querySelectorAll(
    "dialog[data-uv-modal]"
  );

  const cleanupFunctions = [];

  dialogs.forEach((dialog) => {
    if (!(dialog instanceof HTMLDialogElement)) {
      return;
    }

    const closeButtons = dialog.querySelectorAll(
      "[data-modal-close]"
    );

    let previousFocus = null;

    function handleCloseButton(event) {
      event.preventDefault();
      dialog.close();
    }

    function handleDialogClose() {
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus();
      }

      previousFocus = null;
    }

    function handleDialogClick(event) {
      // Close only when the backdrop itself is clicked.
      if (event.target === dialog) {
        dialog.close();
      }
    }

    function openDialog(trigger) {
      if (dialog.open) {
        return;
      }

      previousFocus =
        trigger instanceof HTMLElement
          ? trigger
          : document.activeElement;

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    }

    closeButtons.forEach((button) => {
      button.addEventListener("click", handleCloseButton);
    });

    dialog.addEventListener("close", handleDialogClose);
    dialog.addEventListener("click", handleDialogClick);

    const triggers = document.querySelectorAll(
      `[data-modal-open="${CSS.escape(dialog.id)}"]`
    );

    function handleTriggerClick(event) {
      event.preventDefault();
      openDialog(event.currentTarget);
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", handleTriggerClick);
    });

    cleanupFunctions.push(() => {
      closeButtons.forEach((button) => {
        button.removeEventListener("click", handleCloseButton);
      });

      dialog.removeEventListener("close", handleDialogClose);
      dialog.removeEventListener("click", handleDialogClick);

      triggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleTriggerClick);
      });

      if (dialog.open) {
        dialog.close();
      }
    });
  });

  return function destroyModals() {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}
