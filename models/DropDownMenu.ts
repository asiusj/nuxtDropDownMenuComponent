export default interface DropDownMenu {
    data: DropDownMenuItem[];
}

export interface DropDownMenuItem {
    name: string;
    path?: string;
    tag?: string;
}
