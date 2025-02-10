import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  checkIsNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
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
  ],
});
