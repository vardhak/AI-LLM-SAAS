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

    // const result = await db
    //   .select()
    //   .from(usersTable)
    //   .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

    // console.log(user);

    // if (result?.length == 0) {
    //   // user not present
    //   const userRes = await db
    //     .insert(usersTable)
    //     .values({
    //       name: user?.fullName,
    //       email: user?.primaryEmailAddress?.emailAddress,
    //     })
    //     .returning({ id: usersTable.id });

    //   console.log(userRes);
    // }

    // const resp = axios.post("api/create-user", { user: user });
    // console.log((await resp).data);
  };


  return <div>{children}</div>;
}

export default Provider;
