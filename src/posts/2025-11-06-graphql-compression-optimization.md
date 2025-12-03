---
title: "My Exploration Journey: Optimizing Large GraphQL Responses"
slug: "graphql-compression-optimization"
date: 2025-11-06
author: "Nabheet Madan"
excerpt: "A deep dive into compression algorithms for GraphQL APIs - comparing Gzip, Brotli, and Zstandard to achieve 97% size reduction and 70% faster load times."
tags: ["graphql", "system-design", "performance"]
featured_image: /assets/images/posts/compression-benchmark.png
featured_image_alt: "Compression Benchmark Dashboard showing network performance comparison"
draft: false
layout: layouts/post.njk
---

# My Exploration Journey: Optimizing Large GraphQL Responses

It all started when I noticed our GraphQL responses were getting **massive** - we're talking 200-300 KB of JSON data being sent over the network. Every time a user loaded a page, they were downloading what felt like a small novel worth of product data, variants, collections, and metadata.

I was curious: *"There's got to be a better way, right?"* I started poking around in Chrome DevTools and noticed something interesting - the **Accept-Encoding** header in my requests. It looked something like this:

```http
Accept-Encoding: gzip, deflate, br
```

Wait, what's that **"br"** at the end? That's when I discovered Brotli - a compression algorithm developed by Google that's supposed to be better than gzip. But I had no idea how much better, or what the trade-offs were.

## Request Headers: The Handshake

Here's what I learned about how compression actually works between the browser and server:

### 1. The Client Asks

When your browser makes a request, it sends an `Accept-Encoding` header telling the server what compression methods it understands:

```http
GET /api/data1 HTTP/1.1
Host: localhost:3000
Accept-Encoding: gzip, deflate, br
```

### 2. The Server Responds

If the server can compress the response, it does so and tells the browser what encoding it used via the `Content-Encoding` header:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: br
Content-Length: 6048
```

### 3. The Browser Decompresses

Your browser automatically decompresses the response based on the `Content-Encoding` header. You don't have to do anything - it's transparent!

## Exploring Different Compression Options

I decided to create a benchmark to compare different compression methods side-by-side. Here's what I tested:

![Compression Benchmark Dashboard](/assets/images/posts/compression-benchmark.png)

### Uncompressed (Original)
- **Size:** ~275 KB
- **Time:** ~7.5 seconds
- The baseline - what we started with. Ouch.

### Gzip
- **Size:** ~8-9 KB
- **Time:** ~2.1 seconds
- The old reliable. Works everywhere, decent compression.

### Brotli
- **Size:** ~6 KB
- **Time:** ~2.1 seconds
- The new kid on the block. Better compression than gzip!

### Zstandard (Zstd)
- **Size:** ~7-8 KB
- **Time:** ~2.2 seconds
- Fast and modern, but browser support is limited.

## Brotli Quality Parameters: The Secret Sauce

When I first tried Brotli, I just used the defaults. But then I learned about **quality parameters** - and this is where it gets interesting!

Brotli has a quality setting that ranges from `0` to `11`. Here's what I discovered:

- **Quality 0-4:** Fast compression, but larger file sizes. Good for real-time scenarios.
- **Quality 5-7:** The sweet spot! Good balance between compression ratio and speed. I use `6` in my benchmarks.
- **Quality 8-11:** Maximum compression, but significantly slower. You might save an extra 5-10%, but compression time increases dramatically.

In my code, I set it like this:

```javascript
const compressed = zlib.brotliCompressSync(Buffer.from(jsonString), {
  params: {
    [zlib.constants.BROTLI_PARAM_QUALITY]: 6, // balance size/speed (0–11)
  },
});
```

Quality `6` gives me about **97% size reduction** (from 275 KB to 6 KB!) while keeping compression fast enough for real-time use. Perfect for dynamic GraphQL responses.

## Other Brotli Parameters (The Deep Dive)

Brotli also has other parameters you can tweak:

- **BROTLI_PARAM_SIZE_HINT:** Tells Brotli the expected size of input. Helps with optimization.
- **BROTLI_PARAM_LGWIN:** Log of the sliding window size (10-24). Larger = better compression but more memory.
- **BROTLI_PARAM_LGBLOCK:** Log of block size. Affects memory usage during compression.
- **BROTLI_PARAM_MODE:** Compression mode (generic, text, font, etc.). Use "text" for JSON!

For most use cases, just setting `BROTLI_PARAM_QUALITY` to `6` or `7` is enough. The defaults for other parameters work well.

## The Results: What I Learned

The numbers speak for themselves. By switching from uncompressed to Brotli compression:

- ✅ **97% reduction** in transferred data (275 KB → 6 KB)
- ✅ **70% faster** load times (7.5s → 2.1s)
- ✅ **Minimal CPU overhead** - decompression takes only ~2ms on the client
- ✅ **Better user experience** - especially on slower networks

The best part? It's *completely transparent* to the application code. The browser handles everything automatically based on the headers.

## Implementation Tips

Here's a complete example of setting up Brotli compression in Node.js/Express:

```javascript
const express = require('express');
const zlib = require('zlib');
const app = express();

// Middleware to handle Brotli compression
app.use((req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  // Check if client supports Brotli
  if (acceptEncoding.includes('br')) {
    const originalSend = res.send;
    
    res.send = function(data) {
      if (typeof data === 'string' || Buffer.isBuffer(data)) {
        const compressed = zlib.brotliCompressSync(
          Buffer.isBuffer(data) ? data : Buffer.from(data),
          {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 6,
              [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
            },
          }
        );
        
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Length', compressed.length);
        return originalSend.call(this, compressed);
      }
      return originalSend.call(this, data);
    };
  }
  
  next();
});

// Your GraphQL endpoint
app.post('/graphql', (req, res) => {
  // Handle GraphQL query
  const result = executeGraphQL(req.body);
  res.json(result); // Will be automatically compressed!
});
```

## What's Next?

I'm still exploring! Things I want to try next:

- Testing different quality levels (maybe 4 for real-time, 11 for static assets)
- Comparing Brotli with different window sizes
- Measuring the server-side compression CPU cost
- Testing on different network conditions (3G, 4G, WiFi)
- Exploring HTTP/2 server push with compressed responses

The journey continues! 🚀

## Key Takeaways

1. **Always use compression** for API responses - the gains are massive
2. **Brotli is superior to Gzip** - better compression with similar speed
3. **Quality parameter matters** - find the sweet spot for your use case (6-7 for dynamic, 11 for static)
4. **It's transparent** - browsers handle decompression automatically
5. **Benchmark your own data** - results vary based on content type and size

Have you optimized compression in your APIs? What compression algorithms are you using? Let me know in the comments or reach out on social media!

