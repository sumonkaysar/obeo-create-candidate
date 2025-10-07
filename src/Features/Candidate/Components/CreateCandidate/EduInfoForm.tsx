import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addEduInfo,
  selectCandidateData,
} from "@/Features/Candidate/candidateSlices/candidate.slice";
import type { TEduInfo } from "@/Features/Candidate/types/candidate.type";
import { eduInfoZodSchema } from "@/Features/Candidate/validations/candidate.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface IProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const EduInfoForm = ({ setActiveTab }: IProps) => {
  const candidateData = useAppSelector(selectCandidateData);
  const eduData = candidateData?.eduInfo;
  const dispatch = useAppDispatch();
  const form = useForm<TEduInfo>({
    resolver: zodResolver(eduInfoZodSchema),
    defaultValues: {
      examName: eduData?.examName || "",
      institution: eduData?.institution || "",
      roll: eduData?.roll || "",
      registrationNo: eduData?.registrationNo || "",
      result: eduData?.result || "",
      passingYear: eduData?.passingYear || "",
    },
  });

  const handleSubmit = async (data: TEduInfo) => {
    try {
      const eduInfo: Record<string, string | File> = {};

      for (const key in data) {
        const value = data[key as keyof typeof data];
        if (value !== "" && value !== null && value !== undefined) {
          eduInfo[key] = value;
        }
      }
      setActiveTab("past-exp");
      dispatch(addEduInfo(eduInfo));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xs mx-auto border">
      <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
        New Candidate
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 px-6 py-4"
        >
          <FormField
            control={form.control}
            name="examName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Exam Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Exam Name" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter Exam name.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Institution <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Institution" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Institution.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roll"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Roll <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Roll" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Roll.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNo"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Registration No <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Registration No" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Registration No.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Result <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Result" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Result.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passingYear"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Passing Year <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Passing Year" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Passing Year.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 flex justify-end gap-2">
            <Button
              onClick={() => setActiveTab("basic-info")}
              type="button"
              className="bg-[#0E0D0D]"
            >
              Prev
            </Button>
            <Button className="bg-[#4682B4]">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EduInfoForm;
