import Provider from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css'
import Head from 'next/head';
export const metadata = {
  title: "Promtopia",
  description:
    "Q&A community for programmers , solving coding challenges, sharing knowledge.",
    icons: {
      icon: [
        {
          url: "/assets/images/logo.svg", // /public path
          href: "/assets/images/logo.svg", // /public path
        },
      ],
    },
};


export default function RootLayout({children}) {
  return (
   
      <html lang="en">
        <Head>
        
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add the following line to include your favicon */}
       
      </Head>
        <body>
        <Provider>  
          {children}
       </Provider>
       <Toaster />
        </body>
      </html>
   
  );
}
