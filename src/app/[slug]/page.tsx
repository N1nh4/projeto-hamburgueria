import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumpitionMethodOption from "./components/consumpition-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string}>;
}
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await db.restaurant.findUnique({ 
        where: { slug },
        include: { 
            menuCategories: {
                include: { products: true }
            },
        },
    });

    if (!restaurant) {
        return notFound();
    }

    return ( 
        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
            {/* LOGO E TITULO */}
            <div className="flex flex-col items-center gap-2">
                <Image 
                    src={restaurant.avatarImageUrl} 
                    alt={restaurant.name} 
                    width={82} 
                    height={82}
                />
                <h2 className="font-semibold">
                    {restaurant.name}
                </h2>
            </div>
            {/* BEM VINDO */}
            <div className="space-y-2 pt-24 text-center">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo!
                </h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>
            {/* MENU */}
            <div className="pt-14 grid grid-cols-2 gap-14">
                <ConsumpitionMethodOption 
                    imageUrl="/dine_in.png"
                    imageAlt="Comer aqui"
                    buttonText="Para comer aqui"
                    option="DINE_IN"
                    slug={slug}
                />
                <ConsumpitionMethodOption 
                    imageUrl="/takeaway.png"
                    imageAlt="Para levar"
                    buttonText="Para levar"
                    option="TAKEAWAY"
                    slug={slug}
                />
              

            </div>
        </div>
    );

}

export default RestaurantPage;