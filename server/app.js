const express=require('express');
const mysql = require('mysql');

const app=express();
app.listen('3110');

const pool  = mysql.createPool({
    database: 'kursach',
    host: "127.0.0.1",
    user: "root",
    password: "qwerty"
});
console.log('start');




const addUser = (data) =>{
    return new Promise((resolve, reject) => {
        const {login,password} =data;
        const query = pool.query(`INSERT INTO users(login,password) values(${pool.escape(login)},${pool.escape(password)})`, (err) => {
            if (err) {
                console.log('addUser-');
                reject(err);
            }
            else
            {
                console.log('addUser+');
                resolve({...data})
            }
        });
    });
};

const deleteUser = (data)=>{
    return new Promise((resolve, reject) => {
        const {login,password} =data;
        const query = pool.query(`DELETE FROM users WHERE login = ${pool.escape(login)} AND password = ${pool.escape(password)}`, (err) => {
            if (err) {
                console.log('deleteUser-');
                reject(err);
            }
            else {
                console.log('deleteUser+');
                resolve({...data})
            }
        });
    });
};

const getInfoAboutUser=(data)=>{
    return new Promise((resolve, reject) => {
        const {login,password} = data;
        const query = pool.query(`
                       SELECT users.IDU, user_types.type  
                       FROM users 
                       INNER JOIN user_types
                       ON users.IDUT=user_types.IDUT
                       WHERE login = ${pool.escape(login)} AND password = ${pool.escape(password)}`, (err, res) => {
            if (err) reject(err);
            if (!res.length) {
                console.log('getInfoAboutUser-');
                reject('user not found');
            }
            else {
                const IDU = res[0].IDU;
                const type = res[0].type;
                console.log('getInfoAboutUser+');
                resolve({...data,IDU,type});
            }
        });
    });
};

const getInfoAboutCategory=(data)=>{
    return new Promise((resolve, reject) => {
        const {category} = data;
        const query = pool.query(`SELECT IDC FROM category WHERE name = ${pool.escape(category)}`, (err, res) => {
            if (err) {
                reject(err);
            }
            if (!res.length) {
                console.log('getInfoAboutCategory-');
                reject('category not found');

            } else {
                const IDC = res[0].IDC;
                console.log('getInfoAboutCategory+');
                resolve({...data,IDC});
            }
        });
    })
};

const getInfoAboutUserType=(data)=>{
    return new Promise((resolve, reject) => {
        const {newType} = data;
        const query = pool.query(`SELECT IDUT FROM user_types WHERE type = ${pool.escape(newType)}`, (err, res) => {
            if (err) {
                reject(err);
            }
            if (!res.length) {
                console.log('getInfoAboutCategory-');
                reject('category not found');

            } else {
                const IDC = res[0].IDC;
                console.log('getInfoAboutCategory+');
                resolve({...data,IDC});
            }
        });
    })
};

const checkPost=(data)=>{
    return new Promise((resolve, reject) => {
        const {IDP} = data;
        const query = pool.query(`SELECT IDP FROM posts WHERE IDP = ${pool.escape(IDP)}`, (err, res) => {
            if (err) {
                reject(err);
            }
            if (!res.length) {
                console.log('checkPost-');
                reject('post not found');

            } else {
                console.log('checkPost+');
                resolve({...data});
            }
        });
    })
};

const addPost=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDU, IDC, textP} = data;
        const query = pool.query(`INSERT INTO posts(IDU,text,IDC) values(${pool.escape(IDU)},${pool.escape(textP)},${pool.escape(IDC)})`, (err) => {
            if (err) {
                console.log('addpost-');
                reject(err);
            }
            else {
                console.log('addpost+');
                resolve({...data})
            }
        });
    });
};

const deletePost=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDU,type} = data;
        let q;
        type==='admin' ?
            q=`DELETE FROM posts WHERE IDP = ${pool.escape(IDP)}` :
            q=`DELETE FROM posts WHERE IDP = ${pool.escape(IDP)} AND IDU=${pool.escape(IDU)}`;
        const query = pool.query(q, (err, res,f) => {
            if (err) {
                console.log('deletePost-');
                reject(err);
            }
            else {
                console.log(`deletePost+ (${res.affectedRows})`);
                resolve({...data})
            }
        });
    });
};

const like=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDU} = data;
        const query = pool.query(`INSERT INTO likes(IDU,IDP) values(${pool.escape(IDU)},${pool.escape(IDP)})`, (err) => {
            if (err) {
                console.log('like-');
                reject(err);
            }
            else {
                console.log(`like+ `);
                resolve({...data})
            }
        });
    });
};

const deleteLike=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDU} = data;
        const query = pool.query(`DELETE FROM likes WHERE IDP=${pool.escape(IDP)} AND IDU=${pool.escape(IDU)}`, (err, res) => {
            if (err) {
                console.log('deleteLike-');
                reject(err);
            }
            else {
                console.log(`deleteLike+ (${res.affectedRows})`);
                resolve({...data})
            }
        });
    });
};

const save=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDU} = data;
        const query = pool.query(`INSERT INTO saves(IDU,IDP) values(${pool.escape(IDU)},${pool.escape(IDP)})`, (err) => {
            if (err) {
                console.log('save-');
                reject(err);
            }
            else {
                console.log(`save+ `);
                resolve({...data})
            }
        });
    });
};

const deleteSave=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDU} = data;
        const query = pool.query(`DELETE FROM saves WHERE IDP=${pool.escape(IDP)} AND IDU=${pool.escape(IDU)}`, (err, res) => {
            if (err) {
                console.log('deleteSave-');
                reject(err);
            }
            else {
                console.log(`deleteSave+ (${res.affectedRows})`);
                resolve({...data})
            }
        });
    });
};

