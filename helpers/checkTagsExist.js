const Tag = require('../models/tags')

module.exports = {
    checkTag(nameTag, id) {
        Tag
            .findOne({
                tags: nameTag
            })
            .then(function (oneTag) {
                if (!oneTag) {
                    return Tag
                        .create({
                            tags: nameTag,
                            $push: {
                                ShareId: id
                            }
                        })
                }
                else {
                    console.log('tag already exists')
                }
            })
            .then(function (newTag) {
                console.log('added new tag')
            })
            .catch(function (err) {
                console.log(err)
            })
    }
}