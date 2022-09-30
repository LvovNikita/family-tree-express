'use strict'

const mainController = {
    getIndexPage: (req, res, next) => {
        res
            .status(200)
            .render('index', { title: 'FamilyTree' })
    }
}

module.exports = mainController
