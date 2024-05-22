// controllers/usersController.js
"use strict";

/**
 * Listing 18.9 (p. 268-269)
 * Listing 18.11 (p. 271)
 * userController.js에서 인덱스 액션 생성과 index 액션의 재방문
 */
const User = require("../models/User"); // 사용자 모델 요청

module.exports = {
  /*
   * @TODO: index과 indexView 액션을 객체 리터럴로 묶어 익스포트
   */
    index: (req, res, next) => { //DB Action
        User.find()
            .then((users) => {
                res.locals.users = users; // 응답 객체를 통해 다음 믿들웨어 함수로 사용자 전달
                next();
            })
            .catch(error => {
                console.log(`Error getting users: ${error.message}`);
                next(error); // 에러를 캐치하고 다음 미들웨어로 전달
            })
    },
    indexView: (req, res) => { //Page rendering
        res.render("users/index"); // 분리된 액션으로 뷰 렌더링
    }
};

/**
 * 노트: 구독자 컨트롤러에서 index 액션이 getAllSubscribers를 대체한다. main.js에서 액션 관련
 * 라우트 index를 가리키도록 수정하고 subscribers.ejs를 index.ejs로 변경된 점을 기억하자. 이
 * 뷰는 views 폴더 아래 subscribers 폴더에 있어야 한다.
 */
