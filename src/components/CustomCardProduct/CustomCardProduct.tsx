import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

type CustomCardProductProps = {
  id: string
  title: string
  description?: string
  price: number
  imageUrl?: string
  href: string,
  customClass?:string
}

export function CustomCardProduct({
  id,
  title,
  description,
  price,
  imageUrl,
  href, customClass,
}: CustomCardProductProps) {
  return (
    <Card key={id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={cn("object-fit rounded-t-xl", customClass)}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}
        <p className="mt-2 text-base font-bold">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>Show more</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
