import * as path from "node:path";

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/lib": path.resolve(__dirname, "src/lib"),
      },
    },
  });
};
