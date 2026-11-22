import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over 500 EGP" , style : "text-blue-600 bg-red-100" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transactions" ,style : "text-green-600 bg-green-100" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy"  ,style : "text-orange-600 bg-gray-100"},
  { icon: Headset, title: "24/7 Support", desc: "Dedicated support" , style : "text-fuchsia-800 bg-gray-50"},
];

export default function FeaturesSection() {
  return (
    <section className="border-t bg-gray-50 border-b">
      <div className="container  mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 bg-white p-5 w-[23%] rounded-md shadow-lg ">
            <div className={`${f.style} h-8 w-8 rounded-full flex items-center justify-center`}>
              <f.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
