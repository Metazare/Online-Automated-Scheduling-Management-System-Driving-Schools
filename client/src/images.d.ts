declare module '*.png' {
  const value: string; // This type should match the image path.
  export default value;
}

declare module '*.jpeg' {
  const value: string; // This type should match the image path.
  export default value;
}
