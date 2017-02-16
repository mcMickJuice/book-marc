export const mapTag = state => {
    const tagDict = state.tag.reduce((acc, t) => {
        acc[t.id] = t;

        return acc
    }, {})

    return tagId => {
        return tagDict[tagId]
    }
}

export const searchTags = state => {
    return tagName => {
        const lowerCase = tagName.toLowerCase();

        return state.tag.filter(t => {
            return t.name.toLowerCase().indexOf(lowerCase) > -1
        })
    }
}

export const isValidTag = state => {
    return tagName => {
        const lowerCase = tagName.toLowerCase().trim();

        //tag must not exist
        const doesNotExist = state.tag.filter(t => {
            return t.name.toLowerCase() === lowerCase
        }).length === 0;

        const hasValidLength = lowerCase.length >= 3
        
        return doesNotExist && hasValidLength;
    }
}