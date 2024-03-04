import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/",
    error: "/",
  },
});

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
