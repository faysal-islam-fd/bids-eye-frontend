import { apiClient } from "@/lib/api";
import { Config } from "@/config/Config";
import ClientHeroSlider from "./ClientHeroSlider";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  slug: string;
}

export default async function HeroSliderServer() {
  let slides: Slide[] = [];

  try {
    const collections: any[] = await apiClient.getAllCollections();
    slides = (collections || []).map((collection: any) => ({
      image: `${Config.BACKEND_STORASE_URL}/${collection.image}`,
      title: collection.name,
      subtitle: collection.description || "Discover the latest trends",
      cta: "Shop Now",
      slug: collection.slug,
    }));
  } catch (error) {
    slides = [];
  }

  return <ClientHeroSlider slides={slides} />;
}


