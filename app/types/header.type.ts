interface LinkItem {
    link: string,
    text: string,
    subLinks: LinkItem[]
}
export type Header = {
    logo: string | null,
    links: LinkItem[],
}