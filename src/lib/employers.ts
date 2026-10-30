// Every employer TheBox lists, in one place.
// Each entry links to the employer's own official hiring website.
// `roles` are the warehouse roles each employer typically hires for;
// current openings always live on the employer's official site.

export type Industry =
  | "E-commerce fulfillment"
  | "Retail distribution"
  | "Parcel delivery"
  | "Third-party logistics"
  | "Food distribution"
  | "Cold storage"
  | "Industrial supply";

export type Role =
  | "Warehouse associate"
  | "Picker / packer"
  | "Forklift operator"
  | "Package handler"
  | "Material handler"
  | "Order selector"
  | "Shipping & receiving"
  | "Inventory";

export type Employer = {
  slug: string;
  name: string;
  category: string;
  industry: Industry;
  roles: Role[];
  pageUrl: string;
  jobsUrl: string;
  destination: string;
  keywords: string[];
  featured?: boolean;
};

export const INDUSTRIES: Industry[] = [
  "E-commerce fulfillment",
  "Retail distribution",
  "Parcel delivery",
  "Third-party logistics",
  "Food distribution",
  "Cold storage",
  "Industrial supply",
];

export const ROLES: Role[] = [
  "Warehouse associate",
  "Picker / packer",
  "Forklift operator",
  "Package handler",
  "Material handler",
  "Order selector",
  "Shipping & receiving",
  "Inventory",
];

