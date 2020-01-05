import { Media } from "./Media";
import { BasePage } from "./BasePage";

export interface IArticle extends BasePage {
    link: string,
    content: string,
    heading: string,
    image: Media,
}