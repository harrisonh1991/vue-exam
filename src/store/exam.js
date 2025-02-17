import { calculateTimeDifference } from '@/utils/util'

const state = {
  timer: null,
  examData: {},
  info: {
    // 0: 未開始, 1: 進行中, 2: 已完成
    state: -1,
    isStart: false,
    isEnd: false,
    timeStart: null,
    timeEnd: null,
  },
}

const mutations = {
  setExamData(state, data) {
    state.examData = data
  },
  setInfo(state, data) {
    state.info = data
  },
  setTimer(state, data) {
    state.timer = data
  },
}

const getters = {
  examData: (state) => state.examData,
  info: (state) => state.info,
}

const actions = {
  initExamData({ commit, rootState, state }, examId) {
    if (!examId) return
    const res = {
      code: 200,
      data: {
        // 0: 未開始, 1: 進行中, 2: 已完成
        status: 0,
        id: 'exam_001',
        title: '2025年度測驗',
        description: '本測驗包含選擇題和程式題，總時長120分鐘',
        // 考試多少分鐘
        duration: 120,
        startTime: '2025-03-20T09:00:00+08:00',
        endTime: '2025-23-23T17:10:00+08:00',
        // 開始後才會返回題目
        questions: [
          {
            id: 1,
            type: 'select',
            title: '以下哪個是 JavaScript API的請求類型?',
            score: 5,
            options: [
              { id: 1, label: 'post' },
              { id: 2, label: 'getter' },
              { id: 3, label: 'poster' },
              { id: 4, label: 'hello world' },
            ],
          },
          {
            id: 2,
            type: 'select',
            mutiple: true,
            title: '以下哪個不是 JavaScript 的數據類型？',
            score: 5,
            options: [
              { id: 1, label: 'string' },
              { id: 2, label: 'boolean' },
              { id: 3, label: 'char' },
              { id: 4, label: 'number' },
              { id: 5, label: 'long' },
            ],
          },
          {
            id: 3,
            type: 'input',
            content: '請解釋 RESTful API 的主要特點和設計原則。',
            score: 10,
          },
        ],
      },
    }
    if (res.code === 200) {
      if (!state.timer) {
        const checkTime = () => {
          const timeSys = rootState.common.sysTime
          const timeStart = calculateTimeDifference(timeSys, res.data.startTime)
          state.info.timeStart = timeStart
          const timeEnd = calculateTimeDifference(timeSys, res.data.endTime)
          state.info.timeEnd = timeEnd
          state.info.state = timeStart.distance > 0 ? 0 : timeEnd.distance < 0 ? 2 : 1
          commit('setInfo', state.info)
        }
        const timer = setInterval(checkTime, 1000)
        commit('setTimer', timer)
      }

      commit('setExamData', res.data)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
