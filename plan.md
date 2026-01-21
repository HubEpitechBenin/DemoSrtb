# Implementation Plan - Hero Video & Thumbnail Fixes

## Goal Description
1.  **Hero Section**: Ensure a reliable SRTB video is playing. The "Journal de 20H" (JT) video (`mRxAsmfM-EM`) has been verified as working.
2.  **Thumbnails**:
    - Revert to High Quality (`hqdefault.jpg`) as primary source as requested.
    - Implement a "Self-Destruct" mechanism for cards: if a thumbnail fails to load (onError), the entire video card will be hidden from the UI. This fulfills the user's request to "skip" videos with broken images rather than showing placeholders.

## User Review Required
> [!NOTE]
> I am using the video "Journal de 20H" (ID: mRxAsmfM-EM) for the Hero section as it is verified to work.
> **Breaking Visual Change**: Videos with broken thumbnails will essentially "disappear" from the list. This might cause some gaps depending on the amount of broken links, but ensures a clean look.

## Proposed Changes

### Component Layer

#### [MODIFY] [Hero.jsx](file:///home/spynelkouton/TEK3/Project/DemoSrtb/src/components/Hero.jsx)
- *Already updated in previous step to use `mRxAsmfM-EM`.*
- Ensure text content matches "Journal de 20H".

#### [MODIFY] [ContentRow.jsx](file:///home/spynelkouton/TEK3/Project/DemoSrtb/src/components/ContentRow.jsx)
- **Thumbnail Logic Update**:
    - Change primary image source back to `hqdefault.jpg`.
    - **New Error Handling**:
    - Instead of swapping `src` to a placeholder, utilize React state or a hidden class to remove the element.
    - Implementation detail: Since `ContentRow` maps items, we can wrap the card in a sub-component `<VideoCard />` that manages its own `isVisible` state.
    - If `onError` fires -> `setIsVisible(false)` -> returned JSX is `null`.

## Verification Plan

### Manual Verification
- **Hero Section**:
    - Verify "Journal de 20H" plays.
- **Thumbnails**:
    - Inspect the grid. Verify no "grey 3-dot" images or placeholders appear.
    - If a video is broken, it should simply not be there.
    - Verify hover effects still work on visible cards.
