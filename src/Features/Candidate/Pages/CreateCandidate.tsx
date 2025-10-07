import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "@/Features/Candidate/Components/CreateCandidate/BasicInfoForm";
import EduInfoForm from "@/Features/Candidate/Components/CreateCandidate/EduInfoForm";
import PastExpForm from "@/Features/Candidate/Components/CreateCandidate/PastExpForm";
import { useState } from "react";

const CreateCandidate = () => {
  const [activeTab, setActiveTab] = useState("basic-info");

  return (
    <div className="bg-[#F4F4F5] p-2">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent gap-1 p-0">
          <TabsTrigger
            value="basic-info"
            className="bg-[#4682B4] text-white rounded-t-sm rounded-b-none font-normal data-[state=active]:bg-[#0E0D0D]"
          >
            Basic Information
          </TabsTrigger>
          <TabsTrigger
            value="edu-info"
            className="bg-[#4682B4] text-white rounded-t-sm rounded-b-none font-normal data-[state=active]:bg-[#0E0D0D]"
          >
            Educational Information
          </TabsTrigger>
          <TabsTrigger
            value="past-exp"
            className="bg-[#4682B4] text-white rounded-t-sm rounded-b-none font-normal data-[state=active]:bg-[#0E0D0D]"
          >
            Past Experience
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <BasicInfoForm setActiveTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="edu-info">
          <EduInfoForm setActiveTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="past-exp">
          <PastExpForm setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateCandidate;
