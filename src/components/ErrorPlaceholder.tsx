interface ErrorPlaceholderProps {
  message: string;
  type: "content" | "media";
}

export default function ErrorPlaceholder({ message, type }: ErrorPlaceholderProps) {
  if (type === "media") {
    return (
      <div
        className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100"
        role="img"
        aria-label={message}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-6 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <svg
          className="h-10 w-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}
