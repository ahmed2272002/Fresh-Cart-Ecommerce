
import forgotPass from "../../../assets/forgotPass.png"
import Image from "next/image";
import { Lock ,Shield, Mail } from "lucide-react";

const benefits = [
  { label: "Email Verification", icon: Mail },
  { label: "Secure Reset", icon: Shield },
  { label: "Encrypted", icon: Lock },
];

export default function LayoutAuth({children}:LayoutProps<"/">) {
    
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          <div className=" col-span-6">
            {/* static  */}
            <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-4 py-8 text-center sm:py-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl  ">
                <Image
                  src={forgotPass}
                  alt="A shopping cart filled with fresh vegetables"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover shadow"
                />
              </div>

              <div className="space-y-3">
                <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Reset Your Password
                </h1>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Do not worry, it happens to the best of us. We will help you get back into your
                  account in no time.
                </p>
              </div>

              <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                {benefits.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon aria-hidden="true" className="size-4 text-primary" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="col-span-6">{children}</div>
        </div>
      </div>
    </>
  );
}
