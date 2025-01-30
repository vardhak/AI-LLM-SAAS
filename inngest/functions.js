import { inngest } from "./client";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const checkIsNewUser = inngest.createFunction(
  { id: "user-auth" },
  { event: "user.create" },
  async ({ event, step }) => {
    // get event data
    const result = step.run(
      "check user and create new if not exist",
      async () => {
        const result = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

        console.log(user);

        if (result?.length == 0) {
          // user not present
          const userRes = await db
            .insert(usersTable)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: usersTable.id });

          console.log(userRes);
          return userRes;
        }

        return result;
      }
    );

    return "Success";
  }
);
