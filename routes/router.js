const express = require('express');
const router = express.Router();
const conn = require('../config/dbtest');
const path = require('path')


//메인경로
router.get('/',  (req,res)=>{
    console.log("누군가 메인페이지에 접근했습니다!")
    //safetybrain를 만들고 리액트-노드 연결
    //build폴더에 있는 html파일을 sendFile
    res.sendFile(path.join(__dirname,"..","safetybrain","build","index.html"))
})

// 회원가입을 담당하는 경로(기능)
router.post('/handlejoin', async (req,res)=> {
    console.log('누군가 회원가입을 희망합니다.', req.body)

    let {id, pw, name, comp, phone} = req.body ;

    // 1. 회원가입을 할 수 있는 쿼리문 작성 - sql
    let sql =
    `insert into TB_MANAGER values('${id}','${pw}','${name}','${comp}','${phone}','5')`
    //★★★★★★★★★★★★★★★★★★★★comp는 4글자까지만!!★★★★★★★★★★★★★★★★★★

    // 2. DB에 연결해서 쿼리문을 실행
    try {
        const connection = await conn();
        // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.
        
        // 예: 간단한 쿼리 실행
        const result = await connection.execute(sql,[],{autoCommit: true});
        res.json({result : "success"})
        
        
        // 연결 해제
        await connection.close();
    } catch (error) {
        res.json({result : "failed"})
        console.error('데이터베이스 작업 중 오류가 발생했습니다:', error);
    }
})

// 로그인을 담당하는 경로(기능)
router.post('/handlelogin', async (req,res)=> {
    console.log('누군가 회원가입을 희망합니다22.', req.body)

    let {id, pw} = req.body ;
    let sql =
    `select MGR_ID ,MGR_NAME from TB_MANAGER where MGR_ID='${id}' and MGR_PW='${pw}'`
    console.log("로그인 실행!!")
        const connection = await conn();
        // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.
        
        // 예: 간단한 쿼리 실행
        const result = await connection.execute(sql,[],{autoCommit: true});

        console.log('몇줄/', result.rows.length)
        console.log('데이터/', result.rows)
        console.log('result/', result)
        console.log('아이디/', result.rows[0][0])
        console.log('이름/', result.rows[0][1])

        if(result.rows.length > 0) {
        //  res.json(result.rows[0])
            res.json({result : 'success', id : result.rows[0][0], name : result.rows[0][1] })
           // res.json({id : 'success'})
            // res.json({id : result.rows[0][0]})
            // res.json({password : result.rows[0][1]})
        }else{
            res.json({result : 'failed'})
        }
        // 연결 해제
        await connection.close();
})

// 안전모착용여부 현황 경로(기능)
router.post('/handlerefresh', async (req,res)=> {
    console.log("새로고침", req.body)

    let {helmet_n} = req.body ;
    // 벗는 시간 추가!!
    let sql = 'select EMP_ID, SAFETY_WEAR, WEAR_TIME, OFF_TIME from TB_SAFETY'  
    
    // let sql = 'select HELMET_SAFETY_N from TB_HELMET'  

    const connection = await conn();
    // 이제 connection 객체를 사용하여 데이터베이스 작업을 수행할 수 있습니다.
    
    // 예: 간단한 쿼리 실행
    const result = await connection.execute(sql,[],{autoCommit: true});

    console.log('result/', result)
    res.json({result : result})

    // 연결 해제
    await connection.close();
})


module.exports = router;





















// 2. DB에 연결해서 쿼리문을 실행
// conn.query(sql, [id, pw, nick], (err,rows)=>{
//     if(rows.affectedRows > 0){
//         // 가입 성공
//         res.json({result : "success"})
//     } else {
//         // 가입 실패
//         res.json({result : "failed"})
//     }
// })