'use strict'

module.exports = (req, res, next) => {
    res
        .status(200)
        .render('index', {
            title: 'FamilyTree'
        })
}
