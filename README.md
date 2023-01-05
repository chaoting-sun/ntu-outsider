# wp1111 Project - NTU-Outsider

## Introduction
NTU OUTSIDER 是一個方便邊緣人尋找組員的平台，主要用途是讓使用者透過發文輕鬆地找到適合的組員。平台上的文章無論是否註冊都能夠閱覽，唯註冊後的使用者才可以使用其他功能，如發布文章、傳送訊息、追蹤貼文等。點選側邊欄的「新增貼文」後跳出內文填寫的頁面，於內文中填入所修的課程名稱、授課教師以及尋找組員的需求等項目，還可以在文章中新增 tag 簡短表達貼文的重點，其他使用者也可以透過 tag 的搜尋更方便尋找相關貼文，除了搜尋 tag 外，也能夠以標題、授課教師、課程名稱搜尋貼文。而瀏覽貼文後，使用者可以直接點擊貼文者的名字傳訊息給發文者，開啟聊天室進一步聯繫確認組隊意圖。若使用者看到了貼文，卻還不確定是否要聯繫對方，則可以先把貼文加入追蹤清單，未來再由側邊欄檢視自己追蹤中的貼文，也能在側邊欄找到曾經發過的貼文，以利進行內文的更新。這個平台的發想嘗試幫助學生更快速、方便地找到適合的組員，提升媒合效率、加速確認彼此需求。

## 使用框架
+ frontend: React、antd、bcryptjs、apollo GraphQL client
+ backend: GraphQL、Mongoose
+ DB: MongoDB
+ deployment: Railway
## You may need to install something
#### frontend
```bash
yarn
```

#### backend

## Setup Tutorial

1. Git clone in your local repository
```bash
git clone git@github.com:chaoting-sun/ntu-outsider.git
```

2. Install the packages in frontend/backend folder 
```bash
yarn/npm install
```

3. Start the frontend service
```bash
yarn start
```

4. Start the backend service
```bash
yarn server
```