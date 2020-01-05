import { Media } from "./Media";
import { BasePage } from "./BasePage";

export interface IArticle extends BasePage {
    link: BasePage,
    content: string,
    heading: string,
    image: Media,
}