--- 
title: "From 797ms to 5ms: My Journey Optimizing a 10K-Rows / 1.3 MB response size Product API with Postgres, Redis, NGINX & Go" 
slug: "api-performance-journey-10m-rows" 
date: 2025-12-03 
author: "Nabheet Madan" 
excerpt: "A deep engineering journey: taking a 10M-row Postgres dataset and reducing API latency from 797ms → 350ms → 310ms → 2.9ms → 5ms → 1ms using indexing, materialized views, Redis, NGINX caching, and finally a Go rewrite." 
tags: ["postgres", "system-design", "performance", "go", "redis", "nginx", "caching"] 
featured_image: /assets/images/posts/api-speed-evolution.png 
featured_image_alt: "API performance dashboard comparing Node.js, Redis, NGINX and Go latencies" 
draft: false 
layout: layouts/post.njk 
---

# **From 797ms to 5ms: My 10M-Row API Performance Journey**

This is the story of how I took a **10 million row** product dataset in Postgres, exposed only **10,000 rows per API call**, and optimized the response time from **nearly 800ms down to 5ms** — and in some cases **1ms**.

The raw JSON response size was consistently **~1.3MB**, regardless of Node.js or Go.  
The challenge was simple:

> **How fast can I serve 10k rows from a 10M database?**  
> And **how far can I push performance with caching layers?**

---

# **The Architecture (Final Form)**

```text
                 ┌──────────────┐
                 │   Postgre    │
                 │ 10K Product  │
                 └───────┬──────┘
                         │
          RAW QUERY      │   INDEX/MV QUERY
                         │
                         ▼
                ┌─────────────────┐
                │  Node.js API    │
                └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Redis Cache     │  
                └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ NGINX Cache     │  
                └─────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    Go Rewrite   │  
                └─────────────────┘
```

---

# **Phase 1 — Node.js RAW Query (~797ms)**

### Load Test Results (Postman/K6)

- **Avg:** 797ms  
- **P90:** 2,996ms  
- **P95:** 3,495ms  
- **P99:** 4,216ms  
- **Payload:** ~1.3MB  

This clearly needed optimization.

---

# **Phase 2 — Indexed Query (~350ms)**

After adding indexing:

```sql
CREATE INDEX idx_products_id ON products(id);
CREATE INDEX idx_inventory_pid ON inventory(product_id);
CREATE INDEX idx_prices_pid ON prices(product_id);
```

### Improvement

- **Avg dropped:** 797ms → **350ms**

---

# **Phase 3 — Materialized View (~310ms)**

```sql
CREATE MATERIALIZED VIEW mv_products AS
SELECT p.id, p.name, p.description, c.name as category, i.stock, pr.price
FROM products p
JOIN categories c ON c.id = p.category_id
JOIN inventory i ON i.product_id = p.id
JOIN prices pr ON pr.product_id = p.id;
```

### Result

- **Avg:** ~310ms  
- The DB layer was no longer the bottleneck.

---

# **Phase 4 — Redis Cache (~2–3ms HIT)**

Versioned Redis key:

```
cache:products:version → 1
products:1:all → JSON
```

### Results

- **Cache Miss:** High (due to JSON encode in Node)
- **Cache Hit:** **2–3ms**

Node’s JSON stringification became the bottleneck.

---

# **Phase 5 — NGINX Cache (~5ms)**

NGINX config:

```nginx
proxy_cache_path /opt/homebrew/var/nginx/cache keys_zone=api_cache:10m;
location /products_nginx {
    proxy_cache api_cache;
    proxy_pass http://localhost:3000/products_cache;
}
```

### Outcome

- **Stable 5ms responses**  
- Even faster than Redis due to file-backed mmap cache

---

# **Phase 6 — Go Rewrite (1ms–2ms)**

Go eliminated:

- Node event-loop overhead  
- JSON encoding delays  
- GC pauses under load  

### Go Performance Results

| Endpoint | Normal | Gzip | Brotli |
|----------|--------|------|--------|
| RAW | 59ms | 24ms | 23ms |
| Indexed | 24ms | 24ms | 26ms |
| MV | 17ms | 17ms | 18ms |
| Redis Cache | **3ms** | **2ms** | **2ms** |
| NGINX Cache → Go | **1ms** | **1ms** | **0ms** |

---

# **Final Performance Comparison**

| Layer | Node.js Avg | Go Avg | Gain |
|-------|-------------|---------|-------|
| Raw Query | 797ms | 59ms | **13× faster** |
| Indexed Query | 350ms | 24ms | **14× faster** |
| Materialized View | 310ms | 17ms | **18× faster** |
| Redis Cache | 2.9ms | 3ms | — |
| NGINX Cache | 5ms | 1ms | **5× faster** |

---

# **Key Learnings**

### 1. Database tuning gives early wins  
Indexes + MV dropped 797ms → 310ms.

### 2. Redis is microsecond-fast  
The bottleneck became Node, not Redis.

### 3. NGINX is a secret weapon  
It consistently outperformed Redis for static JSON.

### 4. Go gives the biggest jump  
The same logic rewritten in Go produced the largest improvement.

### 5. JSON size wasn’t the issue  
The backend encoding layer was.

---

# **Final Thought**

What started as a simple 10k-row API turned into a deep dive across:

- Query planning  
- Indexing  
- Materialized views  
- Redis caching  
- NGINX caching  
- Full runtime rewrite in Go  

End result?

> **A stable 1ms API for a 1.3MB payload sourced from a 10M-row database.**

The journey was worth every iteration. 
