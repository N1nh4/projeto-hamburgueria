interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>
}

const RestaurantMenuPage = async ({params}:RestaurantMenuPageProps) => {
    const { slug } = await params;
    return (
        <div>menu</div>
    )
}

export default RestaurantMenuPage;

