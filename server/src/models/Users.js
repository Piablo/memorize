module.exports = (sequelize, DataTypes) =>
    sequelize.define('Users', {
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        dateJoined: {
            type: DataTypes.STRING
        },
    },{
        timestamps: false,
    })

    

    