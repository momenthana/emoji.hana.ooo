import Head from "next/head";
import { BlockPicker, ChromePicker } from "react-color";
import { useCallback, useEffect, useState, MouseEventHandler } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import {
  Banner,
  BorderRadius,
  ColorPicker,
  Container,
  Description,
  DropZone,
  Footer,
  Layout,
  Main,
} from "./style";
import { IProps } from "./type";
import Router from "next/router";

export const Index = (props: IProps) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState(props.color ?? "#7f00ff");
  const [text, setText] = useState(props.text ?? "Text");
  const [size, setSize] = useState(props.size ?? 7);
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

  useEffect(() => {
    Router.replace({ query: { color, text, size } }, undefined, {
      shallow: true,
    });
  }, [color, text, size]);

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
