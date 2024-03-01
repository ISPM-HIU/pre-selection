# Webhook for WhatsApp

## Overview

This is an webhook template based on Express.

## Installation

First of all, you need to have a WhatsApp Business Account, a server (or a platform) to deploy the webhook, and an Meta application to link it to the webhook.

If you have all of those, then, to install and test it locally, run :

```bash
npm install
```

After that :

```bash
npm run dev
```

You will use the endpoint that have been given. (Server or port transfert like ngrok)

(If you use ngrok use, use this command : `ngrok http 3000`)

## Usage

For your usage, change all of the `.env` values.

- `PORT` : Port of the application
- `BUSINESS_ID` : Id of your business account (WhatsApp)
- `ACCESS_TOKEN` : A token for accessing your application
- `VERIFY_TOKEN` : A token for your webhook

