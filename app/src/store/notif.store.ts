import { defineStore } from "pinia";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * Boolean flag to show or hide snack bar
   */
  showSnackbar: boolean;

  /**
   * String message to display on snack bar when shown
   */
  snackBarMessage: string;
}

/**
 * Use this 'store' to manage in app local notifications
 */
export const useNotif = defineStore("notif", {
  state: (): State => ({ showSnackbar: false, snackBarMessage: "" }),

  actions: {
    /**
     * Display a snack bar
     */
    setSnackbar(message: string, timeout = 5000) {
      this.showSnackbar = true;
      this.snackBarMessage = message;

      setTimeout(() => {
        this.showSnackbar = false;
      }, timeout);
    },

    hideSnackbar() {
      this.showSnackbar = false;
    },
  },
});
