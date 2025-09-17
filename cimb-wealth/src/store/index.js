import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    login: (state, action) => { state.user = action.payload },
    logout: (state) => { state.user = null },
    updateRisk: (state, action) => { if (state.user) state.user.risk = action.payload },
  },
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { items: [] },
  reducers: {
    push: (state, action) => { state.items.unshift({ id: Date.now(), ...action.payload }) },
    remove: (state, action) => { state.items = state.items.filter(n => n.id !== action.payload) },
    clear: (state) => { state.items = [] },
  }
})

export const { login, logout, updateRisk } = authSlice.actions
export const { push, remove, clear } = notificationsSlice.actions

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarCollapsed: (typeof window !== 'undefined' && localStorage.getItem('sidebar_collapsed') === 'true') },
  reducers: {
    toggleSidebar: (state) => { 
      state.sidebarCollapsed = !state.sidebarCollapsed
      if (typeof window !== 'undefined') localStorage.setItem('sidebar_collapsed', String(state.sidebarCollapsed))
    },
    setSidebar: (state, action) => {
      state.sidebarCollapsed = !!action.payload
      if (typeof window !== 'undefined') localStorage.setItem('sidebar_collapsed', String(state.sidebarCollapsed))
    }
  }
})

export const { toggleSidebar, setSidebar } = uiSlice.actions

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
    ui: uiSlice.reducer,
  }
})


