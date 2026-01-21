# Setup Instructions for Docuchat Website

## Prerequisites

1. **Python 3.8+** - For running the backend
2. **Node.js 16+** - For running the frontend
3. **AWS S3 Bucket** - With documents pre-loaded
4. **OpenAI API Key** - For AI responses
5. **MongoDB** - For storing chat history

## Configuration

### Backend Setup (Docuchat_backend.py)

Before running the backend, you need to configure the following environment variables:

1. **OpenAI API Key**
   ```python
   os.environ['OPENAI_API_KEY'] = "your-openai-api-key"
   ```

2. **AWS S3 Credentials**
   ```python
   S3_KEY = "your-aws-access-key"
   S3_SECRET = "your-aws-secret-key"
   S3_BUCKET = "sajan-website"
   S3_PATH = "documents/"  # Path within bucket where documents are stored
   ```

3. **MongoDB Connection**
   ```python
   MONGO_URL = "mongodb://connection-string"
   ```

Update these values in `Docuchat_backend.py` before running the backend.

### S3 Bucket Setup

Upload your documents to your S3 bucket in the folder specified by `S3_PATH`. The chat widget will automatically fetch and list these documents.

Supported file types:
- PDF (.pdf)
- Word Documents (.docx)

## Running the Application

### Option 1: Start Backend and Frontend Separately

**Terminal 1 - Start the Backend:**
```bash
cd Website
python Docuchat_backend.py
```

The backend will start on `http://localhost:8000`

**Terminal 2 - Start the Frontend:**
```bash
cd Website/my-website
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is in use)

### Option 2: Using the PowerShell Script

**Terminal 1 - Start the Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Start the Frontend:**
```bash
cd my-website
npm run dev
```

## Usage

1. Open the website in your browser
2. Click the chat button in the bottom-right corner
3. Click the document dropdown to select a document from your S3 bucket
4. Ask questions about the selected document
5. The AI will respond based on the document content

## Features

- **Document Selection**: Choose from pre-loaded documents in your S3 bucket
- **Conversational AI**: Ask follow-up questions maintaining conversation context
- **Session Management**: Each chat session is tracked with a unique ID
- **Token Tracking**: View how many tokens are used for each response
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### GET /documents
Returns a list of available documents from the S3 bucket.

**Response:**
```json
{
  "documents": [
    {
      "name": "filename.pdf",
      "path": "s3://bucket/documents/filename.pdf",
      "size": 102400
    }
  ]
}
```

### POST /chat
Send a chat message and get an AI response.

**Request:**
```json
{
  "session_id": "uuid-or-null",
  "user_input": "Your question here",
  "data_source": "filename.pdf"
}
```

**Response:**
```json
{
  "response": {
    "answer": "AI response here",
    "total_tokens_used": 256
  },
  "session_id": "uuid"
}
```

## Troubleshooting

### Backend Won't Start
- Ensure Python 3.8+ is installed
- Check that all required packages are installed: `pip install -r Requirements.txt`
- Verify AWS and OpenAI credentials are correctly set
- Ensure MongoDB is accessible

### Chat Not Working
- Verify the backend is running on `http://localhost:8000`
- Check browser console for errors (F12 in most browsers)
- Ensure a document is selected before sending a message
- Check that documents exist in your S3 bucket

### No Documents Showing
- Verify S3 credentials are correct
- Ensure documents are in the correct S3 path (`S3_PATH`)
- Check that the bucket name is correct
- Verify the IAM user has `ListBucket` and `GetObject` permissions

## Environment File (Optional)

You can also use a `.secrets.env` file for local development (Windows only):

```
OPENAI_API_KEY=your-openai-api-key
S3_KEY=your-aws-access-key
S3_SECRET=your-aws-secret-key
S3_BUCKET=your-bucket-name
S3_REGION=us-east-2
S3_PATH=documents/
MONGO_URL=mongodb://connection-string
```
