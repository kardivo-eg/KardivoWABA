# Kardivo WhatsApp AI Agent

Railway-ready starter for WhatsApp Cloud API + Gemini.

Included:
- Meta webhook verification
- Incoming WhatsApp text handling
- Gemini replies
- Product catalog
- Basic order storage
- Discount guardrail
- Payment-proof image intake response
- Health endpoint

Payment screenshots are never treated as proof that money was actually received. They are only a pre-check; the owner must verify the real balance before delivery.

## Railway
1. Push this folder to GitHub.
2. Create a Railway service from the GitHub repo.
3. Add every variable in `.env.example` using Railway Variables.
4. Deploy.
5. Copy the Railway public URL and use `https://YOUR-DOMAIN/webhook` as the Meta callback URL.
6. Use the same `WHATSAPP_VERIFY_TOKEN` in Meta.

Do not commit real tokens or API keys. A real `.env` is not required on Railway.
