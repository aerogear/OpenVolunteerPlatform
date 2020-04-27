import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Terminal } from '../components/Terminal';
import { Video } from '../components/Video';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="Open Volunteer Platform <head />">
      <Hero siteConfig={siteConfig} />
      <Features />
      <Terminal />
      <Video />
    </Layout>
  );
}

export default Home;
