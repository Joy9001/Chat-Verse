import { faker } from '@faker-js/faker'
import User from '../models/users.model.js'
import { hashPassword } from './password.helper.js'

export const createAdminData = async () => {
    const admin = new User({
        name: 'Joy The Admin',
        username: 'joy@admin',
        email: 'joy.admin@email.com',
        password: await hashPassword('joyAdmin@123'),
        gender: 'male',
        role: 'admin',
    })
    // console.log('Admin data created', admin)
    await admin.save()
    console.log('Admin data saved')
    const dev = new User({
        name: 'Joy The Dev',
        username: 'joy@dev',
        email: 'joy.dev@email.com',
        password: await hashPassword('joyDev@123'),
        gender: 'male',
        role: 'dev',
    })
    // console.log('Dev data created', dev)
    await dev.save()
    console.log('Dev data saved')
}
