import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { PrismaClient } from '@prisma/client';


const stripe = new Stripe(process.env.STRIPE_SUB_SECRET_KEY || "")
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const prisma = new PrismaClient();

const verifyStripeWebhook = async (event:any, body:any, signature:any) => {
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret || "");
        return event;
    } catch (err) {
        console.error(`Webhook signature verification failed. ${(err as Error).message}`);
        return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
}

const handleWebhookEvents = async (eventType:any, data:any) => {
    try{
        switch(eventType){
            case 'checkout.session.completed':
                // handle checkout session completed event
                let user;
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                {
                    expand: ['line_items']
                });

                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId as string);
                const priceId = session?.line_items?.data[0]?.price?.id;

                if (customer && 'email' in customer) {
                    console.log("Customer email found, creating or updating user");
                    user = await prisma.user.findUnique({
                        where: { email: customer.email || '' }
                    });

                    if (!user){
                        await prisma.user.create({
                            data: {
                                email: customer.email || "",
                                hasAccess: true,
                                createdAt: new Date(),
                                customerId: customerId as string,
                                priceId: priceId,
                            }
                        })
                    }
                    else{
                        if (user?.customerId == customerId){
                            await prisma.user.update({
                                where: { customerId: customerId as string },
                                data: {
                                    hasAccess: true,
                                    priceId: priceId,
                                }
                            })
                        }
                        else{
                            await prisma.user.update({
                                where: { email:  customer.email || ''  },
                                data: {
                                    hasAccess: true,
                                    customerId: customerId as string,
                                    priceId: priceId,
                                }
                            })
                        }
                    }
                }
                else{
                    console.error('Customer email not found in stripe');
                    throw new Error('Customer email not found in stripe');
                }

                break;
                
            case 'customer.subscription.deleted':
                
                const subscription = await stripe.subscriptions.retrieve(data.object.id);

                const userUnsub = await prisma.user.findUnique({
                    where: { customerId: subscription.customer as string }
                });

                if (userUnsub){
                    await prisma.user.update({
                        where: { customerId: subscription.customer as string },
                        data: {
                            hasAccess: false,
                        }
                    })
                }
                else{
                    console.error('User not found');
                    throw new Error('User not found');
                }

                break;

            case 'customer.subscription.updated':
                // handle customer subscription updated event
                break;
            case 'invoice.paid':
                // handle invoice paid event
                break;
            case 'invoice.payment_failed':
                // handle invoice payment failed event
                break;
            case 'checkout.session.expired':
                break;

            default:
                console.log(`Unhandled event type ${eventType}`);
        }

    }catch(e){
        console.error(
            'stripe error: ' + e + ' | EVENT TYPE: ' + eventType
        );
    }
}

export async function POST(req:NextRequest) {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    let data;
    let event;
    let eventType;
    event = await verifyStripeWebhook(event, body, signature);

    data = event.data;
    eventType = event.type;

    try {
        await handleWebhookEvents(eventType, data);
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Error handling webhook event:', (error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}