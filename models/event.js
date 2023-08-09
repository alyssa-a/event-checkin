module.exports = (sequelize, type) => {
    const Event = sequelize.define('event', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: type.STRING,
        shortUrl: type.STRING
        });
    return Event;
}