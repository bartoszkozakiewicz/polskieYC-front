import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../../../firebase/authMiddleware";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handleVoteChange(request: NextRequest){
    try{
        const {suggestionId, userId} = await request.json()

        const vote = await prisma.vote.findFirst({
            where: {
                suggestionId: suggestionId,
                userId: userId
            }
        });
    
        if (vote) {
            const voted = vote.hasVoted
            await prisma.vote.updateMany({
                where: {
                        suggestionId: suggestionId,
                        userId: userId
                },
                data: {
                    hasVoted: !voted, 
                }
            });

            await prisma.suggestion.update({
                where: {
                    id: suggestionId,
                },
                data: {
                    vote_counter: {
                        [!voted ? 'increment' : 'decrement']: 1 
                    },
                },
            });

            return NextResponse.json({message:"Successfully changed vote"} )

        } else {
            await prisma.vote.create({
                data:{
                    suggestionId: suggestionId,
                    userId: userId,
                    hasVoted: true
                }
            })
            await prisma.suggestion.update({
                where: {
                    id: suggestionId,
                },
                data: {
                    vote_counter: {
                        increment: 1,
                    },
                },
            });
            return NextResponse.json({message:"Successfully voted"} )
        }
    }
    catch(e){
        return NextResponse.json(
            { error: `Internal server error ${e}` },
            { status: 500 }
        );
    }
}

async function addSuggestion(request: NextRequest){
    const {suggestion} = await request.json()
    try{
        const createdSuggestion = await prisma.suggestion.create({
            data: suggestion
        })
        console.log("Suggestion created")
        return NextResponse.json({suggestion:createdSuggestion} )
    }
    catch(e){
        console.error("Error occurred while adding suggestions", e)
        return NextResponse.json(
            { error: `Internal server error ${e}` },
            { status: 500 }
        );
    }
}

async function getAllSuggestions(request: NextRequest){
    const userId  =  request.nextUrl.searchParams.get('id') as string
    try{
        const suggestions = await prisma.suggestion.findMany({
            include: {
                votes: {
                    where: { userId },
                    select: { hasVoted: true }
                }
            },
            orderBy: {
                vote_counter: 'desc' 
            }
        });

        const suggestionsWithVoteStatus = suggestions.map(suggestion => ({
            ...suggestion,
            hasVoted: suggestion.votes.length > 0 ? suggestion.votes[0].hasVoted : false
        }));        

        
        return NextResponse.json({ suggestions: suggestionsWithVoteStatus});
    }
    catch(e){
        return NextResponse.json(
            { error: `Internal server error ${e}` },
            { status: 500 }
        );
    }
}

export const PATCH = authMiddleware(handleVoteChange)
export const POST = authMiddleware(addSuggestion)
export const GET = authMiddleware(getAllSuggestions)