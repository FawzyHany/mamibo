import React from 'react'
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  CustomClass?:string;
}

export const Container:React.FC<Props>  = ({children, CustomClass}) => {
  return (
    <div className={cn('mx-auto mt-20 w-[80%] p-10', CustomClass)}>
      {children}
    </div>
  )
}
