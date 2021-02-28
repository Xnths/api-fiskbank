const connection = require('./connection');

module.exports = (sql, parameters = {}) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (error, response, params) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
}