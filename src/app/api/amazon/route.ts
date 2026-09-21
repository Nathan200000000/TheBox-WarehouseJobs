import { NextResponse } from "next/server";
import { buildAmazonSearchUrl } from "../../../lib/amazon/jobs";

export async function GET() {
  const searchUrl = buildAmazonSearchUrl(
    "warehouse",
    "Indianapolis, IN",
  );

  return NextResponse.json({
    company: "Amazon",
    source: "Amazon Jobs",
    category: "Fulfillment Center Warehouse Associate",
    searchUrl,
    status: "connected",
  });
}