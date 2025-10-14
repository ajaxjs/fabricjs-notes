export type TDropdownMenuItem = {
    label: string;
    shortcut?: string;
    submenu?: TDropdownMenu;
    onClick?: (e: Event) => void;
    //DropdownMenuSub?: TDropdownMenu;
    [key: string]: any;
}

export type TDropdownMenuItems = TDropdownMenuItem[]

export type TDropdownMenu = {
    label?: string;
    items: TDropdownMenuItems | TDropdownMenuItems[];
}