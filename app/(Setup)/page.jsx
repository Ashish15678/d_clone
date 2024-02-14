import { InitialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/InitialModal";
const Setuppage = async () => {
  const user = await InitialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: user.id,
        },
      },
    },
  });

  if (server) {
    redirect(`servers/${server.id}`);
  }

  return (
    <>
      <div>
        
        <InitialModal></InitialModal>
      </div>
    </>
  );
};
export default Setuppage;
