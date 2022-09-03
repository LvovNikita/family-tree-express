'use strict'

const mainController = {
    getIndexPage: (req, res, next) => {
        try {
            // res.locals = { data: 'Data to layout!' }
            res
                .status(200)
                .render('index', { title: 'FamilyTree' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = mainController
