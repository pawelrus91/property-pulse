import NextAuth, { CallbacksOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/config/database";
import { User as TUser } from "@/types";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing environment variables for GitHub");
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // Invoke on successful signIn
    async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne<TUser>({ email: profile?.email });
      // 3. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile?.name?.slice(0, 20);

        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modify the session object
    async session({ session, trigger }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session?.user?.email });
      // 2. Assign the user id to the session

      // @ts-ignore
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  } satisfies Partial<CallbacksOptions>,
};

export default NextAuth(authOptions);
