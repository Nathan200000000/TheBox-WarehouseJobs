export const AMAZON_FULFILLMENT_JOBS_URL =
  "https://www.amazon.jobs/content/en/job-categories/fulfillment-center-warehouse-associate";

export const AMAZON_INDIANAPOLIS_JOBS_URL =
  "https://www.amazon.jobs/en/location/indianapolis";

export type AmazonJob = {
  id: string;
  title: string;
  location: string;
  url: string;
  source: "Amazon Jobs";
};

export const amazonSource = {
  company: "Amazon",
  category: "Fulfillment Center Warehouse Associate",
  jobsUrl: AMAZON_FULFILLMENT_JOBS_URL,
  locationUrl: AMAZON_INDIANAPOLIS_JOBS_URL,
};