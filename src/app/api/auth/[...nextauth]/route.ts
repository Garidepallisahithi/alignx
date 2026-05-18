import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const demoUsers = [
          {
            id: "1",
            name: "Employee User",
            email: "employee@alignx.com",
            password: "employee123",
            role: "EMPLOYEE",
          },
          {
            id: "2",
            name: "Manager User",
            email: "manager@alignx.com",
            password: "manager123",
            role: "MANAGER",
          },
          {
            id: "3",
            name: "Admin User",
            email: "admin@alignx.com",
            password: "admin123",
            role: "ADMIN",
          },
        ];

        const user = demoUsers.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = (user as any).role;
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.role = (token as any).role as string;

      return session;
    },
  },
});

export { handler as GET, handler as POST };