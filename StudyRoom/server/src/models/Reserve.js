module.exports = (sequelize, DataTypes) => {
    const Reserve = sequelize.define('Reserve', {
        name: DataTypes.STRING,
        timeReserve: DataTypes.STRING,
        timeReturn: DataTypes.STRING,
        Room: DataTypes.STRING,
        number: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Reserve
}