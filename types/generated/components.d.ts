import type { Schema, Struct } from '@strapi/strapi';

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
    TeReoLabel: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
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
      'shared.link': SharedLink;
      'species.species': SpeciesSpecies;
    }
  }
}
