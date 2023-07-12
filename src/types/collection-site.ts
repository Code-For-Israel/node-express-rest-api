export enum SiteStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
};

export enum SiteType {
    PERSONAL = 'PERSONAL',
    ORGANIZATION = 'ORGANIZATION',
};

export interface CollectionSite {
    siteId: string,
    name: string,
    contactName: string | undefined,
    organizationName: string | undefined,
    city: string,
    address: string,
    supportRefrigerating: boolean,
    siteStatus: SiteStatus,
    siteType: SiteType,
    openingHoursLink: string,
    phone: string
};
