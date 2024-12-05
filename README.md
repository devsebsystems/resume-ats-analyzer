# Resume ATS Analyzer

A modern web application that analyzes resumes against job descriptions using AI to provide actionable feedback and improvements.

## Features

- 📄 PDF and TXT file support
- 🎯 ATS compatibility analysis
- 🔍 Keyword matching and gap analysis
- 💡 Smart suggestions for improvements
- ✨ Side-by-side comparison of original and improved content
- 📊 Section-by-section improvement tracking
- 🎨 Modern, responsive UI

## Tech Stack

- React + TypeScript
- Tailwind CSS for styling
- OpenAI GPT-4 for analysis
- PDF.js for PDF processing
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/resume-ats-analyzer.git
cd resume-ats-analyzer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```
Edit `.env` and add your OpenAI API key.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Upload your resume (PDF or TXT format)
2. Paste the job description
3. Click analyze to receive:
   - ATS compatibility score
   - Keyword analysis
   - Missing keywords
   - Improvement suggestions
   - Enhanced resume content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- PDF.js for PDF processing capabilities
- All contributors and users of this project 