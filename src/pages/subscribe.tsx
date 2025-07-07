import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { createCheckoutSession, getSubscriptionPlans, type SubscriptionPlan } from '@/lib/payment';
import { useTheme } from '@/hooks/useTheme';

export default function SubscribePage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { colors, spacing, dimensions, typography } = useTheme();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const subscriptionPlans = await getSubscriptionPlans();
        setPlans(subscriptionPlans);
      } catch (err) {
        setError('Failed to load subscription plans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    try {
      const session = await createCheckoutSession(planId);
      window.location.href = session.url;
    } catch (err) {
      setError('Failed to create checkout session');
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.neutral.bgLight }}
      >
        <div style={{ color: colors.neutral.textMuted }}>Loading plans...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.neutral.bgLight,
        padding: spacing.xl,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: typography.fontWeights.heading1,
              fontFamily: typography.fontFamily.primary,
              color: colors.neutral.textMain,
              marginBottom: spacing.md,
            }}
          >
            Choose Your Plan
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeights.body,
              color: colors.neutral.textMuted,
            }}
          >
            Unlock the full potential of Weedify Assistant
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: spacing.md,
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: dimensions.borderRadius.md,
              color: '#dc2626',
              marginBottom: spacing.lg,
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: colors.neutral.bgLight,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: dimensions.borderRadius.xl,
                padding: spacing.xl,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="text-center mb-6">
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: typography.fontWeights.heading2,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMain,
                    marginBottom: spacing.sm,
                  }}
                >
                  {plan.name}
                </h3>
                <div style={{ marginBottom: spacing.md }}>
                  <span
                    style={{
                      fontSize: '2rem',
                      fontWeight: typography.fontWeights.heading1,
                      fontFamily: typography.fontFamily.primary,
                      color: colors.accent,
                    }}
                  >
                    ${plan.price}
                  </span>
                  <span style={{ 
                    color: colors.neutral.textMuted,
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeights.body,
                  }}>
                    /{plan.interval}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center"
                    style={{ 
                      color: colors.neutral.textMain,
                      fontFamily: typography.fontFamily.primary,
                      fontWeight: typography.fontWeights.body,
                    }}
                  >
                    <span
                      style={{
                        color: colors.accent,
                        marginRight: spacing.sm,
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full"
                size="lg"
              >
                Subscribe Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}