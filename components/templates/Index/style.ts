import { styled } from "@stitches/react";

export const DropZone = styled("div", {
  width: 512,
  height: 512,
  display: "flex",
  position: "relative",
  justifyContent: "center",
  background: "LightGray",
  color: "White",
  overflow: "hidden",
});

export const Layout = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ColorPicker = styled("div", {
  display: "flex",
  margin: "1rem 0",
  gap: "1rem",
});

export const BorderRadius = styled("div", {
  overflow: "hidden",
  borderRadius: "2rem",
});

export const Banner = styled("div", {
  position: "absolute",
  bottom: 0,
  left: 0,
  padding: "1rem 2rem",
  borderTopRightRadius: "2rem",
});

export const Container = styled("div", {
  padding: "0 2rem",
});

export const Description = styled("div", {
  margin: "4rem 0",
  lineHeight: 1.5,
  fontSize: "1.5rem",
});

export const Main = styled("main", {
  minHeight: "100vh",
  padding: "4rem 0",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Footer = styled("div", {
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
