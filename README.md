# 🎮 Discord Server Listing Platform

A production-ready Discord server listing platform built with **Next.js 14**, **TypeScript**, **MongoDB**, and **Tailwind CSS**.

## ✨ Features

- 🔐 **Discord OAuth2 Authentication** - Login with Discord
- 📋 **Server Listings** - Browse and discover Discord servers
- 🔍 **Full-Text Search** - Search servers by tags and keywords
- 📊 **Trending Servers** - See the most popular servers
- 👤 **User Dashboard** - Manage your registered servers
- 🏷️ **Tag System** - Categorize and filter servers
- ⚡ **Rate Limiting** - Built-in API protection
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS
- 🚀 **Production Ready** - TypeScript, proper error handling, security best practices

## 🏗️ Project Structure

This is a **unified Next.js application** with frontend and backend integrated:

```
app/                          # Frontend pages & API routes
├── page.tsx                  # Home page
├── browse/                   # Browse servers page
├── search/                   # Search page
├── server/[id]/              # Server details page
├── dashboard/                # User dashboard (protected)
├── auth/login/               # Login page
└── api/                       # Backend API routes
    ├── auth/
    │   ├── discord/
    │   ├── discord/callback/
    │   ├── me/
    │   ├── logout/
    │   └── guilds/
    └── servers/
        ├── route.ts
        ├── trending/
        ├── me/
        └── [id]/

lib/
├── db/
│   ├── mongodb.ts            # MongoDB connection
│   └── models.ts             # Mongoose schemas
├── services/
│   ├── discord.service.ts    # Discord API
│   └── server.service.ts     # Server CRUD
├── api.ts                    # Axios client
├── auth.ts                   # JWT utilities
├── oauth.ts                  # OAuth handling
└── utils.ts                  # Helpers

components/                   # Reusable components
public/                       # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- Discord OAuth App ([create here](https://discord.com/developers/applications))

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```bash
cp .env.example .env.local
```

Update with your credentials:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/disboard-lite

# Discord OAuth
NEXT_PUBLIC_DISCORD_CLIENT_ID=your-client-id
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
DISCORD_CLIENT_SECRET=your-secret

# JWT
JWT_SECRET=your-secret-key

# Bot (Optional)
DISCORD_BOT_TOKEN=your-bot-token

# Environment
NODE_ENV=development
```

### 3. Setup Discord OAuth

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create Application
3. Get Client ID & Secret
4. Add Redirect: `http://localhost:3000/api/auth/discord/callback`
5. Update `.env.local`

### 4. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📡 API Routes

### Authentication
- `GET /api/auth/discord` - Start OAuth
- `GET /api/auth/discord/callback` - OAuth callback
- `GET /api/auth/me` - Current user *(Protected)*
- `GET /api/auth/guilds` - User's servers *(Protected)*
- `POST /api/auth/logout` - Logout *(Protected)*

### Servers
- `GET /api/servers` - List all (paginated)
- `GET /api/servers?tag=gaming` - Search by tag
- `GET /api/servers/trending` - Trending
- `GET /api/servers/:id` - Details
- `GET /api/servers/me` - My servers *(Protected)*
- `POST /api/servers` - Create *(Protected)*
- `PUT /api/servers/:id` - Update *(Protected)*
- `DELETE /api/servers/:id` - Delete *(Protected)*

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, PostCSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB + Mongoose |
| **Auth** | Discord OAuth2 + JWT |
| **HTTP** | Axios |

## 🔐 Security

- ✅ JWT authentication with httpOnly cookies
- ✅ CORS protection
- ✅ Input validation via Mongoose
- ✅ Rate limiting on public endpoints
- ✅ Protected routes with auth middleware
- ✅ Environment variable isolation

## 📦 Database

### User Schema
```typescript
{
  discordId: string (unique)
  username: string
  avatar?: string
  email?: string
  accessToken?: string
  refreshToken?: string
  role: 'user' | 'admin'
  createdAt: Date
}
```

### Server Schema
```typescript
{
  guildId: string (unique)
  name: string
  description: string
  category: string
  tags: string[]
  inviteLink: string
  icon?: string
  banner?: string
  ownerId: ObjectId
  memberCount: number
  onlineCount: number
  bumpAt: Date
  bumpCount: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}
```

### BumpCooldown Schema (TTL)
```typescript
{
  guildId: string
  userId: string
  expiresAt: Date (auto-deletes after 2 hours)
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Other Platforms

Required environment variables:
- `MONGODB_URI`
- `DISCORD_CLIENT_SECRET`
- `JWT_SECRET`
- `NEXT_PUBLIC_DISCORD_CLIENT_ID`
- `NEXT_PUBLIC_CLIENT_URL`
- `NODE_ENV=production`

## 📝 Available Commands

```bash
# Development
npm run dev         # Start dev server (http://localhost:3000)

# Production
npm run build       # Build for production
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Update MONGODB_URI in .env.local to your MongoDB connection string
```

### OAuth Error "Invalid Client"
```
Check DISCORD_CLIENT_SECRET and DISCORD_CLIENT_ID in .env.local
```

### "Unauthorized" on Protected Routes
```
Ensure JWT_SECRET matches and browser has valid token cookie
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Mongoose Docs](https://mongoosejs.com)
- [Discord OAuth](https://discord.com/developers/docs/topics/oauth2)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

MIT License - Build awesome projects!

---

**Built with ❤️ using Next.js**
