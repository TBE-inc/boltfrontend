export interface CheckoutSession {
  id: string;
  url: string;
  status: 'pending' | 'completed' | 'expired';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export async function createCheckoutSession(planId: string): Promise<CheckoutSession> {
  const apiUrl = process.env.NEXT_PUBLIC_API_PAYMENT_CHECKOUT;
  const token = localStorage.getItem('authToken');
  
  if (!apiUrl) {
    throw new Error('Payment API URL not configured');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        planId,
        successUrl: `${window.location.origin}/subscribe/success`,
        cancelUrl: `${window.location.origin}/subscribe/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      url: data.url,
      status: data.status || 'pending',
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_PAYMENT_PLANS;
  
  if (!apiUrl) {
    throw new Error('Payment plans API URL not configured');
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.plans;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
}