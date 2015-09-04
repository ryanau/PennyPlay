var EventEmitter = require('eventemitter3');
var objectAssign = require('object-assign');


var Users = function(){
  this.users = [];
};

objectAssign(Users.prototype, EventEmitter.prototype);

Users.prototype.addToUsers = function(data){
	var i = 0
	this.users.forEach(function(user) {
		if (user.user_id == data.user_id) {
			this.users.splice(i, 1)
		};
		i++
	}.bind(this));
  this.users.push(data);
  this.emit('change');
  return this;
};

Users.prototype.empty = function () {
	this.users = [];
}

module.exports = Users;

