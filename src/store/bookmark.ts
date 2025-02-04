import { BookmarkStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store to manage user's bookmarks
 *
 * @returns {BookmarkStore} - Bookmarks store
 */
export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarks: [],
      addToBookmarks: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        })),
      removeFromBookmarks: (eventID: string) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== eventID),
        })),
    }),
    {
      name: "bookmarks",
    },
  ),
);
