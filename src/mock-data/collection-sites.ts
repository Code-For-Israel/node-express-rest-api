import { CollectionSite, SiteStatus, SiteType } from '../types/collection-site';

export const collectionSites: CollectionSite[] = [
    {
      siteId: '123',
      name: 'Site # 1',
      contactName: 'Contact Name #1',
      organizationName: undefined,
      city: 'Jerusalem',
      address: 'Yehuda Halevi 3',
      supportRefrigerating: true,
      siteStatus: SiteStatus.ACTIVE,
      siteType: SiteType.PERSONAL,
      openingHoursLink: 'https://www.google.co.il/',
      phone: '0535812345'
    },
    {
      siteId: '456',
      name: 'Site # 2',
      contactName: undefined,
      organizationName: 'Organization #2',
      city: 'Jerusalem',
      address: 'Yehuda Halevi 3',
      supportRefrigerating: false,
      siteStatus: SiteStatus.INACTIVE,
      siteType: SiteType.ORGANIZATION,
      openingHoursLink: 'https://www.google.co.il/',
      phone: '0535812345'
    }
];