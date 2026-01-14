#!/usr/bin/env node
/**
 * TheologAI Proxy Server
 * Bridges between the web browser and TheologAI MCP server
 */

const http = require('http');
const https = require('https');

const THEOLOGAI_URL = 'http://localhost:3000';
const PROXY_PORT = 3001;

// Initialize TheologAI on startup
let mcpInitialized = false;
let mcpSessionId = null;

async function initializeTheologAI() {
    return new Promise((resolve, reject) => {
        const initRequest = {
            jsonrpc: '2.0',
            id: 0,
            method: 'initialize',
            params: {
                protocolVersion: '2024-11-05',
                capabilities: {},
                clientInfo: {
                    name: 'theologai-proxy',
                    version: '1.0.0'
                }
            }
        };

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/event-stream'
            }
        };

        const req = http.request(options, (res) => {
            // Log all response headers to see what's available
            console.log('[Init] Response headers:', JSON.stringify(res.headers));

            // Try to capture session ID from various possible header names
            mcpSessionId = res.headers['mcp-session-id'] ||
                          res.headers['x-mcp-session-id'] ||
                          res.headers['session-id'];

            let data = '';
            res.on('data', chunk => data += chunk.toString());
            res.on('end', () => {
                console.log('[Init] Response body:', data.substring(0, 500));
                console.log('[Init] TheologAI initialized, Session ID:', mcpSessionId || 'none');
                mcpInitialized = true;
                resolve();
            });
        });

        req.on('error', reject);
        req.write(JSON.stringify(initRequest));
        req.end();
    });
}

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Only handle POST to /commentary
    if (req.method !== 'POST' || req.url !== '/commentary') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    // Parse request body
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
        try {
            const { reference, commentator } = JSON.parse(body);

            console.log(`[Proxy] Fetching commentary for ${reference} from ${commentator || 'Matthew Henry'}`);

            // Make MCP request to TheologAI
            const mcpRequest = {
                jsonrpc: '2.0',
                id: 1,
                method: 'tools/call',
                params: {
                    name: 'commentary_lookup',
                    arguments: {
                        reference: reference,
                        commentator: commentator || 'Matthew Henry',
                        maxLength: 3000
                    }
                }
            };

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/event-stream'
            };

            // Only include session ID if we have one
            if (mcpSessionId) {
                headers['Mcp-Session-Id'] = mcpSessionId;
            }

            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/',
                method: 'POST',
                headers: headers
            };

            const mcpReq = http.request(options, (mcpRes) => {
                let data = '';

                mcpRes.on('data', chunk => {
                    data += chunk.toString();
                });

                mcpRes.on('end', () => {
                    try {
                        console.log('[Proxy] Raw response from TheologAI:', data.substring(0, 500));

                        // Parse MCP response
                        const lines = data.split('\n').filter(line => line.trim());
                        let result = null;

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const jsonData = JSON.parse(line.substring(6));
                                console.log('[Proxy] Parsed SSE data:', JSON.stringify(jsonData).substring(0, 200));
                                if (jsonData.result && jsonData.result.content) {
                                    result = jsonData.result;
                                    break;
                                }
                            }
                        }

                        console.log('[Proxy] Final result:', result ? 'Found' : 'Not found');

                        if (result && result.content && result.content[0]) {
                            // Extract commentary text
                            const commentaryText = result.content[0].text;

                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                success: true,
                                reference: reference,
                                commentator: commentator || 'Matthew Henry',
                                text: commentaryText
                            }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                success: false,
                                error: 'No commentary found'
                            }));
                        }
                    } catch (error) {
                        console.error('[Proxy] Error parsing MCP response:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            success: false,
                            error: 'Failed to parse response'
                        }));
                    }
                });
            });

            mcpReq.on('error', (error) => {
                console.error('[Proxy] Error calling TheologAI:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: 'TheologAI unavailable'
                }));
            });

            mcpReq.write(JSON.stringify(mcpRequest));
            mcpReq.end();

        } catch (error) {
            console.error('[Proxy] Error processing request:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: 'Invalid request'
            }));
        }
    });
});

server.listen(PROXY_PORT, async () => {
    console.log(`TheologAI Proxy Server running on http://localhost:${PROXY_PORT}`);
    console.log(`Bridging browser requests to TheologAI MCP server at ${THEOLOGAI_URL}`);
    console.log(`Initializing MCP connection...`);

    try {
        await initializeTheologAI();
        console.log(`✓ Ready to serve commentary requests`);
    } catch (error) {
        console.error(`✗ Failed to initialize TheologAI:`, error.message);
    }
});
