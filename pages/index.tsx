import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Index } from "../components/templates/Index";

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  return {
    props: {
      query: query,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { text, size, color } = props.query;

  if (Array.isArray(text)) throw new Error("Expected a single text");
  if (Array.isArray(size)) throw new Error("Expected a single size");
  if (Array.isArray(color)) throw new Error("Expected a single color");

  const queryString = Object.entries(props.query)
    .map((query) => encodeURIComponent(query.join("=")))
    .join("&");

  return (
    <>
      <Head>
        {queryString && (
          <meta
            property="og:image"
            content={`/api?${queryString}`}
          />
        )}
      </Head>

      <Index text={text} size={size ? Number(size) : undefined} color={color} />
    </>
  );
};

export default Home;
