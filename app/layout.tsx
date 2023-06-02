import { getServerSession } from 'next-auth';
import './globals.css';
import Login from '@/components/Login';
import SideBar from '@/components/SideBar';
import { SessionProvider } from '@/components/SessionProvider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ClientProvider from '@/components/ClientProvider';

export const metadata = {
  title: 'Chat GPT Messenger',
  description: 'A new flavor of ChatGPT',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {
            !session 
              ? (<Login />) 
              : (
              <div className="flex">
                <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                  <SideBar />
                </div>
                
                <ClientProvider />

                <div className='bg-[#343541] flex-1'>
                  {children}
                </div>
              </div>
            )
          }
        </SessionProvider>
      </body>
    </html>
  );
};
