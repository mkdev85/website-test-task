import React from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';

import { WebsitesPage } from '@/components/WebsitesPage/WebsitesPage';
import { WebsitesPageProps } from '@/components/WebsitesPage/WebsitesPage.props';

const Websites: NextPage<WebsitesPageProps> = () => {
  return (
    <>
      <Head>
        <title>Website Monitoring</title>
      </Head>
      <WebsitesPage />
    </>
  );
};

export default Websites;
