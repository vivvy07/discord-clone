import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannnelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannnelIdPage = async ({
  params
}: ChannnelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }
  
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    }
  })

  if (!channel || !member) {
    redirect('/')
  }

  return (
    <div className="bg-whitw dark:bg-[#313338] flex flex-col h-full">
     <ChatHeader
     name={channel.name}
     serverId={channel.serverId}
     type="channel" />
    </div>
  )
}

export default ChannnelIdPage
