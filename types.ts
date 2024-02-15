import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithprofiles = Server & {
    members: (Member & {profile:Profile})[]
}