"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "@/components/ui/button"
import useSound from 'use-sound';

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Volume2, Mic } from "lucide-react"

const wordVariants = cva(
  "hover:underline pointer",
  {
    variants: {
      variant: {
        default:
          "",
        secondary:
          "",
        destructive:
          "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface WordProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof wordVariants> {
}

function Word({ className, variant, ...props }: WordProps) {
  const wordRef = React.useRef(null);
  const [text, setText] = React.useState('')
  const [word, setWord] = React.useState('')
  const handleClick = async () => {
    const paragraph = wordRef.current.parentNode
    setText(paragraph.textContent)
    setWord(wordRef.current.textContent)
    const res = await fetch(`https://ia-barranquia.onrender.com/get-audio?word=${wordRef.current.textContent}`)
    const blob =  await res.blob() 
    const url = window.URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play()
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span ref={wordRef} className={cn(wordVariants({ variant }), className)} {...props} onClick={handleClick} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center">
              <span className="h-[1rem]">{word.toUpperCase()}</span>  <div className="flex gap-2"> <Button variant="ghost" className="w-6 h-6 px-0 outline-none ring-0">
            <Mic className="h-[1rem] w-[1rem]"/> </Button><Button variant="ghost" className="w-6 h-6 px-0 outline-none ring-0">
            <Volume2 className="h-[1rem] w-[1rem]"/> </Button></div> 
            </div>
          </DialogTitle>
          <DialogDescription>
            Parrafo - {text.slice(0, 50)}...
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 pb-0">
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { Word, wordVariants }
