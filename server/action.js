const getInfoAboutUser=(data)=>{
    const {login,password} = data;
    return new Promise((resolve, reject) => {
        const query = pool.query(`
                       SELECT users.IDU, user_types.type  
                       FROM users 
                       INNER JOIN user_types
                       ON users.IDUT=user_types.IDUT
                       WHERE login = "${login}" AND password = "${password}"`, (err, res, f) => {
            if (err) reject(err);
            if (!res.length) {
                console.log('getInfoAboutUser-');
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
    const {category} = data;
    return new Promise((resolve, reject) => {
        const query = pool.query(`SELECT IDC FROM category WHERE name = '${category}'`, (err, res) => {
            if (err) {
                reject(err);
            }
            if (!res.length) {
                console.log('getInfoAboutCategory-');
                reject('not found');

            } else {
                const IDC = res[0].IDC;
                console.log('getInfoAboutCategory+');
                resolve({...data,IDC});
            }
        });
    })
};
const addPost=(data)=> {
    const {IDU, IDC, text} = data;
    return new Promise((resolve, reject) => {
        const query = pool.query(`INSERT INTO posts(IDU,text,IDC) values("${IDU}","${text}","${IDC}")`, (err, res) => {
            if (err) {
                console.log('addpost-');
                reject(err);
            }
            else {
                console.log('addpost+');
            }
        });
    });
};