export const FakeExamData = {
  code: 200,
  data: {
    // 0: 未開始, 1: 進行中, 2: 已完成
    status: 1,
    id: 'exam_001',
    title: '2025年度測驗',
    description: '本測驗包含選擇題和程式題，總時長120分鐘',
    // 考試多少分鐘
    duration: 120,
    timeStart: '2024-01-18T00:00:00+08:00',
    timeEnd: '2026-07-21T18:10:00+08:00',
    // 開始後才會返回題目
    questions: [
      {
        id: 1,
        type: 'radio',
        title: '以下哪個是 JavaScript API的請求類型?',
        score: 5,
        options: [
          { label: 'post', value: 'post' },
          { label: 'getter', value: 'getter' },
          { label: 'poster', value: 'poster' },
          { label: 'hello world', value: 'hello world' },
        ],
      },
      {
        id: 2,
        type: 'checkbox',
        title: '以下哪個不是 JavaScript 的數據類型？',
        score: 5,
        options: [
          { label: 'string', value: 'string' },
          { label: 'boolean', value: 'boolean' },
          { label: 'char', value: 'char' },
          { label: 'number', value: 'number' },
          { label: 'long', value: 'long' },
        ],
      },
      {
        id: 3,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 4,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 5,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 6,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 7,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 8,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 9,
        type: 'input',
        title:
          '請解釋 RESTful API 的主要特點和設計原則請解釋 RESTful API 的主要特點和設計原則請解釋 RESTful API 的主要特點和設計原則請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 10,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
      {
        id: 11,
        type: 'input',
        title: '請解釋 RESTful API 的主要特點和設計原則',
        score: 10,
      },
    ],
  },
}
