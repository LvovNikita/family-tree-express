const url = require('node:url')
const querystring = require('node:querystring')

const Person = require('../models/Person')
const Tree = require('../models/Tree')

const personController = {
    getCreatePersonPage: (req, res, next) => {
        res.render('personCreate', { title: 'Person' })
    },
    postCreatePerson: async (req, res, next) => {
        const newPerson = await Person.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }) // TODO: catch TODO: other fields
        const urlObj = url.parse(req.url)
        const queryObj = querystring.parse(urlObj.query)
        console.log(queryObj)
        const currentTree = await Tree.findOne({ id: req.body.treeId }) // TODO: catch
        // TODO: does user have an access to tree?
        currentTree.persons.push(newPerson._id)
        await currentTree.save()
        return res.redirect('/user/profile') // FIXME: redirect to the current tree
    },
    postRemovePerson: async (req, res, next) => {
        await Person.deleteOne({ id: req.body.id }) // TODO: catch
        return res.redirect('/user/profile')
    },
    getPersonById: (req, res, next) => {
        res.send(`Person ${req.params.id}`)
    }
}

module.exports = personController
