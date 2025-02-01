import { db } from "@/configs/db";
import { inngest } from "./client";
import { usersTable } from "@/configs/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const demo = inngest.createFunction(
  { id: "demo" },
  { event: "add-data" },
  async ({ event, step }) => {
    const user = event.data;
    step.run("demo", async () => {
      db.insert(usersTable).values({
        id: 12344,
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });

      return "inserted";
    });
    return "suucess";
  }
);

// export const checkIsNewUser = inngest.createFunction(
//   { id: "user-auth" },
//   { event: "create-new-user" },
//   async ({ event, step }) => {
//     // get event data

//     const { user } = event.data;
//     step.run("check user and create new if not exist", async () => {
//       // check if user exits

//       const result = await db
//         .select()
//         .from(usersTable)
//         .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

//       console.log(user);

//       if (result.length == 0) {
//         // user not present
//         const userRes = await db
//           .insert(usersTable)
//           .values({
//             name: user?.fullName,
//             email: user?.primaryEmailAddress?.emailAddress,
//           })
//           .returning({ id: usersTable.id });

//         console.log(userRes);
//       }
//       return "hel";
//     });
//     return "Success";
//   }
// );
