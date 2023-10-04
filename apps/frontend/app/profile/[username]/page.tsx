"use client"

import Screen from "@components/layout/Screen";
interface Props {
  params: { username: string };
}

export default function UserPage({ params: { username } }: Props) {
    // Todo: check auth
  return (
    <Screen>
        User {username}
    </Screen>
  );
};
