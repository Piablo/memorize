module.exports = (sequelize, DataTypes) =>
    sequelize.define('Sentences', {
        sentenceID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sentence: {
            type: DataTypes.TEXT
        },
        question: {
            type: DataTypes.TEXT
        }  
    },{
        timestamps: false,
    })

    