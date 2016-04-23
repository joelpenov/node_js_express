
var goodReadsService = function(){
	var getById = function(id, callback){
		callback(null, {description: ''});
	};

	return{
		getById: getById
	};
};

module.exports = goodReadsService;