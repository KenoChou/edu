import {
  createDefaultState,
  LOGIN_STATUS,
  ROLE_TYPES,
  STORAGE_KEYS
} from './state.js';

const listeners = [];

function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

const store = {
  state: createDefaultState(),

  init() {
    const token = wx.getStorageSync(STORAGE_KEYS.TOKEN) || '';
    const roleType = wx.getStorageSync(STORAGE_KEYS.ROLE_TYPE);
    const userProfile = wx.getStorageSync(STORAGE_KEYS.USER_PROFILE);

    this.state = createDefaultState();
    this.state.session.token = token;
    this.state.session.loginStatus = token
      ? LOGIN_STATUS.LOGGED_IN
      : LOGIN_STATUS.IDLE;

    if (roleType !== '' && roleType !== undefined) {
      this.state.session.roleType = Number(roleType);
    } else {
      this.state.session.roleType = ROLE_TYPES.PARENT;
    }

    if (userProfile) {
      this.state.userProfile = {
        ...this.state.userProfile,
        ...userProfile
      };
    }

    this.emit();
  },

  getState() {
    return cloneState(this.state);
  },

  setState(updater) {
    const nextState =
      typeof updater === 'function' ? updater(this.getState()) : updater;

    this.state = {
      ...this.state,
      ...nextState,
      session: {
        ...this.state.session,
        ...(nextState.session || {})
      },
      userProfile: {
        ...this.state.userProfile,
        ...(nextState.userProfile || {})
      }
    };

    this.persist();
    this.emit();
  },

  setSession(payload = {}) {
    this.setState({ session: payload });
  },

  setUserProfile(payload = {}) {
    this.setState({ userProfile: payload });
  },

  setOrders(orders = []) {
    this.setState({ orders: Array.isArray(orders) ? orders : [] });
  },

  clearSession() {
    this.setState({
      session: {
        token: '',
        loginStatus: LOGIN_STATUS.IDLE,
        roleType: ROLE_TYPES.PARENT
      }
    });
  },

  persist() {
    const { session, userProfile } = this.state;

    if (session.token) {
      wx.setStorageSync(STORAGE_KEYS.TOKEN, session.token);
    } else {
      wx.removeStorageSync(STORAGE_KEYS.TOKEN);
    }

    wx.setStorageSync(STORAGE_KEYS.ROLE_TYPE, session.roleType);
    wx.setStorageSync(STORAGE_KEYS.USER_PROFILE, userProfile);
  },

  subscribe(listener) {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  },

  emit() {
    const snapshot = this.getState();
    listeners.forEach((listener) => {
      listener(snapshot);
    });
  }
};

export default store;
