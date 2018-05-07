var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

function format_date(date) {
    return date ?
        moment(date).format('YYYY-MM-DD') : '';
}

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);


// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema.
virtual('lifespan')
.get(function() {
    return format_date(this.date_of_birth) + ' - ' +
        format_date(this.date_of_death);
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function() {
    return format_date(this.date_of_birth);
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function() {
    return format_date(this.date_of_death);
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
