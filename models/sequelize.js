const Sequelize = require('sequelize');
const EventModel = require('./event');
const AttendeeModel = require('./attendee');

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
    );

const Event = EventModel(sequelize, Sequelize);
const Attendee = AttendeeModel(sequelize, Sequelize);

Attendee.belongsTo(Event);

sequelize.sync()
    .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    Event,
    Attendee
}