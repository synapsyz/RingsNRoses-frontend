'use client';
import { useEffect, useState } from "react";
import Header from '../components/header'
import Gridsection from '../components/gridsection'
import Slider from '../components/slider'
import Category from '../components/category'
import Featured from '../components/featured'
import Maincontent from '../components/maincontent'
import Footer from '../components/footer'
import Document from '../pages/_document'

export const metadata = {
  title: 'Rings N Roses',
  description:
    'A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.',
  metadataBase: new URL('https://preline.co'),
  openGraph: {
    url: 'https://preline.co/',
    title: 'Rings N Roses',
    description:
      'A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.',
    images: [
      {
        url: 'https://preline.co/assets/img/og-image.png',
        width: 800,
        height: 600,
        alt: 'Rings N Roses',
      },
    ],
    siteName: 'Preline',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@preline',
    creator: '@preline',
    title: 'Rings N Roses',
    description:
      'A modern eCommerce template for multi-vendor stores with an advanced Mega Menu, filtering, and seamless browsing.',
    images: ['https://preline.co/assets/img/og-image.png'],
  },
};
function TabsSync() {
  useEffect(() => {
    const select = document.getElementById('hs-catalog-sidebar-nav-select');
    const tabs = document.querySelectorAll('[data-hs-tab]');

    if (!select || tabs.length === 0) return;

    const handleChange = (e) => {
      const tabId = e.target.value;
      const tabToClick = document.querySelector(`[data-hs-tab="${tabId}"]`);
      if (tabToClick) {
        tabToClick.click(); // trigger tab switch
      }
    };

    select.addEventListener('change', handleChange);

    return () => {
      select.removeEventListener('change', handleChange);
    };
  }, []);

  return null; // This component only applies side effects
}
 const handlePrelineLoad = () => {
    const el = document.querySelector('[data-hs-carousel]');
    if (el && window.HSCarousel) {
      window.HSCarousel.autoInit(el);
    }
  };
export default function Home() {
  return (
    <>
   
      {/* <Document /> */}
      <Header />
      <Gridsection />
      <Slider />   
      <Category />
      <Featured />
      <Maincontent />
      <Footer />
      <div>
        {/* Your HTML for tabs + select dropdown goes here */}
        <TabsSync />
      </div>
    </>
  );

}

