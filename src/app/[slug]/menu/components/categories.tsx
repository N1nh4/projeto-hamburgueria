"use client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma, Restaurant } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: { products: true };
            };
        };
    }>
};

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-2xl border bg-white p-5">
            <div className="flex items-center gap-3  ">
                <Image
                    src={restaurant.avatarImageUrl}
                    alt={restaurant.name}
                    height={45}
                    width={45}
                    className="object-cover"
                />
                <div>
                    <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                    <p className="text-xs opacity-55">{restaurant.description}</p>
                </div>
            </div> 
            <div className="mt-3 flex items-center gap-1 text-xs text-green-500 ">
                <ClockIcon size={12}/>
                <p>Aberto!</p>
            </div>

            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4">
                    {restaurant.menuCategories.map(category => <p>{category.name}</p>)}
                </div>
                <ScrollBar orientation="horizontal" />

            </ScrollArea>
        </div>
    );
}

export default RestaurantCategories;