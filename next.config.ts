import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~30-50% lighter than WebP on photos), WebP fallback
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75]
  }
};

export default withNextIntl(nextConfig);
