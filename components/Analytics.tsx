'use client';

import Script from 'next/script';

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!GA_MEASUREMENT_ID && !CLARITY_PROJECT_ID) {
    return null;
  }

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          {/* Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                custom_map: {
                  'custom_parameter_1': 'crowmancloud_user',
                  'custom_parameter_2': 'crowman_action'
                }
              });
              
              // Track Crowman-specific events
              gtag('event', 'page_view', {
                event_category: 'crowmancloud',
                event_label: 'crowman_platform_visit',
                custom_parameter_1: 'crowman_user',
                custom_parameter_2: 'page_view'
              });
            `}
          </Script>
        </>
      )}

      {CLARITY_PROJECT_ID && (
        <>
          {/* Microsoft Clarity */}
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
          </Script>
        </>
      )}
    </>
  );
}
