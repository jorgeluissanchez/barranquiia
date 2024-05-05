import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1">
          <h1 className="inline-block font-black text-4xl lg:text-5xl mb-2">
            Nuestro Equipo
          </h1>
        <p className="text-xl mt-0 text-muted-foreground">
            Un equipo pequeño pero peligroso.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col mt-8">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                        <div className="flex flex-col">
                            <a href="#" className="mx-auto">
                                <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                                    src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80" />
                            </a>

                            <div className="text-center mt-6">
                                <h1 className="text-gray-900 text-xl font-bold mb-1">
                                  Jorge Sanchez
                                </h1>

                                <div className="text-gray-700 font-light mb-2">
                                  Frontend Developer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
}
