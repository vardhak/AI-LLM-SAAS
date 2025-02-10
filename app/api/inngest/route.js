import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  checkIsNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
  helloWorld,
  upgradeCredits,
} from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkIsNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
    upgradeCredits,
    helloWorld, // <-- This is where you'll always add all your functions
  ],
});
