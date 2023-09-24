import mongoose, { Schema, Document } from 'mongoose';

export interface ICall extends Document {
    name: string;
    description: string;
    date: Date;
    duration: number;
    participants: string[];
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

const CallSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    duration: { type: Number },
    participants: { type: Array },
    owner: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
})


const CallModel = mongoose.model<ICall>('Call', CallSchema)

export class Call {
    static async createCall(name: string, description: string, date: Date, duration: number, participants: string[], owner: string) {
        const call = new CallModel({ name, description, date, duration, participants, owner, createdAt: new Date(), updatedAt: new Date() })
        await call.save()
        return call
    }

    static async getCall(id: string) {
        const Call = await CallModel.findById(id)
        return Call
    }

    static async getAllCalls() {
        const Calls = await CallModel.find()
        return Calls
    }

    static async updateCall(id: string, name: string, description: string, date: Date, duration: number, participants: string[], owner: string) {
        const call = await CallModel.findByIdAndUpdate(id, { name, description, date, duration, participants, owner, updatedAt: new Date() })
        return call

    }

    static async deleteCall(id: string) {
        const call = await CallModel.findByIdAndDelete(id)
        return call
    }

    static async addParticipant(id: string, participant: string) {
        const call = await CallModel.findByIdAndUpdate(id, { $push: { participants: participant } })
        return call
    }

    static async removeParticipant(id: string, participant: string) {
        const call = await CallModel.findByIdAndUpdate(id, { $pull: { participants: participant } })
        return call
    }

    static async getParticipants(id: string) {
        const call = (await CallModel.findById(id))
        return call?.participants
    }

    static async getOwner(id: string) {
        const call = (await CallModel.findById(id))
        return call?.owner
    }

    static async getCallByName(name: string) {
        const call = await CallModel.findOne({ name })
        return call
    }

}


const NewCall = new CallModel({ name: 'test', description: 'test', date: new Date(), duration: 60, participants: ['test'], owner: 'test', createdAt: new Date(), updatedAt: new Date() })

import { Router } from "express"

const CallRouter = Router()

CallRouter.post('/create-call', async (req, res) => {
    const { name, description, date, duration, participants, owner } = req.body
    const call = await Call.createCall(name, description, date, duration, participants, owner)
    res.send(call)
})


CallRouter.get('/get-call', async (req, res) => {
    const { id } = req.body
    const call = await Call.getCall(id)
    res.send(call)
})

CallRouter.get('/get-all-calls', async (req, res) => {
    const calls = await Call.getAllCalls()
    res.send(calls)
})

CallRouter.put('/update-call', async (req, res) => {
    const { id, name, description, date, duration, participants, owner } = req.body
    const call = await Call.updateCall(id, name, description, date, duration, participants, owner)
    res.send(call)
})


CallRouter.delete('/delete-call', async (req, res) => {
    const { id } = req.body
    const call = await Call.deleteCall(id)
    res.send(call)
})


CallRouter.put('/add-participant', async (req, res) => {
    const { id, participant } = req.body
    const call = await Call.addParticipant(id, participant)
    res.send(call)
})

CallRouter.put('/remove-participant', async (req, res) => {
    const { id, participant } = req.body
    const call = await Call.removeParticipant(id, participant)
    res.send(call)
})


CallRouter.get('/get-participants', async (req, res) => {
    const { id } = req.body
    const participants = await Call.getParticipants(id)
    res.send(participants)
})


CallRouter.get('/get-owner', async (req, res) => {
    const { id } = req.body
    const owner = await Call.getOwner(id)
    res.send(owner)
})

CallRouter.get('/get-call-by-name', async (req, res) => {
    const { name } = req.body
    const call = await Call.getCallByName(name)
    res.send(call)
})

export default CallRouter