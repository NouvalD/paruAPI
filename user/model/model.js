const { Model } = require("objection");
const knex = require("../../config/dbConnection");

Model.knex(knex)

class User extends Model{
    static get tableName(){
        return 'user'
    }
}

module.exports = User;
