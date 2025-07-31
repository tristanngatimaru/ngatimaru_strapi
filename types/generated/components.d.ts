import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'NavBar';
  };
  attributes: {
    NavigationItems: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface LayoutHeroHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_headers';
  info: {
    displayName: 'HeroHeader';
  };
  attributes: {
    Header: Schema.Attribute.Component<'shared.header', false>;
  };
}

export interface LayoutNavigation extends Struct.ComponentSchema {
  collectionName: 'components_layout_navigations';
  info: {
    displayName: 'Navigation';
    icon: 'bulletList';
  };
  attributes: {
    headers: Schema.Attribute.Component<'layout.header', false>;
  };
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    EnglishLabel: Schema.Attribute.String;
    HeaderImage: Schema.Attribute.Media<'files' | 'videos' | 'images'>;
    TeReoLabel: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    EnglishLabel: Schema.Attribute.String;
    href: Schema.Attribute.String;
    IsButtonLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    IsExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    IsVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    TeReoLabel: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_logos';
  info: {
    displayName: 'Logo';
    icon: 'rocket';
  };
  attributes: {
    href: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images'>;
    IsExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Label: Schema.Attribute.String;
  };
}

export interface SpeciesSpecies extends Struct.ComponentSchema {
  collectionName: 'components_species_species';
  info: {
    displayName: 'Species';
    icon: 'priceTag';
  };
  attributes: {
    AreaSpeciesIsHarvested: Schema.Attribute.String;
    DateandApproxTimeOfHarvesting: Schema.Attribute.Text;
    MethodOfHarvest: Schema.Attribute.String;
    NameOfSpecies: Schema.Attribute.String;
    PlaceSpeciesIsLanded: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.header': LayoutHeader;
      'layout.hero-header': LayoutHeroHeader;
      'layout.navigation': LayoutNavigation;
      'shared.header': SharedHeader;
      'shared.link': SharedLink;
      'shared.logo': SharedLogo;
      'species.species': SpeciesSpecies;
    }
  }
}
