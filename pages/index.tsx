import Head from "next/head";
import { BlockPicker, ChromePicker } from "react-color";
import { styled } from "@stitches/react";
import { useCallback, useEffect, useState, MouseEventHandler } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";

const DropZone = styled("div", {
  width: 512,
  height: 512,
  display: "flex",
  position: "relative",
  justifyContent: "center",
  background: "LightGray",
  color: "White",
  overflow: "hidden",
});

const Layout = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ColorPicker = styled("div", {
  display: "flex",
  margin: "1rem 0",
  gap: "1rem",
});

const BorderRadius = styled("div", {
  overflow: "hidden",
  borderRadius: "2rem",
});

const Banner = styled("div", {
  position: "absolute",
  bottom: 0,
  left: 0,
  padding: "1rem 2rem",
  borderTopRightRadius: "2rem",
});

const Container = styled("div", {
  padding: "0 2rem",
});

const Description = styled("div", {
  margin: "4rem 0",
  lineHeight: 1.5,
  fontSize: "1.5rem",
});

const Main = styled("main", {
  minHeight: "100vh",
  padding: "4rem 0",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Footer = styled("div", {
  display: "flex",
  flex: 1,
  padding: "2rem 0",
  borderTop: "1px solid #eaeaea",
  justifyContent: "center",
  alignItems: "center",
  "& a": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#7f00ff");
  const [text, setText] = useState("Text");
  const [size, setSize] = useState(7);
  const [imgSrc, setImgSrc] = useState("");

  const blobToBase64 = (blob?: Blob | null) => {
    if (!blob) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;

      setImgSrc(e.target?.result.toString());
    };
    reader.readAsDataURL(blob);
  };

  const dropHandler = useCallback((e: DragEvent) => {
    e.preventDefault();

    if (!e.dataTransfer?.items) return;

    [...e.dataTransfer.items].forEach((item) => {
      if (item.kind === "file") {
        blobToBase64(item.getAsFile());
      }
    });
  }, []);

  const clickHandler: MouseEventHandler = useCallback((e) => {
    const element = document.getElementById("capture");

    if (!element) return;

    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "profile.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }, []);

  useEffect(() => {
    setLoading(false);

    window.ondragover = (e) => {
      e.preventDefault();
      return false;
    };

    window.ondrop = (e) => {
      e.preventDefault();
      dropHandler(e);
      return false;
    };
  }, [dropHandler]);

  return (
    <Container>
      <Head>
        <title>Emoji Generator</title>
        <meta name="description" content="Emoji Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Description>Get started by editing image</Description>

        <input
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
        />

        <input
          type="number"
          defaultValue={`${size}`}
          onChange={(e) => setSize(e.target.valueAsNumber)}
          placeholder="Size"
        />

        <div>
          <BorderRadius>
            <DropZone id="capture" css={{ background: imgSrc && "White" }}>
              {imgSrc && <Image src={imgSrc} alt="" fill unoptimized />}

              {!imgSrc && (
                <Layout>
                  <p>Drag image to this drop zone</p>
                </Layout>
              )}

              {text && (
                <Banner
                  css={{
                    fontSize: `${size}rem`,
                    background: `${color}`,
                  }}
                >
                  <b>{text}</b>
                </Banner>
              )}
            </DropZone>
          </BorderRadius>

          {!loading && (
            <ColorPicker>
              <BlockPicker
                color={color}
                onChange={(v) => setColor(v.hex)}
                styles={{ default: { label: { color: "white" } } }}
                colors={[
                  "#FF6900",
                  "#FCB900",
                  "#7BDCB5",
                  "#00D084",
                  "#8ED1FC",
                  "#0693E3",
                  "#ABB8C3",
                  "#EB144C",
                  "#F78DA7",
                  "#9900EF",
                ]}
              />
              <ChromePicker color={color} onChange={(v) => setColor(v.hex)} />
            </ColorPicker>
          )}
        </div>

        <button onClick={clickHandler}>Download</button>
      </Main>

      <Footer>
        <a
          href="https://github.com/momenthana"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Hana
        </a>
      </Footer>
    </Container>
  );
};

export default Home;
