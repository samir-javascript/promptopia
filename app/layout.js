import Provider from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css'
import Head from 'next/head';
export const metadata = {
  title: "Promtopia",
  description:
    "Q&A community for programmers , solving coding challenges, sharing knowledge.",
  
};


export default function RootLayout({children}) {
  return (
   
      <html lang="en">
        <Head>
        
        
        {/* Add the following line to include your favicon */}
        <link rel="icon" href="/assets/images/logo.svg" />
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
