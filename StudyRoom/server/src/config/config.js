module.exports={
    port: 8081,
    db:{
        database: process.env.DB_NAME || 'StudyRoomDb',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './StudyRoom-db.sqlite'
        },
    },
    authentication:{
        jwtSecret: 'nodejs vuejs'
    }
  }