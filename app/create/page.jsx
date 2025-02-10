"use client";
import { useEffect, useState } from "react";
import SelectOption from "./_components/selectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/topicInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, LoaderPinwheel } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function CreatePage() {
  const { user } = useUser();

  useEffect(() => {
    if (user) console.log(user.fullName);
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState([]);
  const handleUserInput = (fieldname, fieldvalue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldname]: fieldvalue,
    }));

    console.log(formData);
  };

  const [step, setStep] = useState(0);

  const router = useRouter();

  // uses to save user input and generate course layout using ai
  const generateCourseOutline = async () => {
    setIsLoading(true);
    const courseId = uuidv4();

    try {
      const response = await axios.post("/api/generate-course-outline", {
        _courseId: courseId,
        _topic: formData.topic,
        _courseType: formData.studyType,
        _difficultyLevel: formData.difLevel,
        _createdBy: user?.primaryEmailAddress.emailAddress,
        _date: new Date().toISOString(),
      });

      toast({
        title: "Course Status",
        description: "Your Course Is Now Ready !",
      });
      setIsLoading(false);
      router.replace("/dashboard");
    } catch (e) {
      toast({
        title: "Course Status",
        description: "Your Course Is Not Generated There Is Some Error!",
      });
      console.error(e);
    }

    // console.log(result.data);
    // console.log(result);
  };

  return (
    <div className=" flex flex-col items-center p-5 md:px-24 lg:px-32  mt-20 capitalize text-center">
      <h2 className="font-bold text-4xl text-primary">
        start building your personal study material
      </h2>
      <p className="text-gray-500 text-lg">
        fill all details in order to generate study material for your next
        project
      </p>

      <div className="mt-10">
        {step == 0 ? (
          <SelectOption
            selectedStudyType={(value) => {
              handleUserInput("studyType", value);
            }}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifLevel={(value) => handleUserInput("difLevel", value)}
          />
        )}
      </div>

      <div className="flex justify-between  w-full capitalize mt-10">
        {step != 0 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            previous
          </Button>
        ) : (
          <Button variant="outline" disabled>
            previous
          </Button>
        )}

        {step == 0 ? (
          <Button onClick={() => setStep(step + 1)}>next</Button>
        ) : (
          <Button disabled={isLoading} onClick={generateCourseOutline}>
            {isLoading ? (
              <>
                <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreatePage;
