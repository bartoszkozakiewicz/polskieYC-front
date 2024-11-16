import admin from './firebaseAdmin';
import { NextResponse } from 'next/server';

export const authMiddleware = (handler) => {
    return async (req, res) => {
        console.log("auth middleware");
        const authHeader = req.headers.get('authorization');

        const token = authHeader && authHeader.split(' ')[1]; 
        if (!token) {
            return NextResponse.json({ message: 'Brak tokena, dostęp zabroniony.' }, { status: 401 }); 
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            return handler(req, res);
        } catch (err) {
            return NextResponse.json({ message: 'Nieprawidłowy token, dostęp zabroniony.' }, { status: 403 });
        }
    };
};
