import { injectable } from 'inversify';
import { store } from '../state';
import { setGroupState } from '../state/groups.slice';
import { setSwitcherState } from '../state/switchers.slice';

@injectable()
export class SharingService {
  /**
   * Create a string representation of the config
   */
  getExportToken(): string {
    const state = store.getState();
    const cleanState = { ...state, masterPassword: undefined };

    return btoa(JSON.stringify(cleanState));
  }

  /**
   * Get the export URL for the current config
   */
  getExportUrl(): string {
    const token = this.getExportToken();
    const exportUrl = new URL(window.location.href);
    exportUrl.hash = token;

    return exportUrl.href;
  }

  /**
   * Import a config based on the current URL
   */
  import(): void {
    const token = window.location.hash.slice(1);
    const state: ReturnType<typeof store.getState> = JSON.parse(atob(token));

    store.dispatch(setGroupState(state.group));
    store.dispatch(setSwitcherState(state.switcher));
  }
}
