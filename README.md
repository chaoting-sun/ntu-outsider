# NTU-wp1111 Project: NTU-Outsider
NTU OUTSIDER 是一個幫助學生尋找組員的平台，使用者可以透過發文找到適合的組員。平台提供註冊後的使用者更多功能，包括發布文章、傳送訊息、追蹤貼文等，並可以透過搜尋 tag、標題、授課教師、課程名稱等方式尋找貼文。使用者可以直接點擊貼文者的名字傳訊息給發文者，開啟聊天室進一步聯繫，也能在側邊欄找到曾經發過的貼文，方便進行內文的更新。這個平台旨在提高媒合效率、加速確認彼此需求。

# 開始使用
1. 確保已經安裝Node.js

2. clone 此專案到本地：
```js
git clone git@github.com:chaoting-sun/ntu-outsider.git
```

3. 進入 frontend/backend 目錄並安裝依賴：
```js
cd backend;npm install
cd ..
cd frontend;npm install
```

4. 在 backend 目錄底下創建 `.env` ，並在其中添加你的 MongoDB 的 URL：
```js
MONGO_URL=your_mongo_url
```

5. 在 ntu-outsider 底下啟動應用：
```js
npm start // start frontend 
npm server // start backend in another terminal
```

6. 在瀏覽器訪問 http://localhost:3000。

## 使用框架
- 前端：React、Apollo GraphQL client
- 後端：GraphQL
- 資料庫：MongoDB

## 功能
- 可以註冊、編輯個人資訊。
- 可以新增貼文，並觀看全部貼文、追蹤貼文和我的貼文。
- 可以透過關鍵字查尋貼文。
- 可以私下一對一聊天媒合組員。

## 作者
- 孫肇廷：前端、部分後端
- 呂蓁蓁：前端、UI 設計
- 林哲暐：後端