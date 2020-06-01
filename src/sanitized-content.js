const xss = require('xss');

const sanitizedContent = (content) => {

    const serialedContent = content.map(element => {
        for (const [key,value] of Object.entries(element))
            if (typeof value === 'string') {
                element[key] = xss(value)
            } else {
                element[key]
            }
        return element
    })

    return serialedContent;
}


module.exports = sanitizedContent;
