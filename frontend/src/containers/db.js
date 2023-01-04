const userExamples = [
  { name: 'guest', account: 'guest', password: 'guest', tags: ['1651', '5114'] }, 
  { name: 'chaoting', account: 'chaoting', password: 'chaoting', tags: ['155', '651'] }, 
  { name: 'kerwin', account: 'kerwin', password: 'kerwin', tags: ['7878'] }, 
  { name: 'jenjen', account: 'jenjen', password: 'jenjen', tags: ['515'] }, 
]

// 送到postLayout
// title,
// classNo,
// className,
// teacherName,
// condition, content,
// endDate: deadline.split(' ')[0],
// endTime: deadline.split(' ')[1],

// 儲存時
// postId, 
// title, 
// classNo,
// className,
// teacherName,
// content,
// condition,
// deadline,
// tag


const postExamples = [{
  _id: 0,
  author: { 
    name: "guest",
    account: "guest"
  },
  title: "我要find my boss",
  classNo: "235813",
  className: "中華民國憲法與政府",
  teacherName: "丁肇中",
  content: "來喔來喔來杯灰喔",
  condition: 2,
  deadline: "2022-12-01 09:00",
  tags: ["會寫字", "會來上課"]
}, {
  _id: 1,
  author: { 
    name: "chaoting",
    account: "chaoting"
  },
  title: "徵求網服大腿",
  classNo: "235812",
  className: "網路服務程式設計",
  teacherName: "Ric",
  content: "拜託快跟我組隊求求你",
  condition: 2,
  deadline: "2022-12-01 19:00",
  tags: ["會用yarn add", "會用npm install"]
}, {
  _id: 2,
  author: { 
    name: "kerwin",
    account: "kerwin"
  },
  title: "徵求我的小弟",
  classNo: "235812",
  className: "網路服務程式設計",
  teacherName: "Ric",
  content: "會寫前端的快來找我，我很會後端",
  condition: 2,
  deadline: "2022-12-01 20:00",
  tags: ["會寫後端", "程信鵝肉飯點到200塊", "經濟系卷哥"]
}, {
  _id: 3,
  author: { 
    name: "jenjen",
    account: "jenjen"
  },
  title: "徵求資結演算法partner",
  className: "資料結構與演算法",
  teacherName: "陳縕儂",
  classNo: "235812",
  content: "這堂課太硬了來找人一起寫作業",
  condition: 5,
  deadline: "2022-11-11 23:59",
  tags: ["會寫form", "又會寫navigate", "還會separate router"]
},
]

export { userExamples, postExamples }