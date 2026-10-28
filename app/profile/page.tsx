import type { Metadata } from "next";
import { MobileHeader } from "@/components/mobile-header";
import { ProfileForm } from "@/components/profile/profile-form";
import { TabBar } from "@/components/tab-bar";
import { requireUser } from "@/lib/auth";
import { toPersonDetails } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Profile · Cinema",
};

export default async function ProfilePage() {
  const { user } = await requireUser("/profile");
  const { phone, ...details } = toPersonDetails(user);

  return (
    <main>
      <MobileHeader title="Profile" />

      {/* pb-28 on phones leaves room for the fixed tab bar */}
      <div className="mx-auto flex max-w-page flex-col gap-6 px-4 pt-6 pb-28 md:px-[120px] md:pt-12 md:pb-16">
        <h1 className="hidden text-2xl leading-8 font-bold md:block">Profile</h1>
        <ProfileForm
          // Next keeps a visited page mounted and the form keeps its first values, so new
          // data from the server (after checkout, for example) remounts it.
          key={JSON.stringify(details)}
          phone={phone}
          defaultValues={details}
        />
      </div>

      <TabBar />
    </main>
  );
}
