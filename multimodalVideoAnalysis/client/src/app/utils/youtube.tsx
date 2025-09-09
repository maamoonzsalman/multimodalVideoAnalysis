export function getYouTubeVideoId(url: string): string | null {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?].*)?$/;
  const m = url.trim().match(pattern);
  return m ? m[1] : null;
}
