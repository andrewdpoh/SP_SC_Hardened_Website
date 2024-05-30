const validator = require('validator');
const isUrl = require('is-url')

var validation = {

    // Validate userid
    validateUserid: function (req, res, next) {
        var userid = req.userid;
        const reUserid = RegExp(`^[0-9]+$`)

        if (reUserid.test(userid)) {
            next();
        } else {
            res.status(422).send('{"Message": "Middleware validateUserid Error"}')
        }
    },

    // Validate reviewid
    validateReviewid: function (req, res, next) {
        if (req.params.id) {
            var reviewid = req.params.id
        }
        if (req.params.reviewid) {
            var reviewid = req.params.reviewid
        }
        const reReviewid = RegExp(`^[0-9]+$`)

        if (reReviewid.test(reviewid)) {
            next()
        } else {
            res.status(422).send('{"Message": "Middleware validateReviewid Error"}')
        }
    },
    
    // Validate input for reviews
    validateReview: function(req, res, next) {
        var review = req.body.review;
        var rating = req.body.rating;

        const reReview = RegExp(`^[a-zA-Z0-9!@#$%&*_.?+=^ ]+$`);
        const reRating = RegExp(`^[1-5]$`)

        if (reReview.test(review) && reRating.test(rating)) {
            next();
        } else {
            res.validationError = 'Middleware validateReview Error'
            res.status(422).send('{"Message": "Middleware validateReview Error"}')
        }

    },

    // Validate all inputs for user registration 
    validateRegister: function (req, res, next) {
        var username = req.body.username;
        var email = req.body.email;
        var contact = req.body.contact;
        var password = req.body.password;
        var profile_pic_url = req.body.profile_pic_url;

        const reUsername = RegExp(`^[a-zA-Z0-9 ]+$`); // username: lowercase, uppercase, digits
        const rePassword = RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*_.?+=^])[a-zA-Z0-9!@#$%&*_.?+=^ ]{8,}$`); // password: at least 1 lowercase, at least 1 uppercase, at least 1 digit, at least 1 special character from !@#$%&*_.?, any alphanumeric characters, any special character from !@#$%&*_.?, minimum 8 characters
        const reContact = RegExp(`^[0-9]{8,}$`) // contact: any digits, minimum 8 characters

        if (reUsername.test(username) && 
        rePassword.test(password) && 
        reContact.test(contact) && 
        validator.isEmail(email) && 
        (!profile_pic_url || isUrl(profile_pic_url))) {
            next();
        } else {
            res.validationError = 'Middleware validateRegister Error'
            res.status(422).send('{"Message": "Middleware validateRegister Error"}');
        }
    },

    // Escape all string characters
    sanitizeOutput: function (results) {
        for (i = 0; i < results.length; i++) {
            var row = results[i];
            for (var key in row) {
                val = row[key];
                if (typeof val === 'string') {
                    row[key] = validator.escape(val);
                }
            }
        }
    return results;
    }
}
module.exports = validation;

