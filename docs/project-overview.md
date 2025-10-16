# Project Overview

This project hosts a responsive résumé-style mobile web application that presents professional information for Rick Becker. The primary production entry point is `index.html`, with `staging.html` offering an alternate visual treatment for previewing content updates. Styling is handled inline through `<style>` blocks within the HTML, and there is no external build system—assets such as `thumb.jpg` and `favicon.png` are served directly.

## Application Structure

- **index.html** – Main, production-ready résumé experience featuring sections for profile highlights, value statements, detailed career history, education, and affiliations. The layout relies on modern CSS (grid, flexbox, and custom properties) to deliver a polished presentation optimized for mobile and desktop displays.【F:index.html†L1-L201】
- **staging.html** – Simplified variant of the résumé used to iterate on copy and structural changes before promoting them to the production file. It mirrors the same content model with lighter-weight styling for faster experimentation.【F:staging.html†L1-L160】
- **tabs/waypoints.js** – Front-end module that listens for community-submitted waypoint events and triggers an API call responsible for emailing admin reviewers. It exposes helpers to register/deregister the listener, dispatch synthetic events during testing, and send notifications programmatically.【F:tabs/waypoints.js†L1-L120】

Both HTML documents share a similar structure: a header block with contact chips, followed by expandable `<details>` components that organize content into digestible sections. Because there is no bundler, scripts are referenced directly at the bottom of each HTML file, ensuring the page renders immediately and progressive enhancement can layer in dynamic behaviors.

## Waypoint Review Notifications

Community sourced waypoints are handled entirely on the client. When a waypoint submission is made, emitting (or programmatically dispatching) the `communityWaypoint:created` event triggers the notifier in `tabs/waypoints.js`. The module packages the waypoint metadata with a timestamp and posts it to `/api/admin/waypoints/review-request`, where the server-side email dispatch logic should reside. Consumers can import the exported helpers to customize the event target, endpoint, or injected `fetch` implementation if additional control is required.【F:tabs/waypoints.js†L1-L120】

## Content Management Workflow

1. Author and verify copy changes inside `staging.html` for quick iteration.
2. Promote vetted content to `index.html` for production.
3. Ensure supporting assets (e.g., profile thumbnail, favicon) remain in the project root for direct linking.
4. Use the waypoint notification module to alert admins whenever community contributions arrive so they can review and publish approved updates.

This lightweight architecture keeps the résumé easy to maintain while allowing incremental enhancements through plain HTML, CSS, and small JavaScript modules.
