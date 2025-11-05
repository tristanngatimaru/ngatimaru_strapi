import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutButton extends Struct.ComponentSchema {
  collectionName: 'components_layout_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    EnglishLabel: Schema.Attribute.String;
    href: Schema.Attribute.String;
    TeReoLabel: Schema.Attribute.String;
  };
}

export interface LayoutContent extends Struct.ComponentSchema {
  collectionName: 'components_layout_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    ContentText: Schema.Attribute.Text;
  };
}

export interface LayoutFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_columns';
  info: {
    displayName: 'FooterColumn';
  };
  attributes: {
    Content: Schema.Attribute.Component<'layout.content', true>;
    ContentTItle: Schema.Attribute.String;
  };
}

export interface LayoutHarvesterNames extends Struct.ComponentSchema {
  collectionName: 'components_layout_harvester_names';
  info: {
    displayName: 'HarvesterNames';
  };
  attributes: {
    FirstName: Schema.Attribute.String;
    LastName: Schema.Attribute.String;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'NavBar';
  };
  attributes: {};
}

export interface LayoutHeaderSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_header_sections';
  info: {
    displayName: 'HeaderSection';
  };
  attributes: {
    BackgroundHeaderImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    EnglishTitle: Schema.Attribute.String;
    TeReoTitle: Schema.Attribute.String;
  };
}

export interface LayoutMihiSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_mihi_sections';
  info: {
    displayName: 'MihiSection';
  };
  attributes: {
    FullMihi: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    MihiShortened: Schema.Attribute.Text;
    ShortNeeded: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutNavigation extends Struct.ComponentSchema {
  collectionName: 'components_layout_navigations';
  info: {
    displayName: 'Navigation';
    icon: 'bulletList';
  };
  attributes: {
    href: Schema.Attribute.String;
    TitleEnglish: Schema.Attribute.String;
    TitleTeReo: Schema.Attribute.String;
    Visible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedDefaultSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_default_seos';
  info: {
    displayName: 'defaultSEO';
    icon: 'link';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaTitle: Schema.Attribute.String;
  };
}

export interface SharedFaceCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_face_cards';
  info: {
    displayName: 'FaceCard';
    icon: 'priceTag';
  };
  attributes: {
    Detail: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
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
    IsExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    IsVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    TeReoLabel: Schema.Attribute.String;
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

export interface SharedSpecies extends Struct.ComponentSchema {
  collectionName: 'components_shared_species';
  info: {
    displayName: 'Species';
  };
  attributes: {
    AreaLanded: Schema.Attribute.Text;
    AreaTaken: Schema.Attribute.Text;
    HarvestMethodDrop: Schema.Attribute.Enumeration<
      ['Rod and Line', 'Hand Harvest', 'Tanks']
    >;
    SpeciesName: Schema.Attribute.String;
  };
}

export interface SharedSpouse extends Struct.ComponentSchema {
  collectionName: 'components_shared_spouses';
  info: {
    displayName: 'Spouse';
  };
  attributes: {
    AlsoKnownAs: Schema.Attribute.String;
    DateOfBirth: Schema.Attribute.Date;
    FirstName: Schema.Attribute.String;
    Gender: Schema.Attribute.Enumeration<['Male', 'Female', 'Gender Diverse']>;
    Iwi: Schema.Attribute.String;
    LastName: Schema.Attribute.String;
    MaidenName: Schema.Attribute.String;
    Salutation: Schema.Attribute.Enumeration<
      ['Master', 'Mr', 'Miss', 'Mrs', 'Ms', 'Mx']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.button': LayoutButton;
      'layout.content': LayoutContent;
      'layout.footer-column': LayoutFooterColumn;
      'layout.harvester-names': LayoutHarvesterNames;
      'layout.header': LayoutHeader;
      'layout.header-section': LayoutHeaderSection;
      'layout.mihi-section': LayoutMihiSection;
      'layout.navigation': LayoutNavigation;
      'shared.default-seo': SharedDefaultSeo;
      'shared.face-card': SharedFaceCard;
      'shared.link': SharedLink;
      'shared.logo': SharedLogo;
      'shared.species': SharedSpecies;
      'shared.spouse': SharedSpouse;
    }
  }
}
