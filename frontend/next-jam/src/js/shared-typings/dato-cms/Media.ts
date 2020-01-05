import { Video } from "./Video";

export interface Media {
    format: string,
    size: number,
    width: number,
    height: number,
    title: string,
    alt: string,
    url: string,
    customData: any,
    tags: string[],
    smartTags: string[],
    filename: string,
    basename: string,
    isImage: boolean,
    exifInfo: any,
    mimeType: string,
    blurhash: string,
    video: Video
}

