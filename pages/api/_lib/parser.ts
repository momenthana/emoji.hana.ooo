import { NextApiRequest } from "next";
import { ParsedRequest } from "./types";

export function parseRequest(req: NextApiRequest) {
  const { text, extension, size, images, widths, heights, color, md } =
    req.query || {};

  if (Array.isArray(text)) throw new Error("Expected a single text");
  if (Array.isArray(color)) throw new Error("Expected a single color");
  if (Array.isArray(size)) throw new Error("Expected a single fontSize");

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text ?? "Text"),
    color: decodeURIComponent(color ?? "#7f00ff"),
    md: md === "1" || md === "true",
    fontSize: size ?? "96px",
    images: getArray(images),
    widths: getArray(widths),
    heights: getArray(heights),
  };
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}
