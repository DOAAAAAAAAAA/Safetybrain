
/* app.js와 동일 -> 리액트와 같으므로 server.js라고 쓰는거임 */

//첫번째
const express = require('express');
// const conn = require("./config/db")
const app = express();
//router만들고
const router = require('./routes/router')
//react-project만들고 설정 path를 누르면 localhost3000에 app.js에 적은 글자가 화면에 나옴
const path = require('path')

//CORS 오류를 방지하기 위한 모듈 -> cors를 설치
// npm i cors
const cors = require('cors')
app.use(cors())

// 넘어온 데이터 사용(post방식)
app.use(express.urlencoded({extended : true}))

//넘어온 데이터를 json형태로 사용
app.use(express.json())

/** project Tip
 * 1) CORS 오류 -> cors설정안한거
 * 2) 데이터는 넘어오는데 undefined? -> rlencoded설정
 * 3) undefined은 아닌데 텅빈채로 => json처리
 * 4) 정말로 다 썼는데
 */


//const path = require('path')와 세트 "express static폴더지정"
app.use(express.static(path.join(__dirname,"safetybrain","build")))
app.set('port', process.env.PORT || 3000);


app.use(router)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'waiting...')
});


// app.get("/",(req,res)=>{
//     console.log("메인 페이지 연결")
// })

