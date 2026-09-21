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

export function buildAmazonSearchUrl(
  keyword = "warehouse",
  location = "Indianapolis, IN",
) {
  const params = new URLSearchParams({
    base_query: keyword,
    loc_query: location,
    country: "USA",
    sort: "recent",
  });

  return `https://www.amazon.jobs/en/search?${params.toString()}`;
}