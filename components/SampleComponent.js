const { Builder, builder } = require("@builder.io/react");

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY);

export const SampleComponent = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children ? (
        <ul>
          {children.map((child) => (
            <li>{child.text}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export const registerComponent = () => {
  const name = "SampleComponent";
  Builder.registerComponent(SampleComponent, {
    name,
    inputs: [
      {
        name: "title",
        friendlyName: "Title",
        type: "string",
        defaultValue: "This is a default title",
      },
      {
        name: "children",
        friendlyName: "Children",
        type: "list",
        subFields: [
          {
            name: "text",
            friendlyName: "Text",
            type: "string",
            defaultValue: "This is a default text",
          },
        ],
      },
    ],
  });
  Builder.register("insertMenu", {
    name: "Sample Components",
    items: [{ name }],
  });
  return name;
};

export const getBuilderPages = async ({ path }) => {
  return builder
    .get(process.env.NEXT_PUBLIC_BUILDER_MODEL_NAME, {
      userAttributes: {
        urlPath: `${process.env.NEXT_PUBLIC_BUILDER_PATH_PREFIX}${path || ""}`,
      },
      query: {
        published: "published",
      },
      options: { locale: "en" },
      cachebust: true,
    })
    .toPromise();
};
