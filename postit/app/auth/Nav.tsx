import Link from "next/link";

import Login from "./Login";
import Logged from "./Logged";

import getSessionData from "../hooks/getSessionStatus";

export default async function Nav() {
  const session = await getSessionData();

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Send it.</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user ? (
          <Login />
        ) : (
          <Logged image={session.user?.image || ""} />
        )}
      </ul>
    </nav>
  );
}
