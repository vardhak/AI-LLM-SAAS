import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  checkIsNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
  helloWorld,
  upgradeCredits,
} from "../../../inngest/functions";

export const runtime = "edge";

export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming: "allow",
  functions: [
    checkIsNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
    upgradeCredits,
    helloWorld, // <-- This is where you'll always add all your functions
  ],
});
