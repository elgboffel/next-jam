import { Media } from "./Media";
import { BasePage } from "./BasePage";
import { Spot } from "./Spot";

export interface IFrontPage extends BasePage {
    content: string,
    heading: string,
    image: Media,
    spots: Spot[],
    links: BasePage[]
}