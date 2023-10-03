"use client"

import Screen from "@components/layout/Screen";
interface Props {
  params: { username: string };
}

export default function UserPage({ params: { username } }: Props) {
  return (
    <Screen>
        {username}
    </Screen>
  );
};
