'use strict';
const fs = require('fs');
const glob = require('glob');
const path = require('path');

/**
 * Generate a query-function that returns a Promise
 *
 * @param  {Object} db       dbAdapter
 * @param  {String} queryStr sql query
 * @return {Promise}
 */
function getQueryFN(db, queryStr){
  return params => {
    return new Promise((resolve, reject) => {
      db.query(queryStr, params, (err, res) => {
        if(err){ reject(err); }
        resolve(res);
      });
    });
  };
}

/**
 * Takes two arguments. One compatible db-adapter/lib such as
 * https://github.com/sehrope/node-pg-db.
 * As long as it has a "query" method that takes a "query string" as
 * argument, it will work.
 *
 * @param  {Object} db        dbAdapter
 * @param  {String} queryPath glob pattern/path containing .sql files
 * @return {Object}           contains query functions
 */
module.exports = (db, queryPath) => {
  let files = glob.sync(queryPath);
  let queries = files.map(filepath => {
    let queryname = path.basename(filepath, '.sql');
    let queryStr = fs.readFileSync(filepath, 'utf8');
    return {
      queryname,
      queryStr
    };
  }).reduce((prev, next) => {
    prev[next.queryname] = getQueryFN(db, next.queryStr);
    return prev;
  }, {});

  return queries;
};
