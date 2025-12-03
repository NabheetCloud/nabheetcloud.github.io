---
title: "Building a Saleor Commerce App with GraphQL"
slug: "building-saleor-app"
date: 2025-11-03
author: "Nabheet Madan"
excerpt: "Learn how to build a custom Saleor app using GraphQL subscriptions and webhooks for real-time inventory management. Complete with code examples and architecture diagrams."
tags: ["saleor", "graphql"]
draft: true
layout: layouts/post.njk
---

# Building a Saleor Commerce App with GraphQL

[Saleor](https://saleor.io) is a powerful headless commerce platform built on Python and GraphQL. In this article, we'll explore how to build a custom Saleor app that listens to inventory changes using GraphQL subscriptions and webhooks.

## Why Saleor?

Saleor stands out in the headless commerce space for several reasons:

- **GraphQL-first API**: Modern, efficient data fetching
- **Open-source**: Full control over your commerce stack
- **Extensible**: Rich plugin and app ecosystem
- **Performance**: Built for scale with Django and Celery

## Architecture Overview

Our app will follow this architecture:

1. **Saleor Core**: Headless commerce backend
2. **GraphQL Gateway**: Query and mutation interface
3. **Webhook Handler**: Real-time event processing
4. **Custom App**: Business logic layer

## Setting Up Authentication

First, let's set up authentication with Saleor's App API:

```javascript
// saleor-auth.js
const { createAppAuth } = require('@saleor/app-sdk');

async function authenticateApp() {
  const authData = await createAppAuth({
    saleorApiUrl: process.env.SALEOR_API_URL,
    token: process.env.SALEOR_APP_TOKEN,
  });
  
  return authData;
}

module.exports = { authenticateApp };
```

## GraphQL Queries

Here's how to query products with inventory data:

```graphql
query GetProductsWithInventory {
  products(first: 10) {
    edges {
      node {
        id
        name
        variants {
          id
          name
          stocks {
            warehouse {
              name
            }
            quantity
          }
        }
      }
    }
  }
}
```

## Webhook Integration

Saleor sends webhooks for various events. Here's how to handle inventory updates:

```python
# webhook_handler.py
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)

def verify_webhook_signature(payload, signature, secret):
    """Verify webhook signature from Saleor"""
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhooks/inventory', methods=['POST'])
def handle_inventory_webhook():
    signature = request.headers.get('X-Saleor-Signature')
    payload = request.get_data(as_text=True)
    
    if not verify_webhook_signature(payload, signature, WEBHOOK_SECRET):
        return {'error': 'Invalid signature'}, 401
    
    data = request.get_json()
    event_type = data.get('type')
    
    if event_type == 'PRODUCT_VARIANT_STOCK_UPDATED':
        handle_stock_update(data['payload'])
    
    return {'status': 'ok'}, 200

def handle_stock_update(payload):
    """Process stock update event"""
    variant_id = payload['variant']['id']
    new_quantity = payload['stock']['quantity']
    
    print(f"Stock updated for variant {variant_id}: {new_quantity}")
    # Implement your business logic here
    
if __name__ == '__main__':
    app.run(port=5000)
```

## GraphQL Subscriptions

For real-time updates, use GraphQL subscriptions:

```javascript
// subscription-client.js
const { createClient } = require('graphql-ws');
const WebSocket = require('ws');

const client = createClient({
  url: 'ws://your-saleor-instance.com/graphql/',
  webSocketImpl: WebSocket,
  connectionParams: {
    headers: {
      Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
    },
  },
});

// Subscribe to product updates
const subscription = `
  subscription OnProductUpdate {
    event {
      ... on ProductUpdated {
        product {
          id
          name
        }
      }
    }
  }
`;

client.subscribe(
  { query: subscription },
  {
    next: (data) => {
      console.log('Product updated:', data);
    },
    error: (error) => {
      console.error('Subscription error:', error);
    },
    complete: () => {
      console.log('Subscription complete');
    },
  }
);
```

## Best Practices

When building Saleor apps, keep these practices in mind:

1. **Verify webhook signatures**: Always validate incoming webhooks
2. **Handle rate limits**: Implement exponential backoff for GraphQL requests
3. **Cache aggressively**: Use Redis for frequently accessed data
4. **Idempotent operations**: Design webhooks to handle duplicate events
5. **Monitor performance**: Track GraphQL query complexity and response times

## Testing Your App

Here's a simple test for the webhook handler:

```python
# test_webhook_handler.py
import pytest
from webhook_handler import verify_webhook_signature

def test_webhook_signature_verification():
    secret = 'test_secret'
    payload = '{"type": "TEST"}'
    
    # Generate valid signature
    import hmac
    import hashlib
    signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    assert verify_webhook_signature(payload, signature, secret) == True
    assert verify_webhook_signature(payload, 'invalid', secret) == False
```

## Deployment Considerations

For production deployment:

- **Use environment variables** for sensitive data
- **Set up SSL/TLS** for webhook endpoints
- **Implement retry logic** for failed webhook deliveries
- **Monitor webhook delivery** with observability tools
- **Scale horizontally** with load balancers

## Conclusion

Building Saleor apps with GraphQL provides a powerful, flexible foundation for custom commerce solutions. The combination of GraphQL queries, mutations, subscriptions, and webhooks gives you real-time reactivity and fine-grained control.

In the next article, we'll explore advanced patterns like:
- Batch operations with GraphQL
- Optimistic UI updates
- Error handling strategies
- Performance optimization techniques

Have questions? Connect with me on [GitHub](https://github.com/nabheetmadan) or [LinkedIn](https://linkedin.com/in/nabheetmadan)!

