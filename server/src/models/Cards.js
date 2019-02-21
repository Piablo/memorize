module.exports = (sequelize, DataTypes) =>
    sequelize.define('Cards', {
        cardID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        questionText: {
            type: DataTypes.TEXT
        },
        questionImage: {
            type: DataTypes.BLOB('medium')
        },
        answerText: {
            type: DataTypes.TEXT
        },
        answerImage: {
            type: DataTypes.BLOB('medium')
        },  
        dateAdded: {
            type: DataTypes.STRING
        },       
    },{
        timestamps: false,
    })

    