import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kyx-Nyx — Female Rap Artist, Switzerland',
    short_name: 'Kyx-Nyx',
    start_url: '/',
    display: 'standalone',
    background_color: '#07060a',
    theme_color: '#07060a',
    icons: [{src: '/icon.png', sizes: '512x512', type: 'image/png'}]
  };
}
