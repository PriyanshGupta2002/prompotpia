import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/userModel";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session;
    },

    
    async signIn({ profile }) {
      try {
        await connectToDb();
        const userExits = await User.findOne({ email: profile.email })
        if (!userExits) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            email: profile.email
          })
        }
        return true;
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }

})

export { handler as GET, handler as POST }