function verifyAdmin(req, res, next) {
    if (req.type == 'Admin') {
        next();
    } else {
        res.verifyAdminError = 'Unauthorized user'
        res.status(403).send();
    }
}
module.exports = verifyAdmin;