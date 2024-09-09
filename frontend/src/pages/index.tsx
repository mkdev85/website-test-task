import React from 'react';

import { HomePage } from '@/components/HomePage/HomePage';
import { HomePageProps } from '@/components/HomePage/HomePage.props';

import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage<HomePageProps> = props => {
  return (
    <>
      <Head>
        <title>Monitoring Website</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
