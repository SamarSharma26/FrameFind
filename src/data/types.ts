export type LicenseType = 
  | 'free-no-credit' 
  | 'credit-required';

export type CommercialPolicy = 
  | 'Allowed' 
  | 'Allowed with Attribution' 
  | 'Non-Commercial / Editorial' 
  | 'Check Original License';

export interface ResourceItem {
  id: string;
  name: string;
  provider: string;
  url: string;
  category: string;
  categoryName: string;
  description: string;
  fullDescription: string;
  licenseType: LicenseType;
  licenseLabel: string;
  commercialUse: CommercialPolicy;
  attributionRequired: boolean;
  pricingTier: string;
  compatibility: string[];
  tags: string[];
  isFeatured?: boolean;
  workflows: string[];
  fileFormats?: string[];
  usageNotes?: string;
  accentColor?: string;
}

export interface CategoryInfo {
  id: string;
  number: string;
  name: string;
  iconName: string;
  whatsInside: string;
  description: string;
  accentColor: string;
  gradient: string;
}

export interface WorkflowCollection {
  id: string;
  title: string;
  description: string;
  badge: string;
  accentColor: string;
}
