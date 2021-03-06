import { Media } from "./Media";
import { BasePage } from "./BasePage";
import { ISpot } from "./Spot";

export interface IFrontPage extends BasePage {
    content: string,
    heading: string,
    spots: ISpot[],
    links: BasePage[]
}