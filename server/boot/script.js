module.exports = function(app) {
  var Role = app.models.Role;

  Role.find({ name: "authenticatedDonor" }, function(err, results) {
    if (err) {
      /* handle this! */
    }

    if (results.length < 1) {
      // now we know the DB doesn't have it already, so do the Role creation...
      Role.create(
        {
          name: "authenticatedDonor"
        },
        function(err, role) {
          if (err) throw err;
        }
      );
    }
  });
};
