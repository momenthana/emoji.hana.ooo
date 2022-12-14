import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Index } from "../components/templates/Index";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      query: context.query,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { color, text, size } = props.query;

  return (
    <Index
      color={color ? String(color) : undefined}
      text={text ? String(text) : undefined}
      size={size ? Number(size) : undefined}
    />
  );
};

export default Home;
