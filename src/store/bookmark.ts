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
      removeFromBookmarks: (bookmark) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== bookmark.id),
        })),
    }),
    {
      name: "bookmarks",
    },
  ),
);
