import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  addPastExp,
  createCandidate,
  selectCandidateData,
} from "@/Features/Candidate/candidateSlices/candidate.slice";
import type { TPastExp } from "@/Features/Candidate/types/candidate.type";
import { pastExpZodSchema } from "@/Features/Candidate/validations/candidate.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface IProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const PastExpForm = ({ setActiveTab }: IProps) => {
  const candidateData = useAppSelector(selectCandidateData);
  const pastExpData = candidateData?.pastExp;
  const dispatch = useAppDispatch();
  const form = useForm<TPastExp>({
    resolver: zodResolver(pastExpZodSchema),
    defaultValues: {
      companyName: pastExpData?.companyName || "",
      designation: pastExpData?.designation || "",
      joiningDate: pastExpData?.joiningDate || "",
      expireDate: (pastExpData?.expireDate || "") as string | undefined,
      yearsOfExp: pastExpData?.yearsOfExp || "",
    },
  });

  const handleSubmit = async (data: TPastExp) => {
    try {
      const pastExp: Record<string, string | File> = {};

      for (const key in data) {
        const value = data[key as keyof typeof data];
        if (value !== "" && value !== null && value !== undefined) {
          pastExp[key] = value;
        }
      }
      dispatch(addPastExp(pastExp));
      dispatch(createCandidate());
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
            name="companyName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Company Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter Company name.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Designation <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Designation" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Designation.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joiningDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Joining Date <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="sr-only">
                  Enter your Joining Date.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expireDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Expire Date <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="sr-only">
                  Enter your Expire Date.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearsOfExp"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Years Of Experience <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Years Of Experience" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Years Of Experience.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 flex justify-end gap-2">
            <Button
              onClick={() => setActiveTab("edu-info")}
              type="button"
              className="bg-[#0E0D0D]"
            >
              Prev
            </Button>
            <Button className="bg-[#4682B4]">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PastExpForm;
