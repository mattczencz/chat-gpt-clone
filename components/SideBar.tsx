'use client';

import { signOut, useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import NewChat from './NewChat';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';

function SideBar() {
  const { data: session } = useSession();

  const [ chats, loading, error ] = useCollection(
    session && query(
      collection(db, 'users', session.user?.email!, 'chats'),
      orderBy('createdAt', 'asc')
    )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New Chat button */}
          <NewChat />

          <div className="hidden sm:inline">
            {/* Model selection */}
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {
              loading && (
                <div className="animate-pulse text-center text-white">
                  <p>Loading Chats...</p>
                </div>
              )
            }

            {/* Map through chat */}
            {
              chats?.docs.map(chat => (
                <ChatRow key={chat.id} id={chat.id} />
              ))
            }
          </div>
        </div>
      </div>

      {
        session && (
          <div onClick={() => signOut()} className="hover:opacity-50 transition-opacity duration-200 mb-2">
            <img
              src={session.user?.image!}
              alt="profile image"
              className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2"
            />
            <p className="text-center text-white text-base">Sign Out</p>
          </div>
        )
      }
    </div>
  );
};

export default SideBar;