import { registerComponent } from "@/components/SampleComponent";
import { Builder, builder, BuilderComponent } from "@builder.io/react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export default function Page() {
  registerComponent();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(Builder.isEditing || Builder.isPreviewing);
  }, []);

  if (isEditing) {
    return (
      <main className={`flex flex-col ${inter.className}`}>
        <BuilderComponent model={process.env.NEXT_PUBLIC_BUILDER_MODEL_NAME} />
      </main>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex u-wrapper u-m-v-lg-xxl-18 u-m-v-xxl-6">
        <h3 className="u-text-center u-typography-h3">Not Found</h3>
      </div>
    </main>
  );
}
