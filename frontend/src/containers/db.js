const userExamples = [
  { username: 'guest', account: 'guest', password: 'guest', tags: ['235813'] }, 
  { username: 'chaoting', account: 'chaoting', password: 'chaotingpw' }, 
  { username: 'Kerwin', account: 'Kerwin', password: 'kerwinpw' }, 
  { username: '蓁蓁', account: '蓁蓁', password: 'truetruepw' }, 
]

const postExamples = [{
  postId: 0,
  title: "我要find my boss",
  posterName: "guest",
  className: "中華民國憲法與政府",
  teacherName: "丁肇中",
  classNo: "235813",
  deadline: "2022/12/01",
  condition: 2,
  content: "來喔來喔來杯灰喔",
  leftMembersRequired: 6,
  tags: ["會寫字", "會來上課"]
}, {
  postId: 1,
  title: "徵求網服大腿",
  posterName: "chaoting",
  className: "網路服務程式設計",
  teacherName: "Ric",
  classNo: "235812",
  deadline: "2022/12/01",
  condition: 2,
  content: "拜託快跟我組隊求求你",
  leftMembersRequired: 1,
  tags: ["會用yarn add", "會用npm install"]
}, {
  postId: 2,
  title: "徵求我的小弟",
  posterName: "Kerwin",
  className: "網路服務程式設計",
  teacherName: "Ric",
  classNo: "235812",
  deadline: "2022/12/01",
  condition: 2,
  content: "會寫前端的快來找我，我很會後端",
  leftMembersRequired: 2,
  tags: ["會寫後端", "程信鵝肉飯點到200塊", "經濟系卷哥"]
}, {
  postId: 3,
  title: "徵求資結演算法partner",
  posterName: "蓁蓁",
  className: "資料結構與演算法",
  teacherName: "陳縕儂",
  classNo: "235812",
  deadline: "2022/11/11",
  condition: 5,
  content: "這堂課太硬了來找人一起寫作業",
  leftMembersRequired: 4,
  tags: ["會寫form", "又會寫navigate", "還會separate router"]
},
]

export { userExamples, postExamples }