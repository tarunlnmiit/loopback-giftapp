module.exports = function(app) {
  app.dataSources.mysqlDS.autoupdate(null, function(err) {
    if (err) throw err;
  });
};
