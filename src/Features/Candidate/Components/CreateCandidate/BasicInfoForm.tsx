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
import { Textarea } from "@/components/ui/textarea";
import {
  addBasicInfo,
  selectCandidateData,
} from "@/Features/Candidate/candidateSlices/candidate.slice";
import type { TBasicInfo } from "@/Features/Candidate/types/candidate.type";
import {
  ACCEPTED_MIME_TYPES,
  basicInfoZodSchema,
} from "@/Features/Candidate/validations/candidate.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const BasicInfoForm = ({ setActiveTab }: IProps) => {
  const candidateData = useAppSelector(selectCandidateData);
  const basicData = candidateData?.basicInfo;
  const dispatch = useAppDispatch();
  const [picture, setPicture] = useState<File | null>(
    basicData?.picture || null
  );
  const form = useForm<TBasicInfo>({
    resolver: zodResolver(basicInfoZodSchema),
    defaultValues: {
      firstName: basicData?.firstName || "",
      lastName: basicData?.lastName || "",
      email: basicData?.email || "",
      phone: basicData?.phone || "",
      altPhone: basicData?.altPhone || "",
      ssn: basicData?.ssn || "",
      presentAddress: basicData?.presentAddress || "",
      permanentAddress: basicData?.permanentAddress || "",
      state: basicData?.state || "",
      city: basicData?.city || "",
      zipCode: basicData?.zipCode || "",
      picture:
        (typeof basicData?.picture !== "string" && basicData?.picture) ||
        undefined,
    },
  });

  const handleSubmit = async (data: TBasicInfo) => {
    try {
      const basicInfo: Record<string, string | File> = {};

      for (const key in data) {
        const value = data[key as keyof typeof data];
        if (value !== "" && value !== null && value !== undefined) {
          basicInfo[key] = value;
        }
      }
      setActiveTab("edu-info");

      dispatch(addBasicInfo(basicInfo));
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
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your first name.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Last name.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Email.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Phone <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Phone.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altPhone"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Alternative Phone
                </FormLabel>
                <FormControl>
                  <Input placeholder="Alternative Phone" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Alternative Phone.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ssn"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  SSN
                </FormLabel>
                <FormControl>
                  <Input placeholder="SSN" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your SSN.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="presentAddress"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Present Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Present Address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your present address
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permanentAddress"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Permanent Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Permanent Address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Permanent address
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  State
                </FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your State.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  City
                </FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your City.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Zip Code" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Zip Code.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="picture"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, ...rest } }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Picture
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Picture"
                    className="file:me-3 file:border file:border-[#767676] file:bg-[#EFEFEF]  file:px-3 file:rounded-xs"
                    accept=".png, .jpg, .jpeg,"
                    {...rest}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      rest.onChange(file);
                      if (file && ACCEPTED_MIME_TYPES.includes(file.type))
                        setPicture(file || null);
                    }}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Choose your Picture.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          {picture && (
            <div className="mb-2 grid grid-cols-[1fr_3fr] gap-4">
              <div className="text-right">Preview</div>
              <img
                src={
                  picture instanceof File
                    ? URL.createObjectURL(picture)
                    : picture
                }
                alt="Current profile"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <Button className="bg-[#4682B4]">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicInfoForm;
