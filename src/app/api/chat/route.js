import { bedrock } from '@ai-sdk/amazon-bedrock';
import { generateText } from 'ai'
import { NextResponse } from 'next/server';

const model = bedrock('anthropic.claude-3-haiku-20240307-v1:0');

export async function POST(req) {
    try{
        const { message } = await req.json();
        const { text } = await generateText({
            model,
            prompt: message
          })
        return NextResponse.json({text})
    }
    catch(e){
        console.log("ERROR", e);
    }
}