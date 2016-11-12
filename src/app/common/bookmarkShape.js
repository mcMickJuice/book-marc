import {PropTypes} from 'react'

const bookmarkShape = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

const reviewShape = {
    overview: PropTypes.string,
    url: PropTypes.string
}

export default PropTypes.shape(bookmarkShape)
export const bookmarkShapeWithReview = PropTypes.shape({
    ...bookmarkShape,
    ...reviewShape
})