"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export function ChatToggle() {
  const [messages, setMessages] = React.useState([
    {
      author: "yo",
      message: "Hola! ¿Cómo estás?",
      time: "11:46"
    }, {
      author: "bot",
      message: "Hola! ¿Cómo estás?",
      time: "11:46"
    }, {
      author: "bot",
      message: "Hola! ¿Cómo estás?",
      time: "11:46"
    },
    {
      author: "yo",
      message: "Hola! ¿Cómo estás?",
      time: "11:46"
    },
    {
      author: "yo",
      message: "Hola! ¿Cómo estás?",
      time: "11:46"
    }
  ])


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-10 px-0">
          <Bot className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Bot className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Chat</DrawerTitle>
          <DrawerDescription>Compa! Háblame con confianza</DrawerDescription>
        </DrawerHeader>
        <div className="grid p-4 gap-4 h-52 overflow-y-auto">
          {
            messages.map((item) => (
              <div className={item.author == "yo" ? "flex justify-end" : "flex justify-start"}>
                <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 ${item.author == "bot" ? "rounded-e-xl rounded-es-xl":"rounded-s-xl rounded-ee-xl"} dark:bg-gray-700`}>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.author == "yo" ? "Yo" : "Bot"}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
        <DrawerFooter>
          <Button>Enviar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
