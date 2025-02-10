import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function CousreStatus({ avCredits, Credits }) {
  return (
    <div className="p-3 bg-slate-100 border rounded-lg  w-[95%] md:mt-20 mt-3">
      <h2 className="text-lg mb-2">
        available credites : {avCredits - Credits}
      </h2>
      <Progress value={(Credits / avCredits) * 100} />
      <h2 className="text-sm">
        {Credits} out of {avCredits} credites used
      </h2>

      <Link
        href={"dashboard/upgradePlan"}
        className="text-xs text-primary mt-3"
      >
        upgrade for more
      </Link>
    </div>
  );
}

export default CousreStatus;
