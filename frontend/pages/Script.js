import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script src="./assets/vendor/@floating-ui/core/dist/floating-ui.core.umd.min.js" strategy="beforeInteractive" />
      <Script src="./assets/vendor/@floating-ui/dom/dist/floating-ui.dom.umd.min.js" strategy="beforeInteractive" />
      <Script src="./assets/vendor/preline/dist/index.js?v=3.0.1" strategy="afterInteractive" />
      <Script src="./assets/vendor/clipboard/dist/clipboard.min.js" strategy="afterInteractive" />
      <Script src="./assets/js/hs-copy-clipboard-helper.js" strategy="afterInteractive" />

      {/* Your page content here */}
      <div>
        {/* Your HTML for tabs + select dropdown goes here */}
        <TabsSync />
      </div>
    </>
  );
}
