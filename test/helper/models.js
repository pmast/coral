module.exports = models;

function models(mongoose, connection) {

	var Schema = mongoose.Schema;

	var UserSchema = new Schema({
		name: String,
		age: Number,
		email: String,
		articles: [{
			type: Schema.Types.ObjectId,
			ref: 'Article'
		}]
	});

	UserSchema.path('email').validate(function(email) {
		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailRegex.test(email);
	}, 'Invalid email address');

	var ReplySchema = new Schema({
		name: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		body: String,
		likes: [{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}],
		date: {
			type: Date,
			default: Date.now
		}
	});

	var CommentSchema = new Schema({
		name: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		body: String,
		replies: [ReplySchema],
		likes: [{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}],
		date: {
			type: Date,
			default: Date.now
		}
	});

	var ArticleSchema = new Schema({
		name: String,
		title: String,
		body: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		comments: [CommentSchema],
		likes: [{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}],
		hidden: Boolean,
		date: {
			type: Date,
			default: Date.now
		}
	});

	return {
		User: connection.model('User', UserSchema),
		Comment: connection.model('Comment', CommentSchema),
		Article: connection.model('Article', ArticleSchema),
		Reply: connection.model('Reply', ReplySchema)
	};

}