const addComment=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDU,textC} = data;
        const query = pool.query(`INSERT INTO comments(IDU,IDP, text) values(${pool.escape(IDU)},${pool.escape(IDP)},${pool.escape(textC)})`, (err) => {
            if (err) {
                console.log('addComment-');
                reject(err);
            }
            else {
                console.log(`addComment+ `);
                resolve({...data})
            }
        });
    });
};

const deleteComment=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDPC,IDU,type} = data;
        let q;
        type==='admin' ?
            q=`DELETE FROM comments WHERE IDPC=${pool.escape(IDPC)}` :
            q=`DELETE FROM comments WHERE IDPC=${pool.escape(IDPC)} AND IDU=${pool.escape(IDU)}`;
        const query = pool.query(q, (err, res) => {
            if (err) {
                console.log('deleteComment-');
                reject(err);
            }
            else {
                console.log(`deleteComment+ (${res.affectedRows})`);
                resolve({...data})
            }
        });
    });
};

const changeCategory=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDP,IDC,IDU,type} = data;
        let q;
        type==='admin' ?
            q=`UPDATE posts SET IDC="${IDC}" WHERE IDP=${pool.escape(IDP)}` :
            q=`UPDATE posts SET IDC="${IDC}" WHERE IDP=${pool.escape(IDP)} AND IDU=${pool.escape(IDU)}`;
        const query = pool.query(q, (err, res) => {
            if (err) {
                console.log('changeCategory-');
                reject(err);
            }
            else {
                console.log(`changeCategory+ (${res.affectedRows})`);
                resolve({...data})
            }
        });
    });
};

const changeUserType=(data)=> {
    return new Promise((resolve, reject) => {
        const {IDU, type, IDUT} = data;
        if(type==="admin") {
            const query = pool.query(`UPDATE user SET IDUT=${pool.escape(IDUT)} WHERE IDU=${pool.escape(IDU)}`, (err, res) => {
                if (err) {
                    console.log('changeCategory-');
                    reject(err);
                } else {
                    console.log(`changeCategory+ (${res.affectedRows})`);
                    resolve({...data})
                }
            });
        }
    });
};

const loadPosts=(data)=>{
    return new Promise((resolve, reject) => {
        const {sort,IDU} = data;
        let searchLikes='';
        if(IDU) searchLikes=`,(SELECT count(*) FROM likes WHERE likes.IDU=${pool.escape(IDU)} AND likes.IDP=posts.IDP) as liked`;
        let querySort;
        switch(sort){
            case 'SORT_BY_DATE':
                querySort='date';
                break;
            case 'SORT_BY_REIT':
                querySort='likes';
                break;
            default: querySort='date';
        }
        const query = pool.query(
            `SELECT
                    posts.IDP AS IDP,
                    posts.header AS header,
                    posts.text AS text,
                    posts.datatime as date,
                    users.login as author,
                    category.name AS category,
                    (SELECT COUNT(saves.IDP) FROM saves WHERE saves.IDP=posts.IDP) as saves,
                    (SELECT COUNT(likes.IDP) FROM likes WHERE likes.IDP=posts.IDP) as likes
                    ${searchLikes}
                FROM
                    posts
                INNER JOIN users ON posts.IDU = users.IDU
                INNER JOIN category ON posts.IDC = category.IDC
                ORDER BY ${querySort} DESC`,
            (err, res) => {
            if (err) {
                console.log('loadPosts-');
                reject(err);
            } else {
                console.log(`loadPosts+ (${res.length})`);
                resolve({...data, posts: res})
            }
        });
    });
};

const sendAnswer=(data)=>{
    const {action,res} = data;
    let finalDate;
    switch (action) {
        case 'LOAD_POSTS':
            finalDate=data.posts;
            break;
        case 'GET_INFO_ABOUT_USER':
            finalDate={getInfo:true};
            break;
        case 'ADD_USER':
            finalDate={add_user:true};
            break;
        default:finalDate='null';
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(finalDate);
    console.log('send ');
};


app.use('/',(req,res)=>{
    const sendError=(err)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(404);
        res.json(err);
        console.log(err);
    };
    console.log(req.query);
    const {login,password} = req.query;
    switch (req.query.action) {
        case 'LOAD_POSTS':
            if(login && password) {
                getInfoAboutUser({...req.query,res})
                    .then(loadPosts)
                    .then(sendAnswer)
                    .catch(sendError)
            }
            else {
                loadPosts({...req.query,res})
                    .then(sendAnswer)
                    .catch(sendError);
            }
            break;
        case 'GET_INFO_ABOUT_USER':
            getInfoAboutUser({...req.query,res})
                .then(sendAnswer)
                .catch(sendError);
            break;
        case 'ADD_USER':
            addUser({...req.query,res})
                .then(sendAnswer)
                .catch(sendError)
    }
});








/*getInfoAboutCategory({category:"отзыв",IDP:7,type:"admin",IDU:3})
    .then(changeCategory)
    .catch((err)=>console.log(err));*/

/*deleteLike({IDU:347,IDP:8})
    .catch((err)=>console.log(err));*/

/*deletePost({IDU:347,IDP:8,type:'admin'})
    .catch((err)=>console.log(err));*/

/*getInfoAboutUser({login:1,password:1,category:'совет',textP:"test"})
    .then(getInfoAboutCategory)
    .then(addPost)
    .catch((err)=>console.log(err));*/

