/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Head from 'next/head';
// import Paperbase from '../components/paperbase/Paperbase';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  );
}
