/* Project data — to add a project, append one object. main.js renders everything from this array.
   category: 'commercial' | 'personal-brand' | 'documentary' | 'motion-graphics'
   format:   'reel' (9:16 vertical)  | 'long' (16:9)
   poster:   base path WITHOUT size suffix or extension, e.g. 'assets/posters/dubai' → main.js uses
             dubai-400.webp / dubai-800.webp / dubai-1200.webp in srcset. null → gradient placeholder.
   youtubeId: the 11-char YouTube video id. */
window.PROJECTS = [
  {
    id: 'dubai',
    title: 'A Different Side of Dubai.',
    category: 'documentary',
    format: 'long',
    duration: '12:43',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Travel', 'Storytelling', 'Editing'],
    featured: true,
    client: 'Personal Project',
    description: 'A cinematic travel documentary showing a different side of Dubai beyond the mainstream.'
  },
  {
    id: 'mango-food',
    title: 'Mango – Food Campaign',
    category: 'commercial',
    format: 'reel',
    duration: '00:28',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Motion Graphics', 'Social Media'],
    featured: false,
    client: 'Mango',
    description: 'A punchy vertical campaign edit built for social feeds, cut for scroll-stopping pace.'
  },
  {
    id: 'creator-content',
    title: 'Creator Content (YouTube)',
    category: 'personal-brand',
    format: 'long',
    duration: '08:15',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Captions', 'Visuals'],
    featured: false,
    client: 'Independent Creator',
    description: 'Long-form YouTube edit balancing pacing, captions, and visual storytelling for retention.'
  },
  {
    id: 'product-launch',
    title: 'Product Launch',
    category: 'commercial',
    format: 'long',
    duration: '00:36',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Color', 'Sound Design'],
    featured: false,
    client: 'Tech Brand',
    description: 'A sleek product reveal film with graded color and layered sound design.'
  },
  {
    id: 'outdoor-brand',
    title: 'Outdoor Brand',
    category: 'personal-brand',
    format: 'reel',
    duration: '00:45',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Music', 'Storytelling'],
    featured: false,
    client: 'Outdoor Brand',
    description: 'A music-led vertical short built around a single creator moment in the wild.'
  },
  {
    id: 'brand-film',
    title: 'Brand Film — Ideas Into Impact',
    category: 'motion-graphics',
    format: 'long',
    duration: '00:40',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Motion', 'Design'],
    featured: false,
    client: 'Studio Client',
    description: 'A motion-driven brand film pairing kinetic type with a confident voiceover.'
  },
  {
    id: 'pxi-furniture',
    title: 'PXI Furniture — Product Reel',
    category: 'commercial',
    format: 'reel',
    duration: '00:22',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Color', 'Social Media'],
    featured: false,
    client: 'PXI Furniture',
    description: 'Fast vertical product cuts for a furniture brand’s social launch.'
  },
  {
    id: 'viral-media-hooks',
    title: 'Viral Media Hooks Pack',
    category: 'personal-brand',
    format: 'reel',
    duration: '00:33',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Editing', 'Scripting', 'Retention'],
    featured: false,
    client: 'Personal Brand Client',
    description: 'A pack of hook-first vertical edits designed to stop the scroll in the first second.'
  },
  {
    id: 'cairo-streets',
    title: 'Cairo Streets',
    category: 'documentary',
    format: 'reel',
    duration: '00:38',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Travel', 'Sound Design', 'Color'],
    featured: false,
    client: 'Personal Project',
    description: 'A short documentary-style vertical piece capturing daily life on the streets of Cairo.'
  },
  {
    id: 'kinetic-type-promo',
    title: 'Kinetic Type Promo',
    category: 'motion-graphics',
    format: 'reel',
    duration: '00:25',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Motion', 'Design', 'Typography'],
    featured: false,
    client: 'Studio Client',
    description: 'A vertical promo built entirely around kinetic typography and rhythm.'
  },
  {
    id: 'founder-story',
    title: 'Founder Story',
    category: 'documentary',
    format: 'long',
    duration: '06:12',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Interview', 'Storytelling', 'Editing'],
    featured: false,
    client: 'Startup Client',
    description: 'An intimate long-form interview edit tracing a founder’s journey from idea to launch.'
  },
  {
    id: 'logo-reveal-pack',
    title: 'Logo Reveal Pack',
    category: 'motion-graphics',
    format: 'reel',
    duration: '00:15',
    poster: null,
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['Motion', 'Design', 'Branding'],
    featured: false,
    client: 'Studio Client',
    description: 'A quick vertical logo reveal pack for social-first brand intros.'
  }
];
