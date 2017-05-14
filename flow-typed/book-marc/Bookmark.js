declare type BookmarkType = {
    id: string,
    title: string,
    url: string,
    rating?: number,
    createdDate: number,
    readDate: number,
    description?: string,
    tags?: Array<TagType>,
    isRead: boolean,
    readDate?: number
}

declare type BookmarkReviewType = BookmarkType & {
    overview: string,
    url: string
}
