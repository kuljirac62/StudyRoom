  
module.exports = (sequelize, DataTypes) =>{
    const Blog = sequelize.define('Blog',{
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        quantity: DataTypes.STRING,
        status: DataTypes.STRING,
        //detail:DataTypes.STRING
    })

    return Blog
}