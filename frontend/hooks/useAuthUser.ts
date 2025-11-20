export function useAuthUser() {
  const username = localStorage.getItem("username");
  return username;
}
