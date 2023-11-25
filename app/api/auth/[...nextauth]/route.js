import NextAuth from "next-auth";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user.model";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials:{},
            async authorize(credentials) {
                try {
                    if(!credentials || !credentials.email || !credentials.password) {
                        return null
                    }
                    const {email,password} = credentials;
                    await connectToDatabase()
                    const user = await User.findOne({email})
                    if(!user) {
                        return null
                    }
                    const passwordsMatch = await bcrypt.compare(password,user.password)
                    if(!passwordsMatch) {
                         return null
                    }
                    return user
                } catch (error) {
                    console.log(error)
                }
            }

        }),
       
   ],
   session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-up',
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectToDatabase()
        const sessionUser = await User.findOne({ email: session?.user.email });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.log(error);
      }
    },
    async signIn ({account}) {
        if(account?.provider === "credentials") {
            return true
        }else {
            return false;
        }
    }
  },

}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}