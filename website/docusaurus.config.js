// const versions = require('./versions.json');

module.exports = {
  title: 'Open Volunteer Platform',
  tagline: 'Optimize and Organize Work of Volunteers',
  url: 'https://openvolunteer.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'aerogear', // Usually your GitHub org/user name.
  projectName: 'OpenVolunteerPlatform', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    disableDarkMode: true,
    prism: {
      // eslint-disable-next-line
      theme: require('prism-react-renderer/themes/github'),
      // theme: require('prism-react-renderer/themes/dracula'),
      defaultLanguage: 'javascript',
    },
    navbar: {
      title: 'OpenVolunteerPlatform',
      logo: {
        alt: 'OpenVolunteerPlatform Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/gettingstarted',
          label: `Docs`,
          position: 'right',
        },
        {
          href: 'https://github.com/aerogear/OpenVolunteerPlatform',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/gettingstarted',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/mJ7j84m',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/aerogear/OpenVolunteerPlatform',
            },
          ],
        },
      ],
      logo: {
        alt: 'AeroGear Logo',
        src: 'img/aerogear.png',
        href: 'https://aerogear.org/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} AeroGear`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/aerogear/OpenVolunteerPlatform/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
