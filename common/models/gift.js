"use strict";

module.exports = function(Gift) {
  // method to list all free gifts
  Gift.listFree = function(callback) {
    Gift.find(
      {
        fields: {
          reserved: false,
        },
      },
      callback
    );
  };

  // exposing above method
  Gift.remoteMethod('listFree', {
    returns: {
      arg: 'gifts',
      type: 'array',
    },
    http: {
      path: '/list-free',
      verb: 'get',
    },
  });

  // method to return if the gift is free
  Gift.isFree = function(id, callback) {
    console.log(id);
    var response;
    Gift.find({
      where: {
        id: id,
      },
    }, function(err, gift) {
      if (err) {
        return callback(err);
      }
      console.log(gift);
      if (gift.length < 1) {
        response = 'Sorry, this gift does not exist';
      } else if (gift[0].reserved) {
        response = 'Sorry, this gift is reserved';
      } else {
        response = 'Great, this gift can be yours';
      }
      console.log(response);
      callback(null, response);
    });
  };

  // expose the method through rest
  Gift.remoteMethod('isFree', {
    accepts: {
      arg: 'id',
      type: 'number',
    },
    returns: {
      arg: 'response',
      type: 'string',
    },
    http: {
      path: '/free',
      verb: 'post',
    },
  });
};
