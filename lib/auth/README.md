# Authentication System

This document outlines the improved authentication system for the ForgeZone application.

## Overview

The new authentication system provides:

- **Real-time updates**: Automatic user state synchronization across components
- **Caching**: Reduced database calls with intelligent caching
- **Better error handling**: Comprehensive error states and user feedback
- **Type safety**: Full TypeScript support
- **Server-side support**: Server components and API routes support

## Usage

### 1. Using the Custom Hook (Recommended)

```tsx
import { useAuth } from "@/lib/auth/auth";

const MyComponent = () => {
  const { user, loading, error, signOut, updateUserData } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

### 2. Using the Context Provider (For App-wide State)

Wrap your app with the AuthProvider:

```tsx
// app/layout.tsx
import { AuthProvider } from "@/lib/auth/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

Then use the context in any component:

```tsx
import { useAuthContext } from "@/lib/auth/AuthContext";

const MyComponent = () => {
  const { user, loading, error } = useAuthContext();
  // ... rest of component
};
```

### 3. Server-side Authentication

For server components and API routes:

```tsx
import { getServerUser } from "@/lib/auth/auth.server";

// In a server component
export default async function ServerComponent() {
  const user = await getServerUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

### 4. Updating User Data

```tsx
const { updateUserData } = useAuth();

const handleUpdateProfile = async () => {
  const updatedUser = await updateUserData({
    name: "New Name",
    location: "New Location",
  });

  if (updatedUser) {
    toast.success("Profile updated!");
  } else {
    toast.error("Failed to update profile");
  }
};
```

## Features

### Caching

- User data is cached for 5 minutes to reduce database calls
- Cache is automatically invalidated on user updates
- Cache is cleared on sign out

### Real-time Updates

- Automatically syncs user state across all components
- Handles auth state changes (sign in, sign out, token refresh)
- No manual state management required

### Error Handling

- Comprehensive error states
- Automatic error toasts
- Graceful fallbacks

### Performance

- Minimal re-renders
- Efficient data fetching
- Server-side rendering support

## Migration from Old System

The old `getLoggedInUser` function is still available for backward compatibility, but it's recommended to migrate to the new system:

### Old Way:

```tsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  getLoggedInUser(setUser, setLoading);
}, []);
```

### New Way:

```tsx
const { user, loading, error } = useAuth();
```

## API Reference

### useAuth Hook

Returns an object with:

- `user: UserType | null | undefined` - Current user data
- `loading: boolean` - Loading state
- `error: string | null` - Error message if any
- `signOut: () => Promise<boolean>` - Sign out function
- `refreshUser: () => void` - Manually refresh user data
- `updateUserData: (updates: Partial<UserType>) => Promise<UserType | null>` - Update user data

### getServerUser Function

- Returns: `Promise<UserType | null>`
- Use in server components and API routes
- Automatically handles authentication

### AuthContext

- Provides the same interface as `useAuth` hook
- Use `useAuthContext()` to access in any component within the provider
