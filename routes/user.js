
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

function User (user){
	this.name = user.name;
	this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(callback) {
	var user = {
			name: this.name,
			password: this.password,
		};
	console.log(user.name+"-"+ user.password);
};

User.get = function get(username, callback) {
	
};
