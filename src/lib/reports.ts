export type ScamReport = {
  id: string;
  createdAt: string;
  reporterName: string | null;
  reporterEmail: string;
  employer: string;
  link: string;
  details: string;
  flags: string[];
};
