"use client"
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";


export default function Counter({count, setCount, maxCount} : {count: number, setCount: Dispatch<SetStateAction<number>>, maxCount: number}) {

  return (
    <>
      <div className="flex h-11 items-center rounded-lg border border-input">
        <Button
          onClick={()=>setCount((current)=>Math.max(1, current - 1))}
          disabled={count <= 1}
          variant="ghost"
          size="icon"
          aria-label="Decrease quantity"
        >
          <Minus />
        </Button>
        <span className="min-w-10 text-center">{count}</span>
        <Button
          onClick={()=>setCount((current)=>Math.min(maxCount, current + 1))}
          disabled={count >= maxCount}
          variant="ghost"
          size="icon"
          aria-label="Increase quantity"
        >
          <Plus />
        </Button>
      </div>
    </>
  );
}
