import { createStore } from 'vuex'
import common from './common'
import exam from './exam'

export default createStore({
  modules: {
    common,
    exam,
  },
})
