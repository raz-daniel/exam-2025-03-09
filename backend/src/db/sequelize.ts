import { Sequelize } from "sequelize-typescript";
import config from "config";

const logging = config.get<boolean>('sequelize.logging') ? console.log : false


const sequelize = new Sequelize({
    // models: [____, ____],
    dialect: 'mysql',
    ...config.get('db'),
    logging
})

export default sequelize