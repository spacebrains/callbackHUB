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
        const {name,login,password} =data;
        const query = pool.query(`INSERT INTO users(name,login,password) values("${name}","${login}","${password}")`, (err) => {
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
        const query = pool.query(`DELETE FROM users WHERE login = "${login}" AND password = "${password}"`, (err) => {
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
                       WHERE login = "${login}" AND password = "${password}"`, (err, res) => {
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
        const query = pool.query(`SELECT IDC FROM category WHERE name = '${category}'`, (err, res) => {
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
        const query = pool.query(`SELECT IDUT FROM user_types WHERE type = '${newType}'`, (err, res) => {
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
        const query = pool.query(`SELECT IDP FROM posts WHERE IDP = '${IDP}'`, (err, res) => {
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
        const query = pool.query(`INSERT INTO posts(IDU,text,IDC) values("${IDU}","${textP}","${IDC}")`, (err) => {
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
            q=`DELETE FROM posts WHERE IDP = "${IDP}"` :
            q=`DELETE FROM posts WHERE IDP = "${IDP}" AND IDU="${IDU}"`;
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
        const query = pool.query(`INSERT INTO likes(IDU,IDP) values("${IDU}","${IDP}")`, (err) => {
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
        const query = pool.query(`DELETE FROM likes WHERE IDP="${IDP}" AND IDU="${IDU}"`, (err, res) => {
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
        const query = pool.query(`INSERT INTO saves(IDU,IDP) values("${IDU}","${IDP}")`, (err) => {
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
        const query = pool.query(`DELETE FROM saves WHERE IDP="${IDP}" AND IDU="${IDU}"`, (err, res) => {
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
        const query = pool.query(`INSERT INTO comments(IDU,IDP, text) values("${IDU}","${IDP}","${textC}")`, (err) => {
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
            q=`DELETE FROM comments WHERE IDPC="${IDPC}"` :
            q=`DELETE FROM comments WHERE IDPC="${IDPC}" AND IDU="${IDU}"`;
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
            q=`UPDATE posts SET IDC="${IDC}" WHERE IDP="${IDP}"` :
            q=`UPDATE posts SET IDC="${IDC}" WHERE IDP="${IDP}" AND IDU="${IDU}"`;
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
            const query = pool.query(`UPDATE user SET IDUT="${IDUT}" WHERE IDU="${IDU}"`, (err, res) => {
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

app.use('/',(req,res)=>{
    console.log(req.query)
});









/*getInfoAboutCategory({category:"отзыв",IDP:7,type:"admin",IDU:3})
    .then(changeCategory)
    .catch((err)=>console.log(err));*/

/*deleteLike({IDU:347,IDP:8})
    .catch((err)=>console.log(err));*/

/*deletePost({IDU:347,IDP:8,type:'admin'})
    .catch((err)=>console.log(err));*/

/*getInfoAboutUser({login:1,password:1,category:'совет',text:"test"})
    .then(getInfoAboutCategory)
    .then(addPost)
    .catch((err)=>console.log(err));*/

