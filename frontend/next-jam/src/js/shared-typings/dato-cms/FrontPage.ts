import { Media } from "./Media";
import { BasePage } from "./BasePage";
import { ISpot } from "./Spot";

export interface IFrontPage extends BasePage {
    content: string,
    heading: string,
    image: Media,
    spots: string[],
    links: BasePage[]
}