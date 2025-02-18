import { calculateTimeDifference } from '@/utils/util'

const state = {
  timer: null,
  examData: {},
  questionIndex: 0,
  answers: {},
  info: {
    // 0: 未開始, 1: 進行中, 2: 已完成
    state: null,
    isStart: false,
    isEnd: false,
    timeUnitStart: null,
    timeUnitEnd: null,
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
  setQuestionIndex(state, data) {
    state.questionIndex = data
  },
  setAnswers(state, data) {
    state.answers = data
  },
}

const getters = {
  examData: (state) => state.examData,
  info: (state) => state.info,
  questionIndex: (state) => state.questionIndex,
}

const actions = {
  initExamData({ commit, rootState, state }, examId) {
    if (!examId) return
    const res = {
      code: 200,
      data: {
        // 0: 未開始, 1: 進行中, 2: 已完成
        status: 1,
        id: 'exam_001',
        title: '2025年度測驗',
        description: '本測驗包含選擇題和程式題，總時長120分鐘',
        // 考試多少分鐘
        duration: 120,
        timeStart: '2025-02-18T14:00:00+08:00',
        timeEnd: '2025-02-20T15:30:00+08:00',
        // 開始後才會返回題目
        questions: [
          {
            id: 1,
            type: 'select',
            title: '以下哪個是 JavaScript API的請求類型?',
            score: 5,
            options: [
              { value: 1, label: 'post' },
              { value: 2, label: 'getter' },
              { value: 3, label: 'poster' },
              { value: 4, label: 'hello world' },
            ],
          },
          {
            id: 2,
            type: 'select',
            mutiple: true,
            title: '以下哪個不是 JavaScript 的數據類型？',
            score: 5,
            options: [
              { value: 1, label: 'string' },
              { value: 2, label: 'boolean' },
              { value: 3, label: 'char' },
              { value: 4, label: 'number' },
              { value: 5, label: 'long' },
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
      // 計算考試時間
      if (!state.timer) {
        const checkTime = () => {
          const timeSys = rootState.common.sysTime
          const timeUnitStart = calculateTimeDifference(timeSys, res.data.timeStart)
          state.info.timeUnitStart = timeUnitStart
          const timeUnitEnd = calculateTimeDifference(timeSys, res.data.timeEnd)
          state.info.timeUnitEnd = timeUnitEnd
          state.info.state = timeUnitStart.distance > 0 ? 0 : timeUnitEnd.distance < 0 ? 2 : 1
          commit('setInfo', state.info)
        }
        const timer = setInterval(checkTime, 1000)
        commit('setTimer', timer)
      }
      // 設置考試題目
      commit('setExamData', res.data)

      // 答案初始化
      const answers = {}
      res.data.questions.forEach((q) => {
        answers[q.id] = null
      })
      commit('setAnswers', answers)
    }
  },
  previousQuestion({ commit, state }) {
    const index = Math.max(state.currentIndex - 1, 0)
    commit('setQuestionIndex', index)
  },
  nextQuestion({ commit, state }) {
    const index = Math.max(state.currentIndex + 1, state.examData.questions.length)
    commit('setQuestionIndex', index)
  },
  answerQuestion({ commit, state }, answerId, data) {
    state.answers[answerId] = data
    commit('setAnswers', state.answers)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
