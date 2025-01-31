import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import React from "react";

function TopicInput({setTopic,setDifLevel}) {
  return (
    <div className="capitalize mt-10 text-left">
      <h2 className="capitalize">
        enter topic for which you want to generate study material
      </h2>
      <Textarea placeholder="start typing here" className="mt-2 w-full" onChange={(event)=>setTopic(event.target.value)} />

      <h2 className="capitalize my-4">select the difficulty level</h2>

      <Select onValueChange={(value)=>setDifLevel(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="simple">simple</SelectItem>
          <SelectItem value="moderate">moderate</SelectItem>
          <SelectItem value="hard">hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
