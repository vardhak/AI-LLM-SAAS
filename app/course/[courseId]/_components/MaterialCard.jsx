import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { STUDY_DATA_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { and, eq, max } from "drizzle-orm";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function MaterialCard({
  item,
  studyTypeContent,
  courseId,
  chapters,
  reFreshCard,
  course,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let titles = "";
  chapters?.forEach(async (chapter) => {
    titles = titles + "," + chapter.chapterTitle;
  });

  const GenerateStudyContent = async () => {
    let maxLoad = 0;
    setLoading(true);
    toast({
      title: `${item.name} Status`,
      description: "Please allow 2-3 minutes for the resource to be generated.",
    });

    if (item.type == "notes") {
      try {
        const notesData = await axios.post("/api/gen-course-notes", {
          data: course,
        });

        let isDataReady = "";
        maxLoad = 0;
        while (isDataReady !== "Ready") {
          maxLoad = maxLoad + 1;

          if (maxLoad > 50) {
            toast({
              title: "Status",
              description:
                "There Is Error Generating The Notes. Please Try Again Later,Or Refresh The Page !",
            });
            break;
          }
          // const [result, setResult] = useState([{ status: "notready" }]);
          let result = [{ status: "notready" }];
          try {
            const result2 = await db
              .select()
              .from(STUDY_DATA_TABLE)
              .where(eq(STUDY_DATA_TABLE.courseId, courseId));
            if (result2.length != 0) result = result2;
          } catch (error) {
            console.error("Error checking data readiness:", error);
          }
          await new Promise((resolve) => setTimeout(resolve, 15000));

          console.log(result[0].status);
          isDataReady = result[0].status;
        }
        toast({
          title: `${item.name} Status`,
          description: `Your ${item.name} is ready !`,
        });
        reFreshCard(true);
      } catch (er) {
        console.error(er);
      }
    } else {
      try {
        const data = await axios.post("/api/gen-studytype-content", {
          courseId: courseId,
          studyType: item.type,
          chapters: titles,
        });

        // Assuming your API response is related to the studyTypeContent data.
        // If studyTypeContent is updated based on the API response, you can do that here.

        // Make sure the data was returned correctly
        if (data && data.data) {
          // You might want to update the studyTypeContent in the parent component
          // or use a callback here to trigger the state change.
          let isDataReadyCont = "";
          maxLoad = 0;
          while (isDataReadyCont !== "READY") {
            maxLoad = maxLoad + 1;

            if (maxLoad > 150) {
              toast({
                title: "Status",
                description: `There Is Error Generating The ${item.name}. Please Try Again Later,Or Refresh The Page !`,
              });
              break;
            }
            // const [result, setResult] = useState([{ status: "notready" }]);
            let resultContent = [{ status: "notready" }];
            try {
              const result2Content = await db
                .select()
                .from(STUDY_TYPE_CONTENT_TABLE)
                .where(
                  and(
                    eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE.type, item.type)
                  )
                );
              if (result2Content.length != 0) resultContent = result2Content;
            } catch (error) {
              console.error("Error checking data readiness:", error);
            }
            console.log(resultContent[0].status);
            isDataReadyCont = resultContent[0].status;
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
          reFreshCard(true);
        }
      } catch (errors) {
        console.error("Error generating study content:", errors);
      } finally {
        // setLoading(false);
      }
    }
  };

  return (
    <div
      className={`flex shadow-md rounded-lg p-5 flex-col items-center border max-sm:py-10 ${
        studyTypeContent?.[item.type] == null && "grayscale"
      }`}
    >
      {studyTypeContent?.[item.type] == null ? (
        <h2 className="px-2 bg-gray-500 rounded-full text-[10px] p-1 mb-2 text-white">
          Pending
        </h2>
      ) : (
        <h2 className="px-2 bg-green-500 rounded-full text-[10px] p-1 mb-2 text-white">
          Ready
        </h2>
      )}

      <Image src={item.icon} alt="item" width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.discription}</p>

      {studyTypeContent?.[item.type] == null  ? (
        <Button
          className="mt-3 w-full"
          variant="outline"
          onClick={GenerateStudyContent}
          disabled={loading}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          {loading == false ? "Generate" : "Generating..."}
        </Button>
      ) : (
        <Button
          className="mt-3 w-full"
          variant="outline"
          onClick={() => {
            router.push(`/course/${courseId}${item.path}`);
          }}
        >
          View
        </Button>
      )}
    </div>
  );
}

export default MaterialCard;
