module.exports = (sequelize, type) => {
    const Attendee = sequelize.define('attendee', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: type.STRING,
        lastName: type.STRING,
        degree1: type.STRING,
        degree2: type.STRING,
        degree3: type.STRING,
    });
    return Attendee;
}