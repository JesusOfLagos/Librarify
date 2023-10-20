export interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationModel = new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true })


export class NotificationManager implements Notification {
    id: string;
    title: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, title: string, message: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createNotificationInstance = (id: string, title: string, message: string, createdAt: Date, updatedAt: Date): NotificationManager => {
        return new NotificationManager(id, title, message, createdAt, updatedAt);
    }

    static getNotificationById(id: string): NotificationManager {
        return new NotificationModel.findById(id);
    }

    static createNotification(notification: Notification): NotificationManager {
        return new NotificationModel(notification.id, notification.title, notification.message, notification.createdAt, notification.updatedAt).save();
    }

    static getNotificationByTitle(title: string): NotificationManager {
        return new NotificationModel.findOne({ title: title });
    }

    static getNotificationByMessage(message: string): NotificationManager {
        return new NotificationModel.findOne({ message: message });
    }

    static getNotificationByTitleAndMessage(title: string, message: string): NotificationManager {
        return new NotificationModel.findOne({ title: title, message: message });
    }

    static getNotifications(): NotificationManager[] {
        return new NotificationModel.find();
    }

    static deleteNotification(id: string): NotificationManager {
        return new NotificationModel.findByIdAndDelete(id);
    }

    static updateNotification(id: string, notification: Notification): NotificationManager {
        return new NotificationModel.findByIdAndUpdate(id, notification);
    }

    static updateNotificationTitle(id: string, title: string): NotificationManager {
        return new NotificationModel.findByIdAndUpdate(id, { title: title });
    }

    static updateNotificationMessage(id: string, message: string): NotificationManager {
        return new NotificationModel.findByIdAndUpdate(id, { message: message });
    }

    static updateNotificationTitleAndMessage(id: string, title: string, message: string): NotificationManager {
        return new NotificationModel.findByIdAndUpdate(id, { title: title, message: message });
    }
}