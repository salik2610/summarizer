# Summary Generator 🚀

A modern, beautiful Next.js application that transforms meeting transcripts into structured notes using Groq AI and enables easy sharing via email using Resend.

## ✨ Features

- **🎨 Modern UI/UX**: Beautiful, responsive design with smooth animations and gradients
- **🤖 AI-Powered Summarization**: Uses Groq's Llama 3.3 70B model for intelligent meeting notes
- **⚡ Custom Instructions**: Add specific instructions for how you want summaries formatted
- **📧 Email Sharing**: Send summaries directly to meeting participants with beautiful HTML emails
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎯 Smart Validation**: Input validation and helpful error messages
- **🔄 Real-time Status**: Live feedback during AI processing and email sending

## 🎨 UI Components

- **Header**: Gradient logo with "Summary Generator" branding
- **Input Cards**: Beautiful card-based layout for transcript and instructions
- **Action Buttons**: Gradient buttons with loading states and icons
- **Status Messages**: Color-coded feedback with emojis
- **Feature Showcase**: Highlighting key capabilities with icons
- **Responsive Grid**: Two-column layout that adapts to screen size

## 🚀 Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment variables**:
   Create a `.env.local` file in the root directory with:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   RESEND_API_KEY=your_resend_api_key_here
   RESEND_FROM="Summarizer <no-reply@yourdomain.com>"
   ```

3. **Get API Keys**:
   - **Groq**: Sign up at [groq.com](https://groq.com) to get your API key
   - **Resend**: Sign up at [resend.com](https://resend.com) to get your API key and verify your domain

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 Usage

1. **📝 Paste Transcript**: Copy and paste your meeting transcript into the first textarea
2. **⚡ Add Instructions** (optional): Specify how you want the summary formatted
3. **🚀 Generate Summary**: Click the "Generate Summary" button to create AI-powered meeting notes
4. **📋 Review & Edit**: The generated summary appears in the second textarea where you can edit it
5. **📧 Share via Email**: Enter recipient emails and click "Share via Email"

## 🔧 API Endpoints

- **`/api/summarize`**: POST endpoint that generates summaries using Groq AI
- **`/api/share`**: POST endpoint that sends summaries via email using Resend

## 🛠️ Technologies Used

- **Next.js 15**: React framework with API routes and optimized performance
- **Tailwind CSS**: Utility-first CSS framework for beautiful, responsive design
- **Groq SDK**: AI model integration for intelligent summarization
- **Resend**: Professional email delivery service
- **React Hooks**: Modern state management for the UI
- **Custom CSS**: Enhanced animations, gradients, and visual effects

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful blue-to-purple gradients
- **Card-based Layout**: Clean, organized sections with shadows and borders
- **Icon Integration**: Relevant emojis and icons throughout the interface
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Color-coded Feedback**: Different colors for success, error, and info messages
- **Responsive Grid**: Adapts from single-column mobile to two-column desktop

## 🔧 Customization

You can customize the AI model, temperature, and system prompts in the `/api/summarize.js` file. The current setup uses:
- Model: `llama-3.3-70b-versatile`
- Temperature: `0.2` (for consistent, focused summaries)
- System prompt: "Summarize transcripts into structured meeting notes"

## 🚀 Deployment

This application can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform. Make sure to set your environment variables in your hosting platform's dashboard.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application!

## 📄 License

This project is open source and available under the MIT License.
