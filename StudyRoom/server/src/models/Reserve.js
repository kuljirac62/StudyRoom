module.exports = (sequelize, DataTypes) => {
    const Reserve = sequelize.define('Reserve', {
        nameLend: DataTypes.STRING,
        dateLend: DataTypes.STRING,
        dateReturn: DataTypes.STRING,
        equipment: DataTypes.STRING,
        number: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Reserve
}