import { Html, Head, Main, NextScript } from "next/document";
import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import { DocumentContext, DocumentInitialProps } from "next/document";

export default function Document(
  props: DocumentInitialProps & DocumentHeadTagsProps
) {
  return (
    <Html lang="en">
      <Head />
      <DocumentHeadTags {...props} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
