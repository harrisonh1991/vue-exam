import { calculateTimeDifference } from '@/utils/util'
import { EXAM_STATE } from '@/utils/states'
import { FakeExamData } from '@/data/exam'

const state = {
  // 考試開始時倒數
  timer: null,
  // API 返回的考試資料
  examData: null,
  // 當前題目
  currentQuestion: null,
  // 題目索引
  questionIndex: null,
  // 回答列表
  answers: null,
  // 當前題目回答
  answer: null,
  // 是否還有下一題
  hasNext: false,
  // 是否還有上一題
  hasPrevious: false,
  // 考試相關資訊
  info: {
    // 考試狀態: 0: 未開始, 1: 進行中, 2: 已完成
    state: null,
    // 是否開始
    isStart: false,
    // 是否結束
    isEnd: false,
    // 考試開始時間
    timeUnitStart: null,
    // 考試結束時間
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
    state.currentQuestion = state.examData.questions[data]
    state.answer = state.answers[state.currentQuestion.id]
    console.log('currentQuestion', state.currentQuestion)
    console.log('answer', state.answer)
    state.hasPrevious = data > 0
    state.hasNext = data < state.examData.questions.length
  },
  setAnswer(state, obj) {
    if (obj.datas) {
      state.answers = obj.datas
    } else if (obj.data) {
      state.answers[state.questionIndex] = obj.data
    }
    state.answer = state.answers[state.questionIndex]
  },
}

const getters = {
  examData: (state) => state.examData,
  info: (state) => state.info,
  questionIndex: (state) => state.questionIndex,
  answer: (state) => state.answer,
  hasNext: (state) => state.hasNext,
  hasPrevious: (state) => state.hasPrevious,
  answerValidList: (state) => {
    const questions = state.examData.questions
    return questions.map((question, index) => {
      const id = question.id
      let isValid = false
      if (/checkbox/.test(question.type)) {
        isValid = state.answers[id]?.length > 0
      } else {
        isValid = state.answers[id] !== null
      }
      return { title: question.title, id, isValid, index }
    })
  },
}

const actions = {
  async initExamData({ commit, rootState, state }, examId) {
    if (!examId) return
    const res = await FakeExamData
    if (res.code === 200) {
      // 計算考試時間
      const checkTime = () => {
        const timeSys = rootState.common.sysTime
        const timeUnitStart = calculateTimeDifference(timeSys, res.data.timeStart)
        state.info.timeUnitStart = timeUnitStart
        const timeUnitEnd = calculateTimeDifference(timeSys, res.data.timeEnd)
        state.info.timeUnitEnd = timeUnitEnd
        // 考試狀態: 0: 未開始, 1: 進行中, 2: 已完成
        state.info.state =
          timeUnitStart.distance > 0
            ? EXAM_STATE.NOT_STARTED
            : timeUnitEnd.distance < 0
              ? EXAM_STATE.FINISHED
              : EXAM_STATE.IN_PROGRESS
        commit('setInfo', state.info)
        if (state.info.state === EXAM_STATE.FINISHED) {
          clearInterval(state.timer)
        }
      }
      checkTime()
      if (!state.timer && state.info.state !== EXAM_STATE.FINISHED) {
        const timer = setInterval(checkTime, 1000)
        commit('setTimer', timer)
      }
      // 設置考試題目
      commit('setExamData', res.data)

      // 答案初始化
      let answers = {}
      res.data.questions.forEach((question) => {
        answers[question.id] = null
      })
      // 提取已提交的答案，沒有 api 暫時使用 sessionStorage 代替
      let answers2 = sessionStorage.getItem(`exam-${res.data.id}`)
      if (answers2) {
        answers2 = JSON.parse(answers2)
        answers = { ...answers, ...answers2 }
      }
      commit('setAnswer', { datas: answers })
      commit('setQuestionIndex', 0)
    }
  },
  setQuestionIndex({ commit }, data) {
    commit('setQuestionIndex', data)
  },
  previousQuestion({ commit, state }) {
    const index = Math.max(state.questionIndex - 1, 0)
    commit('setQuestionIndex', index)
  },
  nextQuestion({ commit, state }) {
    const index = Math.min(state.questionIndex + 1, state.examData.questions.length)
    commit('setQuestionIndex', index)
  },
  answerQuestion({ commit, state }, data) {
    const answer2 = state.answers
    commit('setAnswer', { data })
    sessionStorage.setItem(`exam-${state.examData.id}`, JSON.stringify(answer2))
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
