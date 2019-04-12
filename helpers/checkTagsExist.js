const Tag = require('../models/tags')

module.exports = {
    checkTag(nameTag, id) {
        console.log(id)
        Tag
            .findOne({
                tags: nameTag
            })
            .then(function (oneTag) {
                if (!oneTag) {
                    return Tag
                        .create({
                            tags: nameTag,
                            ShareId: [id]
                        })
                }
                else {
                    return Tag
                    .findOneAndUpdate({
                        tags: nameTag
                    }, {
                        $push: {
                            ShareId: id
                        }
                    })
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