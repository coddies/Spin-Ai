<?php
/**
 * PHP Backend Proxy: /api/groq.php
 *
 * Acts as a secure server-side proxy for the Groq API on Hostinger.
 * Resolves CORS requests and secures the GROQ_API_KEY.
 *
 * Accepts: POST { prompt: string }
 * Returns: JSON Array string[]
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit;
}

// 1. Try to load GROQ_API_KEY from environment or check .env files
$apiKey = getenv('GROQ_API_KEY');

if (!$apiKey) {
    // Attempt to read from .env in parent directories or current root
    $envPaths = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../.env',
        __DIR__ . '/.env'
    ];
    foreach ($envPaths as $path) {
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) continue;
                list($name, $value) = explode('=', $line, 2);
                if (trim($name) === 'GROQ_API_KEY') {
                    $apiKey = trim($value);
                    break 2;
                }
            }
        }
    }
}

if (!$apiKey) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Server configuration error: GROQ_API_KEY not set."]);
    exit;
}

// 2. Read request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$prompt = isset($data['prompt']) ? trim($data['prompt']) : '';

if (empty($prompt)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing or empty 'prompt' field."]);
    exit;
}

$systemPrompt = 'You are a wheel spinner assistant. User will give you a topic or description. Return ONLY a valid JSON array of 4 to 10 short items (maximum 3 words each). No explanation, no markdown, no extra text. Just the raw JSON array. Example: ["Item 1", "Item 2", "Item 3"]';

$models = [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant', 
    'llama3-8b-8192',
    'llama3-70b-8192',
    'gemma2-9b-it',
    'mixtral-8x7b-32768'
];

$lastError = 'Unknown error';

foreach ($models as $model) {
    $postData = [
        "model" => $model,
        "messages" => [
            ["role" => "system", "content" => $systemPrompt],
            ["role" => "user", "content" => $prompt]
        ],
        "temperature" => 0.8,
        "max_tokens" => 256
    ];

    $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $responseData = json_decode($response, true);
        $messageContent = $responseData['choices'][0]['message']['content'];
        
        // Extract JSON array from LLM response
        $cleanContent = trim($messageContent);
        if (strpos($cleanContent, '```') !== false) {
            // strip markdown code block wrapper if present
            $cleanContent = preg_replace('/^```(?:json)?\s*/i', '', $cleanContent);
            $cleanContent = preg_replace('/\s*```$/', '', $cleanContent);
        }
        
        $parsed = json_decode(trim($cleanContent), true);
        if (is_array($parsed)) {
            header('Content-Type: application/json');
            echo json_encode($parsed);
            exit;
        } else {
            $lastError = "Model returned invalid JSON format: " . $cleanContent;
        }
    } else {
        $errorResponse = json_decode($response, true);
        $lastError = isset($errorResponse['error']['message']) ? $errorResponse['error']['message'] : "HTTP error code: $httpCode";
    }
}

http_response_code(502);
header('Content-Type: application/json');
echo json_encode(["error" => "✨ AI is temporarily unavailable. Please try again in a moment!"]);
