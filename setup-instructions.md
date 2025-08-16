# Setup Instructions

## 1. Create .env.local file

Create a file named `.env.local` in the root directory (`mangodesk-summarizer/`) with the following content:

```bash
GROQ_API_KEY=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
RESEND_API_KEY=re_HGwrakVb_AfvvJeHeai6RPfkyxdTMSxRn
RESEND_FROM="Summarizer <no-reply@yourdomain.com>"
```

## 2. Update RESEND_FROM email

**Important**: You need to update the `RESEND_FROM` email address to use a domain that you've verified with Resend.

- Go to [resend.com](https://resend.com) and verify your domain
- Update the email address in `.env.local` to use your verified domain
- Example: `RESEND_FROM="Summarizer <no-reply@yourdomain.com>"`

## 3. Test the application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser

3. Test with a sample transcript:
   ```
   Meeting started at 10:00 AM. John discussed the Q1 sales results. 
   Sarah mentioned the new product launch timeline. Action items: 
   John to prepare sales report by Friday, Sarah to finalize launch plan by next week.
   ```

## 4. Troubleshooting

If you get errors:
- Check that your `.env.local` file exists and has the correct API keys
- Ensure your Resend domain is verified
- Check the browser console and terminal for error messages
- Verify that the Groq API key is valid and has sufficient credits

## 5. Available Models

The application currently uses `llama-3.3-70b-versatile`. If you want to try other models, you can update the model name in `src/pages/api/summarize.js`:

- `llama-3.3-70b-versatile` (current)
- `llama-3.1-8b-instant`
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`

