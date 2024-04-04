import { Button } from "./ui/button";
import Link from "next/link";
// import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./hero-cards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 lg:py-4 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Ryuk
            </span>{" "}
            The Shinigami With A Twist
          </h1>{" "}
          {/* for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              React
            </span>{" "}
            developers
          </h2> */}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Empower your language learning and conversational AI journey
          effortlessly with Ryuk, featuring essential sections tailored to your
          needs.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link type="" href="/ryuk" className="w-full md:w-1/3">
            <Button className="w-full md:w-1/3">Get Started</Button>
          </Link>
          <a
            href="https://github.com/haki-user/ryuk"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="absolute bg-[#2db963] radius-[24px] rotate-[35deg] w-[100px] h-[350px] top-[200px] sm:w-[260px] sm:top-[70px] md:top-[70px] sm:h-[400px] blur-3xl sm:blur-[150px] animate-shadow-slide "></div>
    </section>
  );
};
