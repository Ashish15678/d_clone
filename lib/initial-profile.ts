import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const InitialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    redirectToSignIn();
  }
  const profile = await db.profile.findUnique({
    where: {
      userid: user?.id,
    },
  });

  if (profile) {
    return profile;
  } else {
    const newprofile = await db.profile.create({
      data: {
        userid: user?.id,
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.emailAddresses[0].emailAddress,
        imageurl: user?.imageUrl,
      },
    });

    return newprofile;
  }
};
