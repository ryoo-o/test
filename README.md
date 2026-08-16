# BlockHaven Network Forum

A polished static Minecraft server community forum designed for GitHub Pages.

## Included

- Homepage and server status card
- Announcements/news
- Staff, admin, helper, moderator, builder, event and partnership applications
- Community forum categories
- User/role management demo with Owner, Admin, Mod and Member roles
- Local application review panel
- New announcements and discussions
- Responsive dark Minecraft-inspired design
- Browser `localStorage` for demo persistence

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save and open the generated Pages URL.

## Important: real accounts/admin permissions

GitHub Pages is static hosting. It cannot securely provide server-side authentication, private staff permissions, shared application storage, moderation actions, or a real database by itself.

For production, connect this frontend to a backend such as Supabase/Firebase or your own API. Use real authentication and enforce roles on the server/database—not only in JavaScript.

For a Minecraft server, you can later add Discord integration, Minecraft UUID linking, bans/mutes, ticketing, reports, server statistics, player profiles and staff audit logs.
