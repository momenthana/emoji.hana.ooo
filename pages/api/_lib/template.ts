import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
import twemoji from "twemoji";
import path from "path";
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  path.join(process.cwd(), "/pages/api/_fonts/Inter-Regular.woff2")
).toString("base64");
const bold = readFileSync(
  path.join(process.cwd(), "/pages/api/_fonts/Inter-Bold.woff2")
).toString("base64");
const mono = readFileSync(
  path.join(process.cwd(), "/pages/api/_fonts/Vera-Mono.woff2")
).toString("base64");

function getCss(color: string, fontSize: string) {
  let background = "white";
  let foreground = color;

  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: ${background};
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .header {
      margin: 4rem 0px;
      line-height: 1.5;
      font-family: 'Inter', sans-serif;
      font-size: 1.5rem;
    }

    .box {
      width: 512px;
      height: 512px;
      display: flex;
      position: relative;
      justify-content: center;
      background: lightgray;
      color: white;
      overflow: hidden;
      border-radius: 2rem;
    }
    
    .text {
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding: 1rem 2rem;
        border-top-right-radius: 2rem;
        font-size: 7rem;
        background: ${foreground};
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)}rem;
        color: white;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, color, md, fontSize, images, widths, heights } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${getCss(color, fontSize)}
    </style>
    <body>
      <div>
        <div class="header">Get started by editing image</div>
        <div class="box">
          <div class="text">
            <b>${emojify(md ? marked(text) : sanitizeHtml(text))}</b>
          </div>
        </div>
      </div>
    </body>
</html>`;
}
