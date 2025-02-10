"use client";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();
  useEffect(() => {
    user && checkIsNewUser();
  }, [user]);

  const checkIsNewUser = async () => {
    // check if user exits
    console.log(user);

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

    console.log(user);

    if (result?.length == 0) {
      // user not present
      let name = user?.fullName;
      if (name == null) {
        name = user?.firstName;
        if (name == null) {
          name == user?.primaryEmailAddress?.emailAddress;
          if (name == null) {
            name = "abc";
          }
        }
      }
      const userRes = await db
        .insert(usersTable)
        .values({
          name: name,
          email: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ id: usersTable.id });

      console.log(userRes);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
