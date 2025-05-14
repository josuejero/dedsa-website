import { CommonContent } from '@/types/content';

const commonContent: CommonContent = {
  navigation: {
    items: [
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'What We Stand For', href: '/what-we-stand-for' },
      { name: 'Calendar', href: '/calendar' },
      { name: 'Leadership & Structure', href: '/leadership' },
      { name: 'Committees & Working Groups', href: '/committees' },
      { name: 'Bylaws', href: '/bylaws' },
      { name: 'Contact', href: '/contact' },
      { name: 'UD YDSA', href: '/ud-ydsa' },
    ],
  },
  cta: {
    join: 'Join Our Chapter',
    newsletter: 'Subscribe to Newsletter',
    events: 'Attend an Event',
  },
  footer: {
    copyright: '© 2025 Delaware DSA. All rights reserved.',
    links: {
      learn: [
        { name: 'About Us', href: '/about' },
        { name: 'What We Stand For', href: '/what-we-stand-for' },
        { name: 'Leadership', href: '/leadership' },
        { name: 'Bylaws', href: '/bylaws' },
      ],
      getInvolved: [
        { name: 'Join DSA', href: '/join' },
        { name: 'Committees', href: '/committees' },
        { name: 'Events', href: '/calendar' },
        { name: 'Newsletter', href: '/newsletter' },
      ],
      resources: [
        { name: 'Membership Handbook', href: '/handbook' },
        { name: 'Voting Guide', href: '/voting-guide' },
        { name: 'UD YDSA', href: '/ud-ydsa' },
        { name: 'Contact', href: '/contact' },
      ],
    },
  },
};

export default commonContent;
