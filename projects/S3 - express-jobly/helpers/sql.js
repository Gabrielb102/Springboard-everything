const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
// Param: jsToSql is an object where the entries are the columns that you intend to update
//        where the keys are camelCased for json
//        and the values are snake_cased as they are in SQL.
// Param: dataToUpdate is just the data to be updated {colName in camelCase: newData}

const sqlForPartialUpdate = (dataToUpdate, jsToSql) => {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // creates an SQL query string to submit, with variables for sanitary data
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // setCols is the query string 
  // values is an array of the new data to be placed in the database.
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate};
