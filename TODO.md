# TODO: Fix NOVA Project Errors

## Steps to Complete

- [ ] Fix build command to use ';' instead of '&&' for PowerShell compatibility
- [x] Create AIService interface in service package
- [x] Move OpenAiService to service package and rename file if necessary
- [x] Implement GeminiService in service package
- [x] Update build.gradle: add spring-ai-openai dependency, change java.version to 22
- [x] Recompile the project and address any errors
- [x] Test running the backend
- [x] Verify services work (API endpoints return dynamic responses based on user questions) - OpenAI working (quota exceeded), Gemini needs valid API key
- [x] Check frontend integration if needed (frontend correctly displays responses from backend)
- [x] Generate API keys for OpenAI and Gemini services
