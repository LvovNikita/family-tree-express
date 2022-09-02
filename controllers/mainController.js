'use strict'

const mainController = {
    getIndexPage: (req, res, next) => {
        try {
            // res.locals = { data: 'Data to layout!' }
            res
            .status(200)
            .render('index', { title: 'FamilyTree' } /*{ layout: 'layout' }*/)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = mainController