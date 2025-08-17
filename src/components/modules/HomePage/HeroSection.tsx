
import logo from "@/assets/icons/brand-logo.png";



import { Button } from "@/components/ui/button";
import { Blocks } from "@/components/Animation/blocks";
import { Link } from "react-router";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden py-32">
            <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
                <img
                    alt="background"
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
                    className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
                />
            </div>
            <div className="relative z-10 container mx-auto">
                <div className="mx-auto flex max-w-5xl flex-col items-center">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
                            <img
                                src={logo}
                                alt="logo"
                                className="h-16 mx-auto"
                            />
                        </div>
                        <div>
                            <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                                Explore the beauty of{" "}
                                <span className="text-primary">Bangladesh</span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                                doloremque mollitia fugiat omnis! Porro facilis quo animi
                                consequatur. Explicabo.
                            </p>
                        </div>
                        <div className="mt-6 flex justify-center gap-3">
                            <Link to='/tours'>
                                <Button variant="outline" className="group">
                                    {" "}
                                    <Blocks label="Explore" />
                                    {/* <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" /> */}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



