import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../../utilities/checkData';
import { Notification } from './notification.types';

export const getNotifications: RequestHandler = async (req, res) => {
    
}

export const createNotification: RequestHandler = async (req: BodyRequest<Notification>, res) => {
    
}

export const notificationStatus: RequestHandler = async (req, res) => {
    
}