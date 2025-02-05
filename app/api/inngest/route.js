import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  checkIsNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
  helloWorld,
} from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkIsNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
    helloWorld, // <-- This is where you'll always add all your functions
  ],
});
