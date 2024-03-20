import {
  getBuilderPages,
  registerComponent,
} from "@/components/SampleComponent";
import { BuilderComponent } from "@builder.io/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Page({ content }) {
  registerComponent();
  return (
    <main className={`flex flex-col  ${inter.className}`}>
      <BuilderComponent
        model={process.env.NEXT_PUBLIC_BUILDER_MODEL_NAME}
        locale={"en"}
        content={content}
      />
    </main>
  );
}

export const getStaticProps = async ({ params, locale = "en" }) => {
  const content = await getBuilderPages({ path: params?.page ?? "" });
  if (!content) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: JSON.parse(JSON.stringify(content)),
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
