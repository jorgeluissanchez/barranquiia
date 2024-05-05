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
  const [text, setText] = React.useState('');
  const [word, setWord] = React.useState('');
  const [content, setContent] = React.useState(null);

  const handleSound = async () => {
    const res = await fetch(`http://localhost:8000/get-audio?word=${wordRef.current.textContent}`)
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play()
  }
  const handleCard = async () => {

    const paragraph = wordRef.current.parentNode
    setText(paragraph.textContent)
    setWord(wordRef.current.textContent)

    const res = await fetch(`http://localhost:8000/text-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        word: wordRef.current.textContent,
        context: paragraph.textContent
      })
    })
    const data = await res.json()
    console.log(data)
    setContent(data)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span ref={wordRef} className={cn(wordVariants({ variant }), className)} {...props} onClick={handleCard} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center">
              <span className="h-[1rem]">{word.toUpperCase()}</span>  <div className="flex gap-2"> <Button variant="ghost" className="w-6 h-6 px-0 outline-none ring-0" >
                <Mic className="h-[1rem] w-[1rem]" /> </Button><Button variant="ghost" className="w-6 h-6 px-0 outline-none ring-0" onClick={handleSound}>
                  <Volume2 className="h-[1rem] w-[1rem]" /> </Button></div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Parrafo - {text.slice(0, 50)}...
          </DialogDescription>
        </DialogHeader>
          {content && 
            <div className="font-normal">
              <span className="font-semibold">Traducción</span> 
              <p>{content.translations}</p>
              <span className="font-semibold">Ejemplos</span>
                {content.examples.map((example, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: example} } />
                ))}
              <span className="font-semibold">Pronunciación</span>
              <p>{content.pronuntations}</p>
            </div>
          }
      </DialogContent>
    </Dialog>
  )
}

export { Word, wordVariants }
