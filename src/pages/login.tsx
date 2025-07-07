import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/atoms/Button/Button';
import { login } from '@/lib/auth';
import { useTheme } from '@/hooks/useTheme';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { colors, spacing, dimensions, typography } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login({ email, password });
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: colors.neutral.bgLight,
        padding: spacing.md,
      }}
    >
      <div
        className="w-full max-w-md"
        style={{
          backgroundColor: colors.neutral.bgLight,
          padding: spacing.xl,
          borderRadius: dimensions.borderRadius.xl,
          border: `1px solid ${colors.neutral.border}`,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="text-center mb-8">
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: typography.fontWeights.heading1,
              fontFamily: typography.fontFamily.primary,
              color: colors.neutral.textMain,
              marginBottom: spacing.sm,
            }}
          >
            Welcome Back
          </h1>
          <p style={{ 
            color: colors.neutral.textMuted,
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeights.body,
          }}>
            Sign in to your Weedify account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: typography.fontWeights.heading3,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                marginBottom: spacing.xs,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              style={{
                padding: spacing.sm,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: dimensions.borderRadius.md,
                fontSize: '1rem',
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
                color: colors.neutral.textMain,
                backgroundColor: colors.neutral.bgLight,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: typography.fontWeights.heading3,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                marginBottom: spacing.xs,
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              style={{
                padding: spacing.sm,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: dimensions.borderRadius.md,
                fontSize: '1rem',
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
                color: colors.neutral.textMain,
                backgroundColor: colors.neutral.bgLight,
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: spacing.sm,
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: dimensions.borderRadius.md,
                color: '#dc2626',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}