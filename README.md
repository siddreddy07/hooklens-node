# HookLens

Capture and monitor webhooks with ease. View all your incoming webhooks in real-time at [hooklens.app](https://hooklens-eta.vercel.app/).

## Installation

```bash
npm install hooklens-node
```

After installation, the `.env` file is created/updated with HookLens configuration.

## Setup

Get your API key from [hooklens.app](https://hooklens-eta.vercel.app/) and update your `.env`:

```
HOOKLENS_API_KEY=your_api_key
HOOKLENS_BASE_URL=
HOOKLENS_PROJECT_ID=
```

## Usage

```javascript
import express from 'express';
import { hooklens } from 'hooklens-node';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const hl = hooklens({ provider: 'stripe' });
app.use('/webhook', hl.capture());

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Options

| Option | Environment Variable | Description |
|--------|---------------------|-------------|
| `apiKey` | `HOOKLENS_API_KEY` | Your API key (required) |
| `baseUrl` | `HOOKLENS_BASE_URL` | Custom webhook endpoint |
| `projectId` | `HOOKLENS_PROJECT_ID` | Project identifier |
| `provider` | - | Webhook provider name (e.g., 'stripe', 'twilio') |

## Dashboard

View captured webhooks at [hooklens.app](https://hooklens-eta.vercel.app/)