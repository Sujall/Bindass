export function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  const initials = parts.map(part => part.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
}
