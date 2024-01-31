import Head from 'next/head';
import messages from '../texts';

export default function Header() {

  return (
    <Head>
      <title>{messages.heding}</title>
      <meta name="description" content="Currency Search by country" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
