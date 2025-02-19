"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between mb-16 pt-3 w-full">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="MPrompt"
          height={30}
          width={30}
          className="object-contain"
        />
        <p className="logo_text">MPrompt</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                height={37}
                width={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >Sign In</button>
              ))}
          </>
        )}
      </div>

      {console.log(session?.user)}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              height={37}
              width={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
                <div className="dropdown">
                    <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>My Profile</Link>
                    <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropDown(false)}>Create Prompt</Link>
                    <button type="button" className="mt-5 black_btn w-full" onClick={() => {
                        setToggleDropDown(false);
                        signOut;}
                        }>Sign Out</button>
                </div>
            )}

          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  
                >Sign In</button>
              ))}

          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
