/**
 * Single source of truth for the artist's identity.
 * Edit here: name, contact, social profiles. Used by pages, metadata and JSON-LD.
 */
export const site = {
  name: 'Kyx-Nyx',
  // Former names — kept so Google links old searches to the new name
  alternateNames: ['Thug-W-Angel', 'TwA', 'Thugwangel', 'Kyx Nyx', 'KyxNyx'],
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://thug-angel.ch').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_BOOKING_EMAIL || 'info@thug-angel.ch',
  country: 'CH',
  countryName: 'Switzerland',
  genres: ['Rap', 'Hip-hop', 'Melodic rap', 'Alternative hip-hop', 'Cinematic rap'],
  ogImage: '/images/og-kyx-nyx.jpg',
  portrait: '/images/kyx-nyx-portrait-bw.jpg',
  /**
   * Official profiles (Instagram, Spotify, YouTube channel, TikTok, SoundCloud, Bandcamp…).
   * Add full URLs here — they feed the footer AND the schema.org `sameAs`
   * (key signal for Google's Knowledge Graph). Leave empty rather than guess.
   */
  socials: [
    // { label: 'Instagram', url: 'https://www.instagram.com/…' },
    // { label: 'Spotify', url: 'https://open.spotify.com/artist/…' },
    // { label: 'YouTube', url: 'https://www.youtube.com/@…' },
  ] as {label: string; url: string}[],
  youtubeChannel: '' // e.g. https://www.youtube.com/@kyxnyx
};

export const tracks = [
  {title: 'Cheating Cheating Lior', src: '/music/track_01.mp3'},
  {title: 'Digital Maze', src: '/music/track_02.mp3'},
  {title: 'Paisa 247', src: '/music/track_03.mp3'},
  {title: 'Rack 12', src: '/music/track_04.mp3'},
  {title: 'Rhyme Gring', src: '/music/track_05.mp3'},
  {title: 'Too Late To', src: '/music/track_06.mp3'},
  {title: 'The M', src: '/music/track_07.mp3'},
  {title: 'Silent Observer', src: '/music/track_08.mp3'},
  {title: 'Shopify Song', src: '/music/track_09.mp3'},
  {title: 'Onward', src: '/music/track_10.mp3'},
  {title: 'Come To Me', src: '/music/track_11.mp3'}
];

export const videos = [
  {id: 'caw4j4-tW_0'},
  {id: 'dC9V6jDHkmQ'},
  {id: '6xzEoAtL-JA'},
  {id: 'qX7zkkMJxs4'}
];

export const photos = [
  {
    src: '/images/kyx-nyx-portrait-bw.jpg',
    press: '/images/kyx-nyx-portrait-bw-press.jpg',
    w: 1600,
    h: 2400,
    alt: 'Kyx-Nyx, female rap artist based in Switzerland — black and white portrait by a lake'
  },
  {
    src: '/images/kyx-nyx-portrait-colour.jpg',
    press: '/images/kyx-nyx-portrait-colour-press.jpg',
    w: 1600,
    h: 1600,
    alt: 'Kyx-Nyx, Swiss-based English-language rapper — colour portrait outdoors'
  }
];

export const regions = [
  'Lausanne', 'Genève', 'Fribourg', 'Neuchâtel', 'Sion', 'Bern', 'Zürich', 'Basel', 'Luzern', 'Lugano'
];
