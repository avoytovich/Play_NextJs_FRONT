export default function isServer() {
  if (!process.browser) return true;
  return false;
}
