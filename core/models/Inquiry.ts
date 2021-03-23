import { DataTypes } from 'sequelize';
import { API } from '../database'


export const Inquiry = API.define('Inquiry', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    address: {
        type: DataTypes.STRING
    },
    service: {
        type: DataTypes.STRING
    },
    serviceDescription: {
        type: DataTypes.STRING
    },
    dateOfVisit: {
        type: DataTypes.DATE
    }
});