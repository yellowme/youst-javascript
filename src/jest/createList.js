export default function createList(length, factory) {
  return Array.from({ length }).map(factory);
}
