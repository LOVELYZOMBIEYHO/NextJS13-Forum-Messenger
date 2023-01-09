import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

// ---unstable_getServerSession
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
// ------

async function SignInpage() {
  const providers = await getProviders();
  //   const providers = getProviders();

  const session = await unstable_getServerSession(authOptions);

  return (
    <div className="grid justify-center">
      <div className="grid justify-center">
        <Image
          className="rounded-full mx-2 object-cover"
          width={70}
          height={70}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/300px-Facebook_Messenger_logo_2020.svg.png"
          alt="Messenger Icon"
        />
      </div>
      <SignInComponent providers={providers} session={session} />
    </div>
  );
}

export default SignInpage;