export const EMPLOYERS: Employer[] = [
  {
    slug: "amazon",
    name: "Amazon",
    category: "Fulfillment Center Warehouse Associate",
    industry: "E-commerce fulfillment",
    roles: ["Warehouse associate", "Picker / packer", "Shipping & receiving", "Inventory"],
    pageUrl: "/employers/amazon",
    jobsUrl:
      "https://hiring.amazon.com/app?cmpid=ATLTEU1795H10#/jobSearch?jobTitle=Amazon%20Fulfillment%20Center%20Warehouse%20Associate",
    destination: "hiring.amazon.com",
    keywords: ["amazon", "warehouse", "fulfillment", "fulfillment center", "warehouse associate"],
    featured: true,
  },
  {
    slug: "walmart",
    name: "Walmart",
    category: "Supply Chain & Transportation",
    industry: "Retail distribution",
    roles: ["Warehouse associate", "Forklift operator", "Material handler", "Shipping & receiving"],
    pageUrl: "/employers/walmart",
    jobsUrl: "https://careers.walmart.com/us/en/home/careers-areas/supply-chain-and-transportation",
    destination: "careers.walmart.com",
    keywords: ["walmart", "warehouse", "supply chain", "transportation", "distribution"],
  },
  {
    slug: "ups",
    name: "UPS",
    category: "Warehouse & Hourly Roles",
    industry: "Parcel delivery",
    roles: ["Package handler", "Warehouse associate", "Shipping & receiving"],
    pageUrl: "/employers/ups",
    jobsUrl: "https://www.jobs-ups.com/us/en/hourly-roles",
    destination: "jobs-ups.com",
    keywords: ["ups", "warehouse", "package handler", "hourly", "distribution"],
    featured: true,
  },
  {
    slug: "fedex",
    name: "FedEx",
    category: "Package Handler",
    industry: "Parcel delivery",
    roles: ["Package handler", "Material handler"],
    pageUrl: "/employers/fedex",
    jobsUrl: "https://careers.fedex.com/career-areas/package-handler/jobs",
    destination: "careers.fedex.com",
    keywords: ["fedex", "warehouse", "package handler", "package", "distribution"],
  },
  {
    slug: "home-depot",
    name: "Home Depot",
    category: "Warehouse Jobs",
    industry: "Retail distribution",
    roles: ["Warehouse associate", "Forklift operator", "Material handler"],
    pageUrl: "/employers/home-depot",
    jobsUrl: "https://careers.homedepot.com/career-areas/warehouse-jobs/",
    destination: "careers.homedepot.com",
    keywords: ["home depot", "warehouse", "distribution", "supply chain"],
  },
  {
    slug: "target",
    name: "Target",
    category: "Supply Chain",
    industry: "Retail distribution",
    roles: ["Warehouse associate", "Picker / packer", "Forklift operator"],
    pageUrl: "/employers/target",
    jobsUrl: "https://corporate.target.com/careers/career-areas/supply-chain",
    destination: "corporate.target.com",
    keywords: ["target", "warehouse", "supply chain", "distribution", "fulfillment"],
  },
  {
    slug: "costco",
    name: "Costco",
    category: "Warehouse & Distribution",
    industry: "Retail distribution",
    roles: ["Warehouse associate", "Forklift operator", "Inventory"],
    pageUrl: "/employers/costco",
    jobsUrl: "https://careers.costco.com/",
    destination: "careers.costco.com",
    keywords: ["costco", "warehouse", "distribution", "stocking"],
  },
  {
    slug: "dhl",
    name: "DHL",
    category: "Warehouse & Package Handling",
    industry: "Third-party logistics",
    roles: ["Warehouse associate", "Package handler", "Picker / packer", "Forklift operator"],
    pageUrl: "/employers/dhl",
    jobsUrl: "https://careers.dhl.com/global/en/c/warehouse-and-package-handling-jobs",
    destination: "careers.dhl.com",
    keywords: ["dhl", "warehouse", "package handling", "logistics", "distribution"],
  },
  {
    slug: "ryder",
    name: "Ryder",
    category: "Warehouse & Logistics",
    industry: "Third-party logistics",
    roles: ["Warehouse associate", "Forklift operator", "Material handler"],
    pageUrl: "/employers/ryder",
    jobsUrl: "https://www.ryder.com/en-us/careers",
    destination: "ryder.com",
    keywords: ["ryder", "warehouse", "logistics", "supply chain", "distribution"],
  },
  {
    slug: "gxo",
    name: "GXO",
    category: "Warehouse & Logistics",
    industry: "Third-party logistics",
    roles: ["Warehouse associate", "Picker / packer", "Forklift operator", "Inventory"],
    pageUrl: "/employers/gxo",
    jobsUrl: "https://gxo.com/careers/",
    destination: "gxo.com",
    keywords: ["gxo", "warehouse", "logistics", "supply chain", "distribution"],
  },
  {
    slug: "sysco",
    name: "Sysco",
    category: "Warehouse",
    industry: "Food distribution",
    roles: ["Order selector", "Forklift operator", "Shipping & receiving"],
    pageUrl: "/employers/sysco",
    jobsUrl: "https://careers.sysco.com/en/warehouse",
    destination: "careers.sysco.com",
    keywords: ["sysco", "warehouse", "food distribution", "distribution", "order selector"],
    featured: true,
  },
  {
    slug: "lineage",
    name: "Lineage",
    category: "Cold Storage & Warehouse",
    industry: "Cold storage",
    roles: ["Forklift operator", "Warehouse associate", "Order selector"],
    pageUrl: "/employers/lineage",
    jobsUrl: "https://careers.onelineage.com/us/en",
    destination: "careers.onelineage.com",
    keywords: ["lineage", "warehouse", "cold storage", "logistics", "distribution"],
  },
  {
    slug: "us-foods",
    name: "US Foods",
    category: "Warehouse",
    industry: "Food distribution",
    roles: ["Order selector", "Forklift operator", "Warehouse associate"],
    pageUrl: "/employers/us-foods",
    jobsUrl: "https://careers.usfoods.com/us/en/Warehouse",
    destination: "careers.usfoods.com",
    keywords: ["us foods", "warehouse", "food distribution", "distribution", "order selector"],
  },
  {
    slug: "grainger",
    name: "Grainger",
    category: "Warehouse & Distribution",
    industry: "Industrial supply",
    roles: ["Warehouse associate", "Picker / packer", "Shipping & receiving", "Inventory"],
    pageUrl: "/employers/grainger",
    jobsUrl: "https://jobs.grainger.com/",
    destination: "jobs.grainger.com",
    keywords: ["grainger", "warehouse", "distribution", "supply chain", "inventory"],
  },
  {
    slug: "fastenal",
    name: "Fastenal",
    category: "Warehouse & Distribution",
    industry: "Industrial supply",
    roles: ["Warehouse associate", "Shipping & receiving", "Inventory"],
    pageUrl: "/employers/fastenal",
    jobsUrl: "https://careers.fastenal.com/",
    destination: "careers.fastenal.com",
    keywords: ["fastenal", "warehouse", "distribution", "inventory", "shipping"],
  },
];

export function findEmployer(slug: string): Employer | undefined {
  return EMPLOYERS.find((employer) => employer.slug === slug);
}

// Where scam reports and employer requests are filed (public GitHub issues).
export const REPO_URL = "https://github.com/Nathan200000000/TheBox-WarehouseJobs";

export function newIssueUrl(title: string, body: string): string {
  const params = new URLSearchParams({ title, body });
  return `${REPO_URL}/issues/new?${params.toString()}`;
}
