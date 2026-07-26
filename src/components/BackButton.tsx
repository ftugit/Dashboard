import { useNavigate } from "@solidjs/router";
import { Button } from "~/components/ui/button";

const ArrowLeftIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

/**
 * Reusable "back" control. Returns to the previous history entry, or to "/" when
 * the page was opened directly. Designed to be embedded in headers (including
 * outside the /auth route).
 */
export function BackButton() {
  const navigate = useNavigate();

  const back = () => {
    if (typeof window !== "undefined" && window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <Button variant="ghost" size="sm" class="gap-2" onClick={back}>
      {ArrowLeftIcon}
      Back
    </Button>
  );
}
