import React, { type ReactElement, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HeadFC, PageProps } from "gatsby";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppShell from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  type: z.enum(["pair", "straight", "flush", "threeOfAKind"], {
    required_error: "You need to select a notification type.",
  }),
});

const ContactPage: React.FC<PageProps> = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [message, setMessage] = useState<ReactElement | null>(null);
  const alpha = [
    "x",
    "y",
    "v",
    "u",
    "d",
    "g",
    "b",
    "j",
    "k",
    "m",
    "s",
    "o",
    "t",
    "l",
    "f",
    "p",
    "c",
    "@",
    "i",
    "e",
    "z",
    "n",
    "r",
    "h",
    "w",
    ".",
    "q",
    "a",
    "x",
  ];
  const code = [
    11, 15, 19, 21, 15, 11, 8, 19, 22, 12, 11, 11, 13, 10, 17, 5, 9, 27, 18, 13, 25, 16, 11, 9,
  ];

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (data.type === "flush") {
      let decodedMessage = "";
      for (let i = 0; i < code.length; i++) {
        decodedMessage += alpha[code[i]];
      }
      setMessage(
        <a className="mx-auto" href={`mailto:${decodedMessage}`}>
          {decodedMessage}
        </a>,
      );
    } else {
      toast({
        variant: "destructive",
        description: "Incorrect. Please try again.",
      });
    }
  };

  return (
    <AppShell>
      <div
        className="container rounded analysisview my-3 p-4 mx-auto flex"
        style={{ maxWidth: "360px" }}
      >
        {message === null ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-64 space-y-6 mx-auto">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Which of the following is the best hand?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pair" />
                          </FormControl>
                          <FormLabel className="font-normal">Pair</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="straight" />
                          </FormControl>
                          <FormLabel className="font-normal">Straight</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="flush" />
                          </FormControl>
                          <FormLabel className="font-normal">Flush</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="threeOfAKind" />
                          </FormControl>
                          <FormLabel className="font-normal">Three of a kind</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        ) : (
          message
        )}
      </div>
    </AppShell>
  );
};

export default ContactPage;

export const Head: HeadFC = () => (
  <>
    <title>OpenPokerTools.com - Contact Information</title>
    <meta name="description" content="Contact us, report a bug, suggest a feature." />
    <meta name="keywords" content="contact" />
    <meta name="language" content="english" />
  </>
);
