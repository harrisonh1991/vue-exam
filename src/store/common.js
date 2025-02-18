const state = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  sysTime: null,
}

const mutations = {
  setDeviceType(state, data) {
    state.isMobile = data.isMobile
    state.isTablet = data.isTablet
    state.isDesktop = data.isDesktop
  },
  setSysTime(state, data) {
    state.sysTime = data
  },
}

const actions = {
  updateDeviceType({ commit }) {
    // 設置斷點
    const MOBILE_BREAKPOINT = 768
    const TABLET_BREAKPOINT = 1024

    const checkDevice = () => {
      const width = window.innerWidth
      const deviceInfo = {
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
      }

      commit('setDeviceType', deviceInfo)
    }

    // 初始檢測
    checkDevice()

    // 監聽視窗大小變化
    window.removeEventListener('resize', checkDevice)
    window.addEventListener('resize', checkDevice)
  },
  updateSystemTime({ commit }) {
    const updateTime = () => {
      commit('setSysTime', new Date())
    }
    if (!state.sysTime) {
      updateTime()
      setInterval(updateTime, 1000)
    }
  },
}

const getters = {
  isMobile: (state) => state.isMobile,
  isTablet: (state) => state.isTablet,
  isDesktop: (state) => state.isDesktop,
  sysTime: (state) => state.sysTime,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
