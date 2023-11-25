import Provider from '@/components/Provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css'

export const metadata = {
  title: "Promtopia",
  description:
    "Q&A community for programmers , solving coding challenges, sharing knowledge.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};


export default function RootLayout({children}) {
  return (
   
      <html lang="en">
        <body>
        <Provider>  
          {children}
       </Provider>
       <Toaster />
        </body>
      </html>
   
  );
}